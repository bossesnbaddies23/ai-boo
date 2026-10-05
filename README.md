# AI Boo — Your Personalized Open-Source AI Avatar Platform

AI Boo is a fully open-source, self-hosted platform for building your own branded AI avatar companion. Built with React, Express, and Tailwind CSS.

## Features

✅ **Live avatar stage** — animated 2D character with motion states  
✅ **Local AI backend** — self-hosted, no external API dependencies  
✅ **User identity memory** — persistent conversation history and preferences  
✅ **Premium plan gating** — tiered subscription access (Chained, Unchained, Velora Pro)  
✅ **Avatar motion switching** — avatar reacts to AI responses  
✅ **Open-source & deployable** — run locally, on a server, or containerized  
✅ **Monetization ready** — built for subscriptions, contests, and premium features  

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/bossesnbaddies23/ai-boo.git
cd ai-boo

# Install dependencies
npm install

# Build the app
npm run build

# Start the server
npm start
```

Then open: `http://localhost:3000`

### Local Development

```bash
# Terminal 1: Start the Vite dev server (frontend)
npm run dev

# Terminal 2: Start the Express backend
node server.js
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:3000`

## Project Structure

```
ai-boo/
├── src/
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind styles
├── server.js            # Express backend with AI & memory
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
└── data/                # User memory storage (local)
```

## How It Works

### Frontend
- Live avatar stage with motion controls
- Chat interface for talking to your AI
- Premium plan selection and upgrade flow
- User identity memory display

### Backend
- `/api/chat` — send a message and get an AI response
- `/api/memory/:userId` — load user memory and conversation history
- `/api/motion` — update avatar motion state
- `/api/upgrade` — handle subscription tier upgrades
- `/api/health` — health check endpoint

### Memory System
- User conversations are saved locally in `data/user-memory.json`
- Last 50 messages per user are retained
- Tier, identity, and preferences are persisted
- No external database required — fully self-contained

## Deployment

### On Render

1. Push your repo to GitHub
2. In Render: **New → Web Service**
3. Connect your repo
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Deploy

### On a VPS or Your Machine

```bash
# SSH into your server
ssh user@your-server.com

# Clone and install
git clone https://github.com/bossesnbaddies23/ai-boo.git
cd ai-boo
npm install
npm run build

# Run with pm2 (optional, for persistence)
npm install -g pm2
pm2 start server.js --name "ai-boo"
```

### On a USB Drive

1. Download Node.js portable version (or install locally)
2. Copy the entire `ai-boo` folder to your USB
3. Open terminal in the folder
4. Run: `npm install && npm run build && npm start`
5. Open: `http://localhost:3000`

## Customization

### Avatar
- Edit the avatar SVG/styling in `src/App.jsx` (search for "Avatar Stage")
- Add your own MP4 video clips to the avatar stage
- Customize motion states and colors

### AI Responses
- Modify `generateAIResponse()` in `server.js`
- Integrate with Ollama, Hugging Face, or local LLM
- Add custom prompts and personality

### Branding
- Edit header and colors in `src/App.jsx`
- Update Tailwind config for custom theme
- Add your own logo

### Plans & Tiers
- Edit the `plans` array in `src/App.jsx`
- Modify premium feature gating in the backend
- Add contest logic and rewards

## API Reference

### Chat
```bash
POST /api/chat
{
  "userId": "default",
  "message": "What can you do?",
  "tier": "Unchained"
}
```

### Memory
```bash
GET /api/memory/:userId
```

### Motion
```bash
POST /api/motion
{
  "userId": "default",
  "motionState": "Speak"
}
```

### Upgrade
```bash
POST /api/upgrade
{
  "userId": "default",
  "newTier": "Unchained"
}
```

## License

MIT License — See LICENSE file

## Contributing

Fork, create a branch, make your changes, and open a PR. All contributions welcome!

## Support

For issues, feature requests, or questions, open a GitHub issue.

---

**Built with ❤️ for creators who own their AI identity.**
