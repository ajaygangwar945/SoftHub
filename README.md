![SoftHub Banner](public/assets/images/banner_placeholder.svg)

<h1 align="center">🚀 SoftHub</h1>

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email%20OTP-0A66C2?style=for-the-badge&logo=gmail&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

---

## 📖 About

<p align="justify">
<b>SoftHub</b> is a secure and scalable server-side application built with <b>Node.js</b> and <b>Express.js</b>. It provides RESTful APIs for user authentication, data management, and email-based OTP password recovery.
</p>

<p align="justify">
The application integrates <b>MongoDB</b> for persistent data storage and follows industry-standard security practices, including <b>bcrypt password hashing</b>, <b>JWT-based authentication</b>, and secure environment configuration. It is deployed on <b>Render</b> as a production-ready backend service.
</p>

---

## 🔗  View Live Site

<p align="left">
  <strong>👉 Visit SoftHub :</strong><br><br>
  <a href="https://softhub-bwnd.onrender.com">
    <img src="https://img.shields.io/badge/SoftHub-Live-6366f1?style=for-the-badge&logo=render&logoColor=white"/>
  </a>
</p>

---

## Features

- **Modern UI** - Clean, responsive design with glassmorphism effects and 3D animations.
- **Fully Responsive** - Optimized for all devices including mobiles, tablets, and desktops.
- **Multi-Platform** - Browse software for Windows, macOS, and Android.
- **Categories** - Organized sections for Browsers, Communication, Games, PDF Editors, and more.
- **User Authentication** - Secure sign-in with email/password and OTP-based password reset.
- **Search** - Find software quickly with integrated search functionality.
- **Dark/Light Mode** - Automatic theme detection with manual toggle.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB |
| **Authentication** | bcrypt (password hashing) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Deployment** | Render |

---

## Project Structure

```
SoftHub/
├── public/                 # Static frontend files
│   ├── index.html          # Main page
│   ├── css/
│   │   └── styles.css      # Global styles
│   ├── js/
│   │   ├── config.js       # API configuration
│   │   └── main.js         # Main JavaScript
│   ├── auth/               # Authentication pages
│   │   ├── login.html
│   │   ├── register.html
│   │   └── forgot-password.html
│   ├── categories/         # Category pages
│   │   └── browsers.html
│   └── assets/             # Images and icons
│       ├── icons/
│       └── images/
├── src/                    # Backend source
│   ├── models/
│   │   └── User.js         # User model
│   └── routes/
│       └── auth.js         # Auth API routes
├── server.js               # Express server
├── package.json
├── .env.example
├── .gitignore
├── render.yaml
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Atlas or local)
- Gmail account (for OTP emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ajaygangwar945/SoftHub.git
   cd SoftHub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   PORT=5000
   ```

4. **Run the server**

   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

5. **Open in browser**

   Visit `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Create new user account |
| `POST` | `/api/signin` | Sign in existing user |
| `POST` | `/api/send-otp` | Send password reset OTP |
| `POST` | `/api/reset-password` | Reset password with OTP |

### Example Request

```javascript
// Register a new user
fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword',
    confirmPassword: 'securepassword'
  })
});
```

---

## Database Schema

### User Model

```javascript
{
  name: String,           // Required
  email: String,          // Required, unique
  password: String,       // Required, hashed
  otp: {
    code: String,
    expiresAt: Date
  },
  createdAt: Date
}
```

---

## Security

- **Password Hashing** - All passwords are hashed using bcrypt with salt rounds
- **OTP Expiry** - Reset codes expire after 10 minutes
- **Input Validation** - All inputs are validated server-side
- **Environment Variables** - Sensitive data stored securely
- **Path Protection** - Sensitive files blocked from public access

---

## Deployment

This project is configured for deployment on Render. The `render.yaml` file contains the deployment configuration.

### Deploy to Render

1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` configuration
3. Add your environment variables in Render dashboard
4. Deploy!

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License.

---

Made with love by the SoftHub Team
