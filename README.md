# Bosses & Baddies Platform

A fully open-source creator voting and battling platform with integrated AI assistant.

## Features
- Creator swipe voting (Bosses & Baddies categories)
- AI Boo voice assistant with text-to-speech
- 7-day free trial system
- Premium subscription monetization
- Podcast, Merch, and Upgrade integrations
- Battle percentages and creator stats

## Quick Start

```bash
npm install
npm run build
npm start
```

Open: http://localhost:3000

## Deployment

Deploy to bossesbaddies.com:

```bash
# Build
npm run build

# Deploy to your hosting (Render, Vercel, etc.)
```

## API Endpoints

- `GET /api/creators/:category` - Get creators by category
- `POST /api/vote` - Vote on a creator
- `POST /api/ai-chat` - Chat with AI Boo
- `GET /api/memory/:userId` - Get user data
- `POST /api/upgrade` - Upgrade subscription

## License

MIT - Fully Open Source
