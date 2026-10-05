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

const ensureDataDir = () => {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const loadUserMemory = (userId = "default") => {
  ensureDataDir();
  if (fs.existsSync(MEMORY_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
      return data[userId] || createDefaultMemory();
    } catch (e) {
      return createDefaultMemory();
    }
  }
  return createDefaultMemory();
};

const saveUserMemory = (userId = "default", memory) => {
  ensureDataDir();
  let allMemory = {};
  if (fs.existsSync(MEMORY_FILE)) {
    try {
      allMemory = JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
    } catch (e) {
      allMemory = {};
    }
  }
  allMemory[userId] = memory;
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(allMemory, null, 2));
};

const createDefaultMemory = () => ({
  userId: "default",
  tier: "Chained",
  identity: "Velora",
  conversationHistory: [],
  preferences: {
    motionState: "Idle",
    aiStyle: "friendly",
    rememberContext: true,
  },
  createdAt: new Date().toISOString(),
});

const generateAIResponse = (userMessage, memory) => {
  const responses = [
    "I hear you. Let me think about that.",
    "That's an interesting perspective. Here's what I think...",
    "Got it. Based on what you've told me before, I'd say...",
    "You're right. Let me build on that idea.",
    "I remember you mentioned something related to that earlier.",
  ];

  const contextResponses = {
    premium: "As a premium member, I can offer you advanced insights on that.",
    identity: "Your identity is important to me. Let me personalize this response.",
    motion: "I'll adjust my movement style to match this conversation.",
  };

  if (memory.tier !== "Chained") {
    return contextResponses[Object.keys(contextResponses)[Math.floor(Math.random() * 3)]];
  }

  return responses[Math.floor(Math.random() * responses.length)];
};

app.get("/health", (req, res) => {
  res.json({ ok: true, app: "ai-boo", port: PORT, timestamp: new Date().toISOString() });
});

app.get("/api/memory/:userId", (req, res) => {
  const { userId } = req.params;
  const memory = loadUserMemory(userId);
  res.json(memory);
});

app.post("/api/chat", (req, res) => {
  const { userId = "default", message, tier = "Chained" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const memory = loadUserMemory(userId);
  memory.tier = tier;

  const aiResponse = generateAIResponse(message, memory);

  memory.conversationHistory.push({
    userMessage: message,
    aiResponse: aiResponse,
    timestamp: new Date().toISOString(),
    motionState: "Speak",
  });

  if (memory.conversationHistory.length > 50) {
    memory.conversationHistory = memory.conversationHistory.slice(-50);
  }

  saveUserMemory(userId, memory);

  res.json({
    aiResponse: aiResponse,
    motionState: "Speak",
    memory: {
      conversationCount: memory.conversationHistory.length,
      tier: memory.tier,
      identity: memory.identity,
    },
  });
});

app.post("/api/motion", (req, res) => {
  const { userId = "default", motionState } = req.body;

  const memory = loadUserMemory(userId);
  memory.preferences.motionState = motionState;
  saveUserMemory(userId, memory);

  res.json({
    motionState: motionState,
    message: `Avatar motion changed to ${motionState}`,
  });
});

app.post("/api/upgrade", (req, res) => {
  const { userId = "default", newTier } = req.body;

  if (!newTier) {
    return res.status(400).json({ error: "Tier required" });
  }

  const memory = loadUserMemory(userId);
  memory.tier = newTier;
  memory.upgradedAt = new Date().toISOString();
  saveUserMemory(userId, memory);

  res.json({
    success: true,
    tier: newTier,
    message: `Account upgraded to ${newTier}`,
  });
});

app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("App build not found. Run npm run build first.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 AI Boo is live on http://localhost:${PORT}`);
  console.log(`📦 Local AI backend connected`);
  console.log(`💾 User memory system active`);
  console.log(`🎭 Avatar motion ready\n`);
});
