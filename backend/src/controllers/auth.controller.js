const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blackList.model");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @route POST api/auth/register
 * @description Register a new user, expects username, email and password
 * @access Public
 */
async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password",
      });
    }

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "Account already exists with this email address",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed." });
  }
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed." });
  }
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlackListModel.create({ token });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "user logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed." });
  }
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access Private
 */
async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Failed to fetch user details." });
  }
}

/**
 * @name googleLoginController
 * @description login a user with google account
 * @access Public
 */
async function googleAuthController(req, res) {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Google ID Token is required." });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.trim() : null;
    if (!clientId) {
      console.error("GOOGLE_CLIENT_ID is not set in backend .env");
      return res.status(500).json({ message: "Server misconfiguration: GOOGLE_CLIENT_ID is missing." });
    }

    const client = new OAuth2Client(clientId);

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // 2. Find existing user by googleId or email
    let user = await userModel.findOne({
      $or: [{ googleId }, { email }],
    });

    if (!user) {
      // Create user with their exact clean name from Google (no extra numbers or hyphens)
      const displayName = name || email.split("@")[0];

      user = await userModel.create({
        username: displayName,
        email,
        avatar: picture || "",
        googleId,
      });
    } else {
      // User already exists! Link Google ID & avatar if not already set
      let needsSave = false;
      if (!user.googleId) {
        user.googleId = googleId;
        needsSave = true;
      }
      if (picture && !user.avatar) {
        user.avatar = picture;
        needsSave = true;
      }
      if (needsSave) {
        await user.save();
      }
    }

    // 3. Issue app JWT cookie and log in to dashboard
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Google login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google Auth error:", error.message || error);
    res.status(401).json({ message: error.message || "Google verification failed." });
  }
}


module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
  googleAuthController
};
