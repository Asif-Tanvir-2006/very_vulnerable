/**
 * Pseudo non-SQL database layer.
 * No real database is connected.
 */

const DB_API_KEY = process.env.DB_API_KEY;

// Simulated user collection
const users = [
  { id: 1, username: "alice", role: "user" },
  { id: 2, username: "bob", role: "admin" }
];

/**
 * Fetch a user by ID.
 * In a real system, this would query a database.
 */
export function getUserById(id) {
  return users.find(user => user.id === id);
}

/**
 * Check whether a user has admin privileges.
 */
export function isAdmin(id) {
  const user = getUserById(id);
  return user && user.role === "admin";
}
