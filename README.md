# SoftHub Backend

Backend server for SoftHub application with MongoDB integration and OTP email functionality for password reset.

## Features

- User registration with password hashing (bcrypt)
- User sign-in authentication
- Password reset via OTP sent to email
- MongoDB database integration
- Secure password storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Gmail account (for sending OTP emails)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Configure your `.env` file:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `EMAIL_USER` to your Gmail address
   - Set `EMAIL_PASS` to your Gmail App Password (not your regular password)

### Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Use this 16-character password in your `.env` file

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Register User
- **POST** `/api/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

### Sign In
- **POST** `/api/signin`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Send OTP
- **POST** `/api/send-otp`
- **Body:**
  ```json
  {
    "email": "john@example.com"
  }
  ```

### Reset Password
- **POST** `/api/reset-password`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "otp": "123456",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
  }
  ```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  otp: {
    code: String,
    expiresAt: Date
  },
  createdAt: Date
}
```

## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- OTP expires after 10 minutes
- Email validation
- Password confirmation matching
- Minimum password length validation (6 characters)

## Notes

- OTP codes are 6-digit numbers
- OTP expires 10 minutes after generation
- Each OTP can only be used once
- Passwords must be at least 6 characters long

