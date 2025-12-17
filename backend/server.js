/**
 * Minimal backend demonstrating correct authorization flow.
 */

import express from "express";
import { issueToken, verifyAdmin } from "./auth.js";
import { getUserById } from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

/**
 * Simulated login route.
 * Credentials are assumed to be valid for demonstration.
 */
app.post("/login", (req, res) => {
  const user = getUserById(2); // bob (admin) for demo
  const token = issueToken(user);

  res.json({ token });
});

/**
 * Admin-only route.
 * Access is verified by backend logic.
 */
app.post("/admin/reset", (req, res) => {
  const { token } = req.body;

  if (!verifyAdmin(token)) {
    return res.status(403).json({ error: "Admin access required" });
  }

  res.json({ message: "Admin action performed securely" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
