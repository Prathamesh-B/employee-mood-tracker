# Employee Mood Tracker

A simple web application for tracking employee moods, built with Next.js.

## Features

- Submit daily mood entries (happy, neutral, sad) with optional comments
- View all mood entries

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

## Project Structure

- `app/page.tsx` - Home page
- `app/mood/page.tsx` - Mood submission/view page
- `app/admin/page.tsx` - Admin mood overview page
- `app/api/mood.ts` - API route for handling mood entries (GET & POST)
- `app/utils/moods.ts` - In-memory array and utility functions for moods
