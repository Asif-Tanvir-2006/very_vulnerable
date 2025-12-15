/**
 * Minimal backend demonstrating correct secret handling.
 * Secrets are NEVER exposed to the frontend.
 */

import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

// Secrets come from environment variables
const API_KEY = process.env.API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());

// Sanity check route
app.get("/", (req, res) => {
  res.json({
    status: "Backend running",
    secretsLoaded: Boolean(API_KEY && JWT_SECRET)
  });
});

// Example: backend-only API usage
app.get("/secure-api", (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: "API_KEY not set" });
  }

  // API_KEY would be used here to call an external service
  res.json({
    message: "API call made securely from backend",
    apiKeyExposed: false
  });
});

// Example: JWT issued by backend
app.post("/token", (req, res) => {
  if (!JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET not set" });
  }

  const payload = {
    username: "demo_user",
    role: "user"
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
