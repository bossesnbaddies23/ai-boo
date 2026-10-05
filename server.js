import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

const MEMORY_FILE = path.join(__dirname, "data", "user-memory.json");
const CREATORS_FILE = path.join(__dirname, "data", "creators.json");

const ensureDataDir = () => {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const loadCreators = () => {
  ensureDataDir();
  if (fs.existsSync(CREATORS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CREATORS_FILE, "utf8"));
    } catch (e) {
      return [];
    }
  }
  return [];
};

const saveCreators = (creators) => {
  ensureDataDir();
  fs.writeFileSync(CREATORS_FILE, JSON.stringify(creators, null, 2));
};

const createDefaultMemory = () => ({
  userId: "default",
  tier: "free",
  trialStartDate: new Date().toISOString(),
  trialDaysRemaining: 7,
  aiProfile: {
    name: "Velora",
    gender: "she/her",
    personality: "fierce and sassy",
    whatToCall: "babe",
    style: "glam and confident",
  },
  votes: [],
  conversationHistory: [],
});

const loadUserMemory = (userId = "default") => {
  ensureDataDir();
  const MEMORY_FILE = path.join(__dirname, "data", `${userId}-memory.json`);
  if (fs.existsSync(MEMORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
    } catch (e) {
      return createDefaultMemory();
    }
  }
  return createDefaultMemory();
};

const saveUserMemory = (userId = "default", memory) => {
  ensureDataDir();
  const MEMORY_FILE = path.join(__dirname, "data", `${userId}-memory.json`);
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
};

const checkTrialStatus = (memory) => {
  const trialStart = new Date(memory.trialStartDate);
  const now = new Date();
  const daysPassed = Math.floor((now - trialStart) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 7 - daysPassed);
  memory.trialDaysRemaining = daysRemaining;
  return daysRemaining > 0;
};

app.get("/health", (req, res) => {
  res.json({ ok: true, app: "bosses-baddies", port: PORT });
});

app.get("/api/creators/:category", (req, res) => {
  const { category } = req.params;
  const creators = loadCreators();
  const filtered = creators.filter((c) => c.category === category);
  res.json(filtered);
});

app.post("/api/creators", (req, res) => {
  const { name, image, category, bio } = req.body;
  if (!name || !image || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const creators = loadCreators();
  const newCreator = {
    id: Date.now(),
    name,
    image,
    category,
    bio,
    votes: 0,
    createdAt: new Date().toISOString(),
  };
  creators.push(newCreator);
  saveCreators(creators);
  res.json({ success: true, creator: newCreator });
});

app.post("/api/vote", (req, res) => {
  const { userId = "default", creatorId, voteType } = req.body;
  const memory = loadUserMemory(userId);

  if (!checkTrialStatus(memory) && memory.tier === "free") {
    return res.status(403).json({ error: "Trial expired. Upgrade to continue voting." });
  }

  memory.votes.push({
    creatorId,
    voteType,
    timestamp: new Date().toISOString(),
  });

  saveUserMemory(userId, memory);
  res.json({ success: true, message: `Voted ${voteType} for creator ${creatorId}` });
});

app.get("/api/memory/:userId", (req, res) => {
  const { userId } = req.params;
  const memory = loadUserMemory(userId);
  checkTrialStatus(memory);
  res.json(memory);
});

app.post("/api/ai-chat", (req, res) => {
  const { userId = "default", message } = req.body;
  const memory = loadUserMemory(userId);

  if (!checkTrialStatus(memory) && memory.tier === "free") {
    return res.json({
      response: "Your free trial has ended. Upgrade to keep chatting with me!",
      canChat: false,
    });
  }

  memory.conversationHistory.push({ message, timestamp: new Date().toISOString() });
  saveUserMemory(userId, memory);

  const responses = [
    "You're doing amazing, babe! Keep voting!",
    "I love the energy here. Who's your favorite creator?",
    "These creators are fierce. What do you think?",
    "Stay legendary, darling. Vote wisely!",
  ];

  res.json({
    response: responses[Math.floor(Math.random() * responses.length)],
    canChat: true,
  });
});

app.post("/api/upgrade", (req, res) => {
  const { userId = "default", tier } = req.body;
  const memory = loadUserMemory(userId);
  memory.tier = tier;
  memory.upgradedAt = new Date().toISOString();
  saveUserMemory(userId, memory);
  res.json({ success: true, tier });
});

app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("App not found. Run npm run build first.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🔥 Bosses & Baddies is live on http://localhost:${PORT}`);
  console.log(`🎤 AI Boo voice assistant ready`);
  console.log(`📱 Creator voting platform active\n`);
});
