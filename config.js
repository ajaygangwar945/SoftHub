/**
 * API Configuration
 * Automatically detects the environment and sets the appropriate API URL
 */

// Detect if we're in development or production
const isDevelopment = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

// Set API URL based on environment
const API_BASE_URL = isDevelopment
    ? 'http://localhost:5000'  // Development
    : window.location.origin;   // Production (same origin as frontend)

// Export configuration
const API_CONFIG = {
    baseURL: API_BASE_URL,
    endpoints: {
        register: `${API_BASE_URL}/api/register`,
        signin: `${API_BASE_URL}/api/signin`,
        sendOTP: `${API_BASE_URL}/api/send-otp`,
        resetPassword: `${API_BASE_URL}/api/reset-password`
    }
};

// Make it available globally
window.API_CONFIG = API_CONFIG;
