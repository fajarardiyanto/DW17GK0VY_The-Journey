const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const { authenticated } = require("../middleware/auth");

// User
const {
  register,
  login,
  updateUser,
  getUserById,
} = require("../controllers/User");

// Trip
const {
  createTrip,
  getTrips,
  getTripById,
  getTripByTitle,
} = require("../controllers/Trip");

// Bookmark
const {
  showBookmark,
  userBookmark,
  createBookmark,
  removeBookmark,
} = require("../controllers/Bookmark");

// User Route
router.post("/register", register);
router.post("/login", login);
router.patch("/user/:id", fileUpload(), updateUser);
router.get("/user/:id", getUserById);

// Trip Route
router.get("/trips", getTrips);
router.get("/trip/:id", getTripById);
router.get("/search/:title", getTripByTitle);
router.post("/trip", createTrip);

// Bookmark Route
router.get("/bookmark", showBookmark);
router.post("/bookmark", createBookmark);
router.get("/bookmark/user/:bmUserId", userBookmark);
router.delete("/bookmark/:id", removeBookmark);

module.exports = router;
