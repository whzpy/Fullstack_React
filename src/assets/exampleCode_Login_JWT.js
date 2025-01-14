// ---------1--------
// Login function
async function login(email, password) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('sessionToken', data.token);
        console.log('Login successful! Token stored.');
    } else {
        console.error('Login failed:', data.error);
    }
}

// Example usage
login('user@example.com', 'password123');

//----------2-------

async function fetchProtectedData() {
    const token = localStorage.getItem('sessionToken');

    if (!token) {
        console.error('No session token found. Please log in.');
        return;
    }

    const response = await fetch('/protected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Protected data:', data);
    } else {
        console.error('Failed to fetch protected data:', response.statusText);
    }
}

// Example usage
fetchProtectedData();
