-- SRS Vision shared realtime database
-- Run this entire file in the Supabase SQL Editor.

create table if not exists public.srs_vision_state (
  id bigint primary key check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

-- Seed the single shared row.
insert into public.srs_vision_state(id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- Optional migration from the older SRS/3FS table used by previous builds.
do $$
begin
  if to_regclass('public.threefs_state') is not null then
    update public.srs_vision_state target
       set data = coalesce(source.data, '{}'::jsonb),
           updated_at = coalesce(source.updated_at, now()),
           updated_by = source.updated_by
      from public.threefs_state source
     where target.id = 1
       and source.id = 1
       and target.data = '{}'::jsonb;
  end if;
end $$;

alter table public.srs_vision_state enable row level security;
alter table public.srs_vision_state replica identity full;

grant select, insert, update on public.srs_vision_state to authenticated;

drop policy if exists "srs vision anonymous select" on public.srs_vision_state;
drop policy if exists "srs vision anonymous insert" on public.srs_vision_state;
drop policy if exists "srs vision anonymous update" on public.srs_vision_state;

create policy "srs vision anonymous select"
on public.srs_vision_state
for select to authenticated
using (
  id = 1
  and coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false)
);

create policy "srs vision anonymous insert"
on public.srs_vision_state
for insert to authenticated
with check (
  id = 1
  and coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false)
);

create policy "srs vision anonymous update"
on public.srs_vision_state
for update to authenticated
using (
  id = 1
  and coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false)
)
with check (
  id = 1
  and coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false)
);

create or replace function public.srs_vision_merge_state(p_patch jsonb)
returns public.srs_vision_state
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.srs_vision_state;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  if not coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false) then
    raise exception 'Anonymous session required';
  end if;

  insert into public.srs_vision_state(id, data, updated_at, updated_by)
  values (1, coalesce(p_patch, '{}'::jsonb), now(), auth.uid())
  on conflict (id) do update
    set data = public.srs_vision_state.data || excluded.data,
        updated_at = now(),
        updated_by = auth.uid()
  returning * into v_row;
  return v_row;
end;
$$;

revoke all on function public.srs_vision_merge_state(jsonb) from public, anon;
grant execute on function public.srs_vision_merge_state(jsonb) to authenticated;

-- Postgres Changes / Realtime publication.
do $$
begin
  alter publication supabase_realtime add table public.srs_vision_state;
exception
  when duplicate_object then null;
end $$;
