/**
 * Authentication and authorization helpers.
 */

import jwt from "jsonwebtoken";
import { isAdmin } from "./db.js";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Issue a JWT after authentication.
 */
export function issueToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

/**
 * Verify whether a token belongs to an admin user.
 */
export function verifyAdmin(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return isAdmin(decoded.userId);
}
