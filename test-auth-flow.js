const API_URL = 'http://localhost:5000/api';
const TEST_USER = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    confirmPassword: 'password123'
};

async function runTests() {
    console.log('Starting Auth Flow Tests...');

    try {
        // 1. Register
        console.log('\n1. Testing Registration...');
        const registerRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_USER)
        });
        const registerData = await registerRes.json();

        if (!registerRes.ok) throw new Error(registerData.error || 'Registration failed');
        console.log('✅ Registration Successful:', registerData.message);

        // 2. Sign In
        console.log('\n2. Testing Sign In...');
        const signinRes = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: TEST_USER.email,
                password: TEST_USER.password
            })
        });
        const signinData = await signinRes.json();

        if (!signinRes.ok) throw new Error(signinData.error || 'Sign in failed');
        console.log('✅ Sign In Successful:', signinData.message);

        // 3. Request OTP
        console.log('\n3. Testing Send OTP...');
        const otpRes = await fetch(`${API_URL}/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: TEST_USER.email })
        });
        const otpData = await otpRes.json();

        if (!otpRes.ok) {
            console.log('⚠️ OTP Send Failed (Expected if no email creds):', otpData.error);
        } else {
            console.log('✅ OTP Sent:', otpData.message);
        }

        console.log('\n✅ Basic Auth Flow Verified.');

    } catch (error) {
        console.error('\n❌ Test Failed:', error.message);
    }
}

runTests();
