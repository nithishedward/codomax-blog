const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "devblog_secret_key";

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Temporary In-Memory Storage
// ===============================

const users = [];
const blogs = [];

// ===============================
// Helper: Create JWT Token
// ===============================

function createToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

// ===============================
// Middleware: Verify JWT
// ===============================

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is required.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
}

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "DevBlog Backend API is running successfully!",
  });
});

// ===============================
// Register API
// ===============================

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // Create token
    const token = createToken(newUser);

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error during registration.",
    });
  }
});

// ===============================
// Login API
// ===============================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = users.find(
      (user) => user.email === normalizedEmail
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Create token
    const token = createToken(user);

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login.",
    });
  }
});

// ===============================
// Create Blog API
// ===============================

app.post("/api/blogs", authenticateToken, (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Validate input
    if (!title || !content || !category) {
      return res.status(400).json({
        message: "Title, content and category are required.",
      });
    }

    // Create blog
    const newBlog = {
      id: blogs.length + 1,
      title: title.trim(),
      content: content.trim(),
      category: category.trim(),
      authorId: req.user.userId,
      createdAt: new Date().toISOString(),
    };

    blogs.push(newBlog);

    res.status(201).json({
      message: "Blog created successfully.",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    res.status(500).json({
      message: "Server error while creating blog.",
    });
  }
});

// ===============================
// Get All Blogs API
// ===============================

app.get("/api/blogs", (req, res) => {
  res.json({
    message: "Blogs retrieved successfully.",
    count: blogs.length,
    blogs,
  });
});

// ===============================
// Get Single Blog API
// ===============================

app.get("/api/blogs/:id", (req, res) => {
  const blogId = Number(req.params.id);

  const blog = blogs.find((blog) => blog.id === blogId);

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found.",
    });
  }

  res.json({
    message: "Blog retrieved successfully.",
    blog,
  });
});

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found.",
  });
});

// ===============================
// Global Error Handler
// ===============================

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    message: "Internal server error.",
  });
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DevBlog backend running on port ${PORT}`);
});