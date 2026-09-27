# SRS Vision — Final Ultimate Platform

Main dashboard first, then separate dashboards/workspaces for every tool category.

## Included

- First-design SRS Vision main dashboard
- Separate Graphic Design, AI, Social Media, Video, Image, Documents, PDF, Productivity, Developer, Business, Education, Entertainment, Utilities and Music dashboards
- Accounts + Banking + Money Transfer approval workflow
- One shared SRS Vision team with the current roster
- Editable Projects, Clients, Calendar and Team members
- Notification Center
- Music player with local files + Spotify/JioSaavn/other launch slots
- App Manager with manual custom app slots for every category
- Back button and browser history navigation
- Local autosave + Supabase anonymous session + Realtime sync

## Supabase

1. Keep Anonymous Sign-In enabled.
2. Run `database.sql` in the Supabase SQL Editor.
3. Confirm `public.srs_vision_state` is present in the `supabase_realtime` publication.
4. Use the publishable browser key only.

## External app permissions

The website can launch official web/app URLs directly, but it cannot grant another company's login, OAuth, OTP, OS, microphone, storage, or banking permissions. Those permissions are controlled by the external app/service after the user signs in or authorizes it.
