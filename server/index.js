const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection      
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Tisha123",
  database: process.env.DB_NAME || "auth_db"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Connected to MySQL");
    
    // Create users table safely if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;
    db.query(createTableQuery, (tableErr) => {
      if (tableErr) console.error("Error checking/creating table:", tableErr);
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend running...");
});

// 1. Signup Route
app.post("/signup", (req, res) => {
  console.log("Signup route hit");
  console.log("Request body:", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const checkUser = "SELECT * FROM users WHERE email = ?";

  db.query(checkUser, [email], async (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ success: false, message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUser = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(insertUser, [name, email, hashedPassword], (insertErr, insertResult) => {
        if (insertErr) {
          console.log("Insert error:", insertErr);
          return res.json({ success: false, message: "Signup failed" });
        }

        return res.json({ success: true, message: "Account created successfully" });
      });
    } catch (hashError) {
      console.log("Hashing error:", hashError);
      return res.json({ success: false, message: "Server error during signup" });
    }
  });
});

// 2. Login Route
app.post("/login", (req, res) => {
  console.log("Login route hit");
  console.log("Request body:", req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }

      return res.json({ success: true, message: "Login successful" });
    } catch (compareError) {
      console.log("Compare error:", compareError);
      return res.json({ success: false, message: "Server error during login" });
    }
  });
});

// 3. Forgot Password Route
app.post("/forgot-password", (req, res) => {
  console.log("Forgot Password route hit");
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  const checkEmail = "SELECT * FROM users WHERE email = ?";

  db.query(checkEmail, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, message: "Password reset link sent" });
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});