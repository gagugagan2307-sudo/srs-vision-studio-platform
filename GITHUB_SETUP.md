# GitHub setup — SRS Vision Studio Platform

Repository name:

`srs-vision-studio-platform`

Upload every file in this folder to the repository root.

For a static GitHub Pages deployment, enable Pages from the repository's Settings and choose the main branch/root as the source.

Before using Supabase realtime across devices:
1. Run `database.sql` in the Supabase SQL Editor.
2. Confirm Anonymous Sign-Ins are enabled.
3. Confirm realtime is enabled for the state table used by this build.
4. Keep only the browser-safe publishable key in `supabase-config.js`.
