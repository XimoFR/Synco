# Synco

Plataforma para encontrar grupo y ir a conciertos del underground español sin tener que ir solo.

## Stack

- **Frontend**: React 19 + Vite 8, React Router, GSAP, Tailwind CSS v4
- **Backend**: PHP 8 + MySQL
- **APIs**: Bandsintown (conciertos), Spotify (artistas)

## Estructura

```
Synco/
├── src/
│   ├── components/     # UI y layout reutilizables
│   ├── context/        # AuthContext, estado global
│   ├── data/           # Mock data (fase desarrollo)
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Intro, Login, Register, Home, Concert, Chat
│   └── styles/         # Design system (globals.css, fonts.css)
└── backend/
    ├── api/            # Endpoints REST (auth, concerts, groups, messages)
    ├── config/         # BD y router
    ├── middleware/      # JWT auth
    └── models/         # User, Concert, Group, Message
```

## Setup local

### Frontend
```bash
npm install
npm run dev
```

### Backend
1. Copia `backend/config/database.example.php` → `backend/config/database.php`
2. Rellena credenciales de MySQL
3. Apunta Apache/Nginx a la carpeta `backend/`

## Design system

| Token | Valor |
|-------|-------|
| `--color-lavender` | `#C9A7F2` |
| `--color-lime` | `#D4FF4F` |
| `--color-cream` | `#F5F0E8` |
| `--color-obsidian` | `#0A0A0A` |
| `--font-display` | Clash Display |
| `--font-body` | Geist |
