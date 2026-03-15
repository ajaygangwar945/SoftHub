<img align="center" src="public/assets/images/banner_placeholder.svg" width="100%" height="200" style="object-fit: cover">

<h1 align="center">🚀 SoftHub</h1>

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vanta.js](https://img.shields.io/badge/Vanta.js-3D%20Visuals-6366f1?style=for-the-badge&logo=javascript&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-OTP%20Auth-0A66C2?style=for-the-badge&logo=gmail&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

---

**SoftHub** is a high-performance, full-stack software distribution platform. It combines a cinematic frontend experience with a robust, secure Node.js backend. Designed for speed and visual excellence, SoftHub provides a seamless way to discover and download apps for Windows, macOS, and Android.

> [!NOTE]
> For a deep dive into the technical architecture, design rationale, and core logic, please refer to the [Technical Documentation](project_details.txt).

---

## ✨ Key Features

### 🎨 Visual & UI/UX

- **Cinematic 3D Backgrounds**: Powered by **Vanta.js** (Halo, Globe, Net, etc.) which dynamically adapt to Light/Dark mode.
- **High-Res Game Covers**: Optimized PNG assets for sharp visuals and fast load times.
- **Premium Animation Engine**: Custom cubic-bezier easing and hardware-accelerated transitions for a buttery-smooth experience.
- **Scroll Reveal System**: High-performance `IntersectionObserver` based animations that trigger dynamically as you explore the site.
- **Glassmorphism Design**: Modern, translucent UI components with smooth transitions.
- **Fully Responsive**: Fluid layout that scales perfectly from mobile to ultra-wide displays.
- **Typed.js Interaction**: Dynamic hero section text for an engaging first-visit experience.

### 🛡️ Backend & Security

- **Production-Ready Server**: Built with **Express.js** and **Mongoose**.
- **Secure Authentication**: Salted bcrypt hashing for passwords and secure account management.
- **OTP Password Recovery**: Integrated **Nodemailer** for email-based 6-digit verification codes.
- **MongoDB Integration**: Robust data persistence for users and software metadata.
- **Asset Protection**: Server-side blocking of sensitive files (.env, server.js, etc.).

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, Vanilla CSS (Glassmorphism), JavaScript (ES6+) |
| **Animation** | Vanta.js (Three.js), Typed.js, Intersection Observer |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Security** | Bcrypt, Node-Crypto (Secure Tokens) |
| **Emailing** | Nodemailer (SMTP/OTP) |
| **Hosting** | Render |

---

## 📂 Project Structure

```text
SoftHub/
├── public/                 # Optimized Frontend
│   ├── index.html          # Core Interface (Main Landing Page)
│   ├── favicon.svg         # Site Icon
│   ├── auth/               # Access Control (Login/Register/Forgot)
│   ├── categories/         # Platform & Software Collections
│   ├── css/                # Styling Engines (Styles & Categories)
│   ├── js/                 # Interactive Logic & 3D Controllers
│   └── assets/             # Media Resources (Icons & Banners)
├── src/                    # Backend Source Code
│   ├── models/             # Database Schemas (Mongoose)
│   └── routes/             # API Endpoints (Auth & OTP)
├── server.js               # Node.js Server Entry Point
├── package.json            # Project Manifest & Metadata
├── render.yaml             # Deployment Configuration
├── .env.example            # Environment Configuration Template
└── .env                    # Environment Variables (Secrets)
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/ajaygangwar945/SoftHub.git
cd SoftHub
npm install
```

### 2. Environment Setup

Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_uri
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
```

### 3. Launch

```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## 📡 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register` | `POST` | User Onboarding |
| `/api/signin` | `POST` | Secure Access |
| `/api/send-otp` | `POST` | Trigger Password Reset |
| `/api/reset-password` | `POST` | Finalize Recovery |

---

## 🚀 View Live Site

The project is live and accessible online.

[![Live Website](https://img.shields.io/badge/LIVE-VISIT_SITE-6366f1?style=for-the-badge&logo=render&logoColor=white)](https://softhub-bwnd.onrender.com/)

---

## 🔒 Security Best Practices

- **Environment Isolation**: Sensitive keys are never committed to version control.
- **OTP Expiry**: Verification codes are strictly valid for 10 minutes.
- **Data Sanitization**: Automatic removal of internal user data in API responses.
- **CORS Enabled**: Cross-Origin Resource Sharing configured for secure interactions.

---

<div align="center">

### ⭐ Star this repository to show your support

Built with 💜 by the SoftHub Team

</div>
