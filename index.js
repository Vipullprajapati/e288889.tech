console.clear();
const express = require("express");
require("dotenv").config(); // Allowing read from .env file

const PORT = process.env.PORT || 3000; // Getting port number from .env

const app = express();
app.set("view engine", "ejs"); // Setting ejs as our template engine

// MARK: Middlewares
app.use(express.static("public")); // Using public as our static
app.use(express.urlencoded({ extended: false })); // Parse form data

app.use(function (req, res, next) {
  res.locals.errors = []; // Setting empty errors for all templates

  next();
});

// MARK: Routes
app.get("/", (req, res) => {
  res.render("homepage");
});

// User Registration Starts
app.post("/register", (req, res) => {
  let { username, password } = req.body;
  const errors = [];

  username = username.trim();

  if (typeof username !== "string") username = "";
  if (typeof password !== "string") password = "";

  // Username Validation
  if (!username) {
    errors.push("Username is required");
  }
  if (username && username.length < 4) {
    errors.push("Username must contain atleast 4 characters");
  }
  if (username && username.length > 12) {
    errors.push("Username must not exceed 12 characters");
  }
  if (username && !username.match(/^[a-zA-Z0-9]+$/)) {
    errors.push("Username can't contain special characters");
  }

  // Password Validation
  if (!password) {
    errors.push("Password is required");
  }
  if (password && password.length < 6) {
    errors.push("Password must contain atleast 6 characters");
  }
  if (password && password.length > 20) {
    errors.push("Password must not exceed 20 characters");
  }

  if (errors.length) {
    return res.render("homepage", { errors });
  }

  return res.send(`Thank you for registration ${username}`);
});
// User Registration Ends

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.send("Thanks, you're now logged in!");
});

app.listen(PORT, () => {
  console.log(`Server fired up 🔥 on PORT: ${PORT}`);
});
