# JiraNote

JiraNote is a small side project I built to turn Jira tickets into meeting-prep notes.

It pulls data from the Jira API through Netlify functions, groups tickets by recipient, and helps you quickly review, edit, and export a clean note before a meeting.

## What it does

- Fetches Jira sprint issues and epics from the Jira API
- Organizes tickets into meeting-ready notes
- Lets you add recipients, duplicate rows, and adjust story points
- Preview the generated text before exporting it

## Tech stack

- React + TypeScript
- Vite
- Netlify Functions
- Axios

## Setup

The Netlify functions expect these environment variables:

- `API_USERNAME`
- `API_SECRET_KEY`

## Available scripts

- `npm run dev` — start the local dev server
- `npm run build` — build the app
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build

## Notes

This was built as a fun utility for converting Jira work into something easier to use during meeting preparation.
