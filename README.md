# Gozen_Task

A two-part full-stack TypeScript assignment.

- **[frontend/](./frontend)** — React + TypeScript search interface with reusable, typed primitives (`useLocalStorage`, `useDebounce`, `Button`).
- **[backend/](./backend)** — Node.js + Express RBAC middleware system with protected routes and proper 401/403 handling.

## Structure

```
.
├── frontend/   # React + Vite + TypeScript — Part 1
│   └── src/
│       ├── hooks/          # useLocalStorage<T>, useDebounce<T>
│       ├── components/     # Button (variants, sizes, loading, forwardRef)
│       ├── api/            # mock search API
│       └── App.tsx         # search UI wiring everything together
│
└── backend/    # Node.js + Express + TypeScript — Part 2
    └── src/
        ├── types/          # Role enum + Request declaration merging
        ├── middleware/     # authenticate, authorize
        ├── routes/         # /profile, /content, /system
        └── index.ts        # server entry
```

## Running

### Frontend

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
```

### Backend

```bash
cd backend
npm install
npm run dev     # http://localhost:3000
```

## Part 1 — Frontend highlights

| Piece | What it demonstrates |
|---|---|
| `useLocalStorage<T>` | TypeScript generics, lazy init, JSON parse/stringify error handling, cross-tab `storage` event sync |
| `useDebounce<T>` | `useEffect` cleanup pattern for cancelling timers on every re-render |
| `Button` | `forwardRef`, `extends ButtonHTMLAttributes<HTMLButtonElement>`, discriminated unions for variants, `aria-busy`, CSS Modules |
| `App.tsx` | Composition of all three primitives, race-condition guard with a `cancelled` flag |

## Part 2 — Backend highlights

| Piece | What it demonstrates |
|---|---|
| `Role` enum | String-valued TS enum used across middleware and route config |
| `express.d.ts` | Declaration merging into `Express.Request` to safely type `req.user` |
| `authenticate` | Bearer-token parsing, clean separation of "who is this?" from "can they?" |
| `authorize(roles)` | Higher-order function returning configured middleware |
| Routes | Middleware chain composition: `authenticate` → `authorize([...])` → handler |

### Testing the backend endpoints

Three demo tokens simulate three roles: `admin-token`, `editor-token`, and any other string for `CONTRIBUTOR`.

```bash
# 401 — no token
curl -i http://localhost:3000/profile

# 200 — any authenticated user
curl -i -H "Authorization: Bearer foo" http://localhost:3000/profile

# 403 — CONTRIBUTOR cannot create content
curl -i -X POST -H "Authorization: Bearer foo" \
  -H "Content-Type: application/json" -d '{"title":"hello"}' \
  http://localhost:3000/content

# 201 — EDITOR can create content
curl -i -X POST -H "Authorization: Bearer editor-token" \
  -H "Content-Type: application/json" -d '{"title":"hello"}' \
  http://localhost:3000/content

# 403 — EDITOR cannot delete the system
curl -i -X DELETE -H "Authorization: Bearer editor-token" \
  http://localhost:3000/system

# 200 — only ADMIN can delete the system
curl -i -X DELETE -H "Authorization: Bearer admin-token" \
  http://localhost:3000/system
```

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript 5, Vite 5, CSS Modules |
| Backend | Node.js 18+, Express 4, TypeScript 5, `tsx` (dev) |
