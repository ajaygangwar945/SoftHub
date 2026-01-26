const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate secure 6-digit OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Validation helpers
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      message: 'Account created successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Sign in user
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Sign in successful',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Server error during sign in' });
  }
});

// Send OTP for password reset
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = { code: otp, expiresAt };
    await user.save();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SoftHub - Password Reset Code',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6366f1; margin: 0;">SoftHub</h1>
            <p style="color: #64748b; margin-top: 5px;">Password Reset</p>
          </div>
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 16px; padding: 30px; text-align: center;">
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px;">Your verification code is:</p>
            <div style="background: rgba(255,255,255,0.2); border-radius: 12px; padding: 20px; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: white; letter-spacing: 8px;">${otp}</span>
            </div>
            <p style="color: rgba(255,255,255,0.8); margin: 20px 0 0; font-size: 14px;">This code expires in 10 minutes</p>
          </div>
          <p style="color: #64748b; font-size: 13px; text-align: center; margin-top: 30px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `
    });

    res.status(200).json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
});

// Reset password with OTP
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.otp?.code) {
      return res.status(400).json({ error: 'Please request a new verification code' });
    }

    if (user.otp.code !== otp) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    if (new Date() > user.otp.expiresAt) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    user.password = newPassword;
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;
