-- SRS Vision production shared state
create table if not exists public.srs_vision_state (
  id bigint primary key check (id=1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
insert into public.srs_vision_state(id,data) values (1,'{}'::jsonb) on conflict (id) do nothing;
alter table public.srs_vision_state enable row level security;
alter table public.srs_vision_state replica identity full;
grant select,insert,update on public.srs_vision_state to authenticated;
drop policy if exists "srs vision select anonymous" on public.srs_vision_state;
drop policy if exists "srs vision insert anonymous" on public.srs_vision_state;
drop policy if exists "srs vision update anonymous" on public.srs_vision_state;
create policy "srs vision select anonymous" on public.srs_vision_state for select to authenticated using (id=1 and coalesce((auth.jwt()->>'is_anonymous')::boolean,false));
create policy "srs vision insert anonymous" on public.srs_vision_state for insert to authenticated with check (id=1 and coalesce((auth.jwt()->>'is_anonymous')::boolean,false));
create policy "srs vision update anonymous" on public.srs_vision_state for update to authenticated using (id=1 and coalesce((auth.jwt()->>'is_anonymous')::boolean,false)) with check (id=1 and coalesce((auth.jwt()->>'is_anonymous')::boolean,false));
do $$ begin
  alter publication supabase_realtime add table public.srs_vision_state;
exception when duplicate_object then null; end $$;
