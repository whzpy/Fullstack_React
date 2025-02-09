const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());

const SECRET_KEY = 'your-secret-key'; // Replace with a secure key in production

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate credentials (this is a simplified example)
    if (email === 'user@example.com' && password === 'password123') {
        // Create a JWT token
        const token = jwt.sign(
            { userId: 123, email: email }, // Payload (data to include in the token)
            SECRET_KEY,                   // Secret key to sign the token
            { expiresIn: '1h' }           // Token expiration time
        );

        // Send the token to the client
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});