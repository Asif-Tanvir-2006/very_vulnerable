# Backend Example (Educational)

This folder contains a **minimal backend example** added to demonstrate
**where sensitive logic should live in a real-world application**.

The original frontend code contained hardcoded secrets and performed
JWT signing in the browser, which is insecure because frontend code
is always publicly accessible.

---

## Why this backend exists

In real systems:

- API keys and secrets **must never be exposed to the frontend**
- JWT signing and verification **must be handled by a trusted server**
- Frontend code should only **consume backend APIs**, not manage secrets

This backend exists purely to **demonstrate correct architecture** and
**does not aim to be a complete authentication system**.

---

## Secret Management

All sensitive values are read from **environment variables** at runtime:

- `API_KEY`
- `JWT_SECRET`

These values:
- Are **not committed** to GitHub
- Are **not present** in frontend code
- Are **not visible** in the browser

Example (local development):

```bash
export API_KEY="your_api_key_here"
export JWT_SECRET="super_secret_value"
node server.js
