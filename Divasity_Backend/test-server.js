const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testServer() {
    try {
        console.log('Testing server connection...');
        const response = await fetch('http://localhost:3000/');
        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Response:', text);
        
        // Test API endpoint
        console.log('\nTesting API endpoint...');
        const apiResponse = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test2@example.com',
                firstName: 'Test2',
                lastName: 'User2',
                userName: 'test2_user2',
                address: '456 Test Avenue',
                telephone: '0987654321',
                password: 'testpassword456'
            })
        });
        
        const apiData = await apiResponse.json();
        console.log('API Status:', apiResponse.status);
        console.log('API Response:', apiData);
        
    } catch (error) {
        console.error('Server test failed:', error.message);
    }
}

testServer();