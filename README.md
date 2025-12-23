# 🚀 SoftHub Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

> A robust backend server for the SoftHub application, featuring secure authentication, MongoDB integration, and email-based OTP password reset.

## 🔗 Live Demo

<p align="left">
  <strong>👉 Visit SoftHub Backend:</strong><br><br>
  <a href="https://softhub-bwnd.onrender.com">
    <img src="https://img.shields.io/badge/Render-Live%20Server-46E3B7?style=for-the-badge&logo=render&logoColor=white"/>
  </a>
</p>


---

## ✨ Features

*   **🔐 Secure Authentication**: User registration and login with `bcrypt` password hashing.
*   **📧 OTP Verification**: Password reset functionality using 6-digit OTPs sent via email.
*   **🗄️ Database Integration**: Seamless connection with MongoDB for reliable data storage.
*   **🛡️ Security First**: Input validation, secure password storage, and protected routes.

---

## 🛠️ Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB
*   **Authentication**: JSON Web Tokens (JWT) & Session
*   **Email Service**: Nodemailer (Gmail SMTP)
*   **Deployment**: Render

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v14+)
*   MongoDB (Atlas or Local)
*   Gmail Account (for OTPs)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ajaygangwar945/SoftHub.git
    cd SoftHub
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    PORT=5000
    ```

4.  **Run the Server**
    ```bash
    # Development
    npm run dev

    # Production
    npm start
    ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/signin` | Sign in an existing user |
| `POST` | `/api/send-otp` | Send password reset OTP |
| `POST` | `/api/reset-password` | Reset password using OTP |

---

## 📝 Database Schema (User)

```javascript
{
  name: String,
  email: String (Unique),
  password: String (Hashed),
  otp: {
    code: String,
    expiresAt: Date
  },
  createdAt: Date
}
```

---

## 🛡️ Security Measures

*   **Bcrypt Hashing**: Passwords are never stored in plain text.
*   **Input Validation**: Strict checks for email formats and password strength.
*   **OTP Expiry**: Reset codes expire automatically after 10 minutes.
*   **Environment Variables**: Sensitive keys are kept out of the codebase.

---

Made with ❤️ by SoftHub Team
