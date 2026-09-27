# SRS Vision Supabase Setup

Anonymous Sign-In is used for the browser session; there is no admin username/password login.

1. Open the Supabase project configured in `supabase-config.js`.
2. Confirm Anonymous Sign-Ins are enabled.
3. Run the complete `database.sql` once in SQL Editor.
4. Confirm `public.srs_vision_state` exists and `supabase_realtime` includes that table.
5. Open the SRS Vision site and click the **Live Database** badge to run the connection check.

The browser uses only the publishable key. The website falls back to local browser storage when Supabase is unavailable, and marks unsent changes so they can be retried when the connection returns.

The SQL also attempts a one-time migration from the older `public.threefs_state` row if it exists and the new SRS Vision row is still empty.
