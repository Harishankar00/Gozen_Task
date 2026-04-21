# Frontend — React + TypeScript Search Interface

A small search UI demonstrating reusable, typed React primitives:

- **`useLocalStorage<T>`** — type-safe state synced with `localStorage`.
- **`useDebounce<T>`** — debounced value to avoid excessive API calls while typing.
- **`Button`** — polymorphic, ref-forwarding button with variants, sizes, and a loading state.

## Stack

- React 18
- TypeScript 5
- Vite 5

## Structure

```
src/
├── components/   # Reusable UI components (Button)
├── hooks/        # Custom hooks (useLocalStorage, useDebounce)
├── App.tsx       # Search UI wiring everything together
└── main.tsx      # Entry point
```

## Running

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```
