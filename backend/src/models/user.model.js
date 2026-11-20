const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Account already exist with this email address"],
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("users", userSchema);

// Drop legacy unique index on username if it exists in the database
userModel.collection.dropIndex("username_1").catch(() => {});

module.exports = userModel;
