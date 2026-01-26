/**
 * SoftHub API Configuration
 * Auto-detects environment and configures API endpoints
 */

const isDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_BASE = isDev ? 'http://localhost:5000' : window.location.origin;

const API = {
  base: API_BASE,
  endpoints: {
    register: `${API_BASE}/api/register`,
    signin: `${API_BASE}/api/signin`,
    sendOTP: `${API_BASE}/api/send-otp`,
    resetPassword: `${API_BASE}/api/reset-password`
  }
};

// Helper function for API calls
// Helper function for API calls (Mocked for Demo)
async function apiCall(endpoint, data) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock Responses
  if (endpoint.includes('signin')) {
    if (data.email && data.password) {
      return { ok: true, user: { name: 'Demo User', email: data.email } };
    }
  }

  if (endpoint.includes('register')) {
    if (data.email && data.password) {
      return { ok: true, user: { name: data.name, email: data.email } };
    }
  }

  if (endpoint.includes('send-otp')) {
    return { ok: true };
  }

  if (endpoint.includes('reset-password')) {
    return { ok: true };
  }

  // Fallback to real fetch if needed (unlikely for this static demo)
  /*
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return { ok: response.ok, ...result };
  } catch (error) {
    console.error('API Error:', error);
    return { ok: false, error: 'Network error. Please try again.' };
  }
  */
  return { ok: false, error: 'Mock endpoint not handled' };
}

// Make available globally
window.API = API;
window.apiCall = apiCall;
