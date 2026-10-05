import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/health", (req, res) => {
  res.json({ ok: true, app: "ai-boo", port: PORT });
});

app.get("/api/demo", (req, res) => {
  res.json({
    status: "ok",
    message: "AI Boo is live.",
    identity: "Velora",
    tier: "Unchained",
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
  console.log(`AI Boo server running on http://localhost:${PORT}`);
});
