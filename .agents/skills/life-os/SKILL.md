---
name: life-os-app
description: Personal life tracking dashboard app with health metrics, supplements, gym, meals, and mood tracking.
---

# Life OS App

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Framer Motion animations
- localStorage for data persistence
- Recharts for data visualization
- date-fns for date handling

## Architecture
- /app — Next.js app router pages
- /components — Reusable UI components
- /components/ui — Shadcn base components
- /lib — Utility functions, types, storage helpers
- /lib/storage.ts — localStorage abstraction layer
- /lib/types.ts — TypeScript interfaces for all data models
- /hooks — Custom React hooks for data access

## Data Model
All data stored in localStorage with these keys:
- daily-checkins: Array of {date, anxiety, depression, dpdr, panicAttacks, panicIntensity, nonNegotiables}
- supplements: Array of {date, items: {name, taken: boolean, time: string}[]}
- meals: Array of {date, breakfast, snack1, lunch, snack2, dinner}
- gym: Array of {date, day: A|B|C|D, exercises: {name, sets: {weight, reps}[]}[]}
- nicotine: Array of {date, count, gamblingUrge, gamblingActed}
- notes: Array of {id, date, title, content}
- weekly-reviews: Array of {weekStart, answers: string[]}
