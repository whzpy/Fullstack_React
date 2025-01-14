// (1) User Login: The user sends their email and password to the server.
// (2) Server Validates Credentials: The server verifies the email and password against its database.
// (3) Generate Session Token: If credentials are valid, the server creates a unique session token.
// (4) Store Session Token:
// __(4a) On the server side (e.g., in-memory or a database) associated with the user.
// __(4b) On the client side, either in a cookie or sessionStorage.

const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials: true })); // Update `origin` as needed

// Mock database
const users = [{ email: "user@example.com", password: "password123" }];
const sessionStore = {}; // In-memory store for session tokens

// Generate a unique session token
const generateSessionToken = () => crypto.randomBytes(16).toString("hex");

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create a session token
  const sessionToken = generateSessionToken();
  sessionStore[sessionToken] = { email, createdAt: new Date() };

  // Set the session token as a secure, HTTP-only cookie
  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use `true` in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.json({ message: "Login successful" });
});

// Middleware to validate session
const validateSession = (req, res, next) => {
  const sessionToken = req.cookies?.sessionToken;
  if (!sessionToken || !sessionStore[sessionToken]) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = sessionStore[sessionToken];
  next();
};

// Protected route
app.get("/protected", validateSession, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
