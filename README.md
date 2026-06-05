# IG Profile Tracker

A local-first Instagram relationship dashboard. Upload your Instagram data export ZIP and instantly see who follows you back, who doesn't, and your full follower/following lists — all processed in the browser with zero server calls.

## Features

- **Not Following Back** — see accounts you follow that don't follow you back
- **Followers & Following lists** — browse and search your full lists
- **Fully local** — your data never leaves the browser
- **Dark/Light mode** — toggle between themes
- **Responsive** — works on desktop and mobile

## Tech Stack

- [React](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build
```

## Docker

```bash
# Using Docker Compose
docker compose up -d
```

The app will be available at [http://localhost:8080](http://localhost:8080).

```bash
# Or build and run manually
docker build -t ig-profile-tracker .
docker run -d -p 8080:80 ig-profile-tracker
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
```

Components are placed in `src/components/ui/`.

## Usage

1. Open the app in your browser
2. Click **Upload ZIP** and select your Instagram data export (JSON format)
3. Browse your followers, following, and not-following-back lists
4. Use the search bar to filter by username

## How to Get Your Instagram ZIP

1. Open Instagram → Settings → Your Activity → Download Your Information
2. Request a download in **JSON** format
3. Wait for the email, download the ZIP
4. Upload it here
