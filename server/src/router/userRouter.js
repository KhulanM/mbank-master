const express = require("express");
const csrf = require("csurf");
const {
  getUsers,
  getUser,
  Login,
  createUser,
  token,
  updateUser,
  deleteUser,
  getProfile,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controller/userController");
// const csrfProtection = csrf({ cookie: true });
// const { createUser, Login } = require("../controller/userController");

const userRouter = express.Router();

userRouter
  .get("/", getUsers)
  .get("/:id", getUser)
  .get("/token/:id", token)
  .get("/profile", authMiddleware, userController.getProfile)
  .post("/create", createUser)
  .post("/login", Login)
  .put("/update/:id", updateUser)
  .delete("/delete/:id", deleteUser)
  .post("/signin", Login)
  .post("/signup", createUser);
module.exports = userRouter;
