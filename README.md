# SRS Vision — Final Production Website

## Structure
- Main Dashboard is the first screen and keeps the selected first-design style.
- Every tool opens in a separate dashboard.
- Teams is one SRS VISION team with 13 members.
- Work Queue stores assignments and lets members continue saved work.
- Projects, Calendar, Reports, Accounts, Banking, Money Transfer, Files, Notifications, Settings and Database are separate sections.
- Music Player is a separate slot with Spotify/JioSaavn/YouTube Music/Apple Music/Amazon Music launchers and local audio playback.
- Every tool slot supports manual Add App with a custom URL.
- Every page has Back + Main Dashboard navigation.

## Auto-save and restore
The browser saves state immediately in localStorage; changes are then queued for Supabase synchronization. Reopening the site restores the saved project/task/workspace state without recreating the work.

## Supabase
1. Run `database.sql` in the target Supabase project.
2. Anonymous Sign-In must be enabled.
3. Confirm `public.srs_vision_state` is included in Realtime.
4. `supabase-config.js` uses the publishable key only.

External apps still require their own accounts/OAuth/permissions; the website cannot bypass another provider's security or login.
