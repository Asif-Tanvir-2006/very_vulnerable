# Backend Example (Educational)

This folder contains a **minimal backend example** added to demonstrate
**where sensitive logic such as secrets, authentication, and authorization
should live in a real-world application**.

The original frontend implementation contained hardcoded secrets and
client-side authorization logic, which is insecure because frontend code
is always publicly accessible and fully under user control.

---

## Why this backend exists

In real systems:

- API keys and secrets **must never be exposed to the frontend**
- Authentication and authorization **must be handled by a trusted backend**
- Privileged actions (e.g. admin operations) **must not rely on client-side checks**
- Frontend code should only **request actions**, not decide permissions

This backend exists purely to **demonstrate correct architecture and security
principles** and does **not aim to be a complete production-ready system**.

---

## What this backend demonstrates

- Secure handling of secrets using environment variables
- Backend-issued JSON Web Tokens (JWTs)
- Server-side authorization for admin-only actions
- A pseudo database layer to represent how user roles are verified

All database logic is **intentionally implemented as pseudocode** for
educational clarity.

---

## Pseudo Database Layer

This backend includes a simulated, non-SQL style database layer:

- No real database is connected
- User data is stored in-memory
- Functions such as fetching users and checking admin privileges
  are implemented to demonstrate intent

Database access is assumed to be protected by an API key:

- `DB_API_KEY` (loaded from environment variables)

This mirrors how real backends protect database access without requiring
external services for this demo.

---

## Secret Management

All sensitive values are read from **environment variables** at runtime:

- `API_KEY` – represents access to external services
- `JWT_SECRET` – used to sign and verify JWTs
- `DB_API_KEY` – represents protected database access

These values:

- Are **not committed** to GitHub
- Are **not present** in frontend code
- Are **never exposed** to the browser

Example (local development):

```bash
export API_KEY="your_api_key_here"
export JWT_SECRET="super_secret_value"
export DB_API_KEY="db_access_key"
node server.js
