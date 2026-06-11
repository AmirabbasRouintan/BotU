<div align="center">
  <h1 style="color: #d3869b; font-family: monospace; font-size: 2.5em; margin: 0; font-weight: bold;">BotU</h1>
  <p style="font-size: 1.1em; color: #83a598; margin-top: 5px;">
    <strong>A no-code Telegram bot builder platform with AI-powered assistance</strong>
  </p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite" alt="Vite">
    <img src="https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django" alt="Django">
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
    <img src="https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=googlegemini" alt="Gemini">
  </p>
</div>

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🤖 **Bot Builder** | Create and configure Telegram bots visually through a web dashboard |
| 🎨 **Bot Appearance** | Customize bot name, avatar, colors, and description |
| 💬 **Command Builder** | Define custom commands with responses, permissions, and activation toggles |
| 🤖 **AI Integration** | Google Gemini-powered AI assistant and bot intelligence |
| 📊 **Analytics Dashboard** | Real-time bot statistics, activity feed, and usage trends |
| 🔐 **Authentication** | JWT-based user registration and login system |
| 🌐 **Bilingual** | Full English and Persian (Farsi) language support with RTL |
| ⚙️ **Settings** | Profile management, password change, 2FA, API keys |
| 🔔 **Notifications** | Email and in-app notification preferences |
| 🧩 **Help Center** | FAQ, command reference, troubleshooting, and support |

</div>

---

## 🚀 Installation

### Prerequisites

- **Node.js v18+** (for frontend)
- **Python 3.8+** with pip (for backend)
- **Google Gemini API key** (for AI features)

### Frontend Setup

```bash
git clone https://github.com/AmirabbasRouintan/BotU.git
cd BotU
npm install
cp .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173`.

### Backend Setup

```bash
cd Backend/server
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The backend API runs on `http://localhost:8000`.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_URL=http://localhost:8000
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
NODE_ENV=development
```

---

## 🧠 Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 4 |
| **UI Components** | shadcn/ui, Radix primitives, Lucide Icons, Framer Motion, GSAP |
| **Backend** | Django 4.2, Django REST Framework 3.14 |
| **Authentication** | JWT (djangorestframework-simplejwt) |
| **Database** | SQLite |
| **AI** | Google Gemini API |
| **Charts** | Recharts |
| **3D Graphics** | React Three Fiber, Three.js |

</div>

---

## 📁 Project Structure

```
BotU/
├── src/                    # React frontend source
│   ├── components/         # UI components (shadcn/ui + custom)
│   ├── pages/              # Application pages and dashboard tabs
│   ├── contexts/           # Auth, Language, Animation contexts
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utilities, translations, API helpers
├── Backend/server/         # Django backend
│   ├── core/               # Django settings, URLs, WSGI/ASGI
│   └── user/               # User auth, bot/command models, API views
├── public/                 # Static assets, Netlify config
├── package.json
└── vite.config.ts
```

---

## 🔌 API Endpoints

<div align="center">

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register/` | POST | User registration |
| `/auth/login/` | POST | User login (returns JWT) |
| `/auth/bots/` | GET | List user's bots |
| `/auth/update_gemini_api_key/` | POST | Save Gemini API key |
| `/auth/update_botfuther_tokens/` | POST | Save BotFather tokens |
| `/auth/ai/generate-content/` | POST | Gemini AI chat proxy |

</div>

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

<div align="center">
  <br>
  <p style="font-size: 1.3em; color: #d3869b;">
    ⭐ If you found this project useful, please give it a star!
  </p>
  <p style="color: #83a598;">
    It took a lot of time and effort to build this project — your support means a lot ❤️
  </p>
  <br>
  <p>
    <a href="https://github.com/AmirabbasRouintan/BotU">
      <img src="https://img.shields.io/github/stars/AmirabbasRouintan/BotU?style=for-the-badge&logo=github&color=yellow" alt="Stars">
    </a>
    <a href="https://github.com/AmirabbasRouintan/BotU/issues">
      <img src="https://img.shields.io/github/issues/AmirabbasRouintan/BotU?style=for-the-badge&logo=github" alt="Issues">
    </a>
  </p>
  <br>
</div>
