# Supabase setup

Anonymous Sign-In is already expected to be enabled.

Run `database.sql` completely. Then check Database/Replication and confirm `public.srs_vision_state` is included in `supabase_realtime`.

The site uses:
- `window.SRS_SUPABASE_CONFIG`
- Anonymous Auth
- `public.srs_vision_state`
- `srs_vision_merge_state(jsonb)`

The UI remains usable locally when Supabase is unavailable, and queued writes retry automatically.
