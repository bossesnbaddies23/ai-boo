# AI Boo Monorepo

A unified platform combining AI avatar experiences with subscription-based membership management.

## 📦 Packages

### `packages/ai-boo`
AI Avatar Platform - Personalized AI avatar with 3D/2D customization, subscription tiers, and monetization features.

**Tech Stack:** React, Vite, Express, TailwindCSS

**Scripts:**
```bash
npm run dev:ai-boo      # Start dev server
npm run build:ai-boo    # Build for production
npm start:ai-boo        # Run production server
```

### `packages/unchained`
Subscription & Membership Platform - Member portal, authentication, subscription management, and financial tracking for bossesnbaddies.com.

**Tech Stack:** Express, Node.js

**Scripts:**
```bash
npm run dev:unchained      # Start dev server
npm run build:unchained    # Build for production
npm start:unchained        # Run production server
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development
Run both projects simultaneously:
```bash
# Terminal 1 - AI Boo
npm run dev:ai-boo

# Terminal 2 - Unchained
npm run dev:unchained
```

Or run individually:
```bash
npm run dev:ai-boo
npm run dev:unchained
```

### Production Build
```bash
npm run build:ai-boo
npm run build:unchained
```

### Start Production Servers
```bash
npm start:ai-boo      # Runs on configured port
npm start:unchained   # Runs on configured port
```

## 📁 Monorepo Structure

```
ai-boo-monorepo/
├── packages/
│   ├── ai-boo/              # AI Avatar Platform
│   │   ├── src/
│   │   ├── public/
│   │   ├── server.js
│   │   ├── vite.config.js
│   │   └── package.json
│   │
│   └── unchained/           # Membership Platform
│       ├── src/
│       ├── server.js
│       └── package.json
│
├── .gitignore
├── package.json             # Workspaces root
└── README.md
```

## 🔗 Integration

Both packages are now managed together:
- **Shared dependencies** - Defined at root level
- **Isolated environments** - Each package maintains independence
- **Independent deployment** - Deploy either or both to production
- **Unified versioning** - Coordinated releases via monorepo

## 📝 License

MIT License - Bosses N Baddies

## 🤝 Contributing

1. Navigate to the specific package directory
2. Make your changes
3. Commit to the monorepo
4. Deploy individually or together

---

**🎯 Mission:** Build the ultimate AI avatar experience with seamless subscription management.
