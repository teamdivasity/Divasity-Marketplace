const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testRegister() {
    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
                userName: 'test_user',
                address: '123 Test Street',
                telephone: '1234567890',
                password: 'testpassword123'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Wait a bit for server to start
setTimeout(testRegister, 3000);