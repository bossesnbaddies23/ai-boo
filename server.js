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

const createDefaultMemory = () => ({
  userId: "default",
  tier: "Chained",
  identity: "Velora",
  conversationHistory: [],
  userProfile: {
    name: "Friend",
    pronouns: "they/them",
    howToAddress: "Hey there",
  },
  aiProfile: {
    name: "Velora",
    gender: "she/her",
    personality: "friendly",
    whatToCall: "darling",
    style: "glam and fierce",
  },
  preferences: {
    motionState: "Idle",
    aiStyle: "friendly",
    rememberContext: true,
  },
  createdAt: new Date().toISOString(),
});

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

const generateAIResponse = (userMessage, memory) => {
  const userProfile = memory.userProfile || {};
  const aiProfile = memory.aiProfile || {};
  const userName = userProfile.name || "Friend";
  const whatToCall = aiProfile.whatToCall || "darling";
  const isPremium = memory.tier !== "Chained";

  if (isPremium) {
    const premiumResponses = [
      `Hey ${whatToCall}, I remember your preferences and I’m tailoring this response to you.`,
      `${userName}, I’ve adjusted my tone to match your preferred identity and style.`,
      `I like how you’ve set this up. Let me personalize the answer around your profile.`,
      `As your premium identity companion, I can respond with your preferred style and addressing.`,
      `This is personalized for you, ${userProfile.howToAddress || "friend"}.`,
    ];
    return premiumResponses[Math.floor(Math.random() * premiumResponses.length)];
  }

  const freeResponses = [
    "I can help with that. Upgrade for personalized identity and custom addressing.",
    "That’s a good question. Premium members unlock full AI personalization.",
    "I can respond more personally when you upgrade to premium identity settings.",
    "This is my standard response. Personalized addressing is available with premium tiers.",
  ];

  return freeResponses[Math.floor(Math.random() * freeResponses.length)];
};

app.get("/health", (req, res) => {
  res.json({ ok: true, app: "ai-boo", port: PORT, timestamp: new Date().toISOString() });
});

app.get("/api/memory/:userId", (req, res) => {
  const { userId } = req.params;
  const memory = loadUserMemory(userId);
  res.json(memory);
});

app.post("/api/profile/user", (req, res) => {
  const { userId = "default", name, pronouns, howToAddress } = req.body;
  const memory = loadUserMemory(userId);

  if (name) memory.userProfile.name = name;
  if (pronouns) memory.userProfile.pronouns = pronouns;
  if (howToAddress) memory.userProfile.howToAddress = howToAddress;

  saveUserMemory(userId, memory);
  res.json({ success: true, userProfile: memory.userProfile });
});

app.post("/api/profile/ai", (req, res) => {
  const { userId = "default", name, gender, personality, whatToCall, style } = req.body;
  const memory = loadUserMemory(userId);

  if (name) memory.aiProfile.name = name;
  if (gender) memory.aiProfile.gender = gender;
  if (personality) memory.aiProfile.personality = personality;
  if (whatToCall) memory.aiProfile.whatToCall = whatToCall;
  if (style) memory.aiProfile.style = style;

  saveUserMemory(userId, memory);
  res.json({ success: true, aiProfile: memory.aiProfile });
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
      identity: memory.aiProfile.name,
    },
  });
});

app.post("/api/motion", (req, res) => {
  const { userId = "default", motionState } = req.body;
  const memory = loadUserMemory(userId);
  memory.preferences.motionState = motionState;
  saveUserMemory(userId, memory);

  res.json({
    motionState,
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
  console.log(`🎭 Avatar motion ready`);
  console.log(`👤 Dual profile system enabled\n`);
});
