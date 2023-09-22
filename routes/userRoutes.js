const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userController")

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser)

router
  .route("/:id")
  .get(userControllers.getUserById)
  .patch(userControllers.editUser)
  .delete(userControllers.removeUser)

module.exports = router
