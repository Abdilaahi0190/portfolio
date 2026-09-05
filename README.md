# Abdullahi Ahmed — Personal Developer Portfolio

Premium personal portfolio for a **Mobile-Focused Full-Stack Developer**.

Stack: **React (Vite) + Tailwind + Framer Motion** · **Node/Express** · **MongoDB/Mongoose**

```text
portfolio/
├── client/   # React frontend
└── server/   # Express API
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (optional — API falls back to in-memory project data)

## Setup

```bash
# from portfolio root
npm install
npm install --prefix client
npm install --prefix server

# optional: copy env
cp server/.env.example server/.env
```

## Run

```bash
# both client + server
npm install concurrently
npm run dev

# or separately
npm run dev:server   # http://localhost:5000
npm run dev:client   # http://localhost:5173
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | List projects (`?featured=true`) |
| GET | `/api/projects/:slug` | Project detail |
| POST | `/api/contact` | Contact form |

## Content notes

- Projects and roles are based on verified local repositories and git history.
- Education fields and LinkedIn URL include placeholders — update in `client/src/data/personal.js`.
- Contact email: `pioquule@gmail.com`
- GitHub: [Abdilaahi0190](https://github.com/Abdilaahi0190)

## Update your details

Edit:

- `client/src/data/personal.js` — name, links, about, education, journey
- `server/src/data/projects.js` — projects (keep client fallback in sync if needed)
