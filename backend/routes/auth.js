const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");


const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser")

// JWT Secret Key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// ROUTE 1: create a user using : Post "/api/auth/createuser"  login not require
router.post(
  "/createuser",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
      body("name", "Name must be valid (only letters and spaces)").custom(value => /^[A-Za-z\s]+$/.test(value)),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 6 character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // ❌ If validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  return res.status(400).json({ success: false, error: errors.array() });
    }
    try {
      // Create new user
      const { name, email, password } = req.body;
      // check whether email is registered or not
      const existingUser = await User.findOne({ email });
      if (existingUser) {
  return res.status(400).json({ success: false, error: "⚠️ Email already registered" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(password, salt);
      // If new user register save and send data in database
      const user = new User({ name, email, password: securedPass });
      await user.save();
      // JWT Secret Key
      const data = {
        user: {
          id: user.id,
        },
      };
      // Create JWT token
      const authToken = jwt.sign(data, JWT_SECRET);

      // show message when new user created
      res.status(200).json({success:true, authToken: authToken, user });
    } catch (error) {
      console.error("Error creating user:", error.message);
res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// ROUTE 2: Authenticate a user using: Post "api/auth/login/" login not require
router.post("/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // ❌ If validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // fetch user from database
      const user = await User.findOne({ email });
    //   if email not match in database
      if (!user) {
        return res.status(400).json({ error: "⚠️ Please try to login with correct credentials" });
      }
      // Compare password with database password
      const passwordCompare = await bcrypt.compare(password, user.password);
    //   when password not match in database
      if (!passwordCompare) {
        return res.status(400).json({ error: "⚠️ Please try to login with correct credentials" });
      }
 // JWT Secret Key
      const data = {
        user: {
          id: user.id,
        },
      };
      // Create JWT token
      const authToken = jwt.sign(data, JWT_SECRET);
        // show message when user login
      res.status(200).json({ authToken: authToken, user });
    } catch (error) {
         console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3: Authenticate a user detail when loggedIn using: Post "api/auth/getuser/" Login required

router.post("/getuser",fetchUser, async (req, res) => {
    
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
res.status(200).send(user)
    } catch (error) {
         console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
})

// ROUTE 4: Authenticate a user detail when click forget password link: Post "api/auth/forgetpassword/" Login not required
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
return res.status(400).json({ success: false, error: 'No account with this email' });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetToken = hashedToken;
user.resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000); // Date object
    await user.save();


    const resetLink = `${process.env.BASE_URL}/resetpassword/${resetToken}`;

    await sendEmail(user.email, "Password Reset Link", `Reset your password using this link: ${resetLink}`);

res.json({ success: true, message: "Reset link sent to your email", resetLink });
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});


//  ROUTE 5: send a reset after authentication link using : POST /api/auth/resetpassword/:token   Login not required
router.post("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

const user = await User.findOne({
  resetToken: hashedToken,
  resetTokenExpire: { $gt: new Date() }
});
console.log("User found:", user);

    if (!user) {

      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
