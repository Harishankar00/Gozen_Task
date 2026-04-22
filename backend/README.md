# Backend — Express + TypeScript RBAC

A Role-Based Access Control (RBAC) middleware system demonstrating:

- **Role enum** — `ADMIN`, `EDITOR`, `CONTRIBUTOR`.
- **Declaration merging** — extends Express `Request` with a typed `user` property.
- **`authenticate`** — simulated JWT / Bearer-token middleware.
- **`authorize(roles)`** — higher-order middleware returning a role gate.
- **Protected routes** with appropriate HTTP status codes (401 vs 403).

## Stack

- Node.js 18+
- Express 4
- TypeScript 5
- `tsx` for dev (ESM + TS, no build step)

## Structure

```
src/
├── types/          # Role enum, Express Request augmentation
├── middleware/     # authenticate, authorize
├── routes/         # /profile, /content, /system
└── index.ts        # Express app entry point
```

## Running

```bash
npm install
npm run dev          # tsx watch (hot reload) on http://localhost:3000
npm run build        # compile to dist/
npm start            # run compiled dist/
```

## Testing the endpoints

```bash
# No token → 401 Unauthorized
curl -i http://localhost:3000/profile

# With token (any string) → 200 OK (simulated CONTRIBUTOR user)
curl -i -H "Authorization: Bearer anytoken" http://localhost:3000/profile

# CONTRIBUTOR trying to POST /content → 403 Forbidden (requires ADMIN or EDITOR)
curl -i -X POST -H "Authorization: Bearer anytoken" http://localhost:3000/content
```
