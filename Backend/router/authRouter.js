const express = require("express");
const userCreateController = require("../controller/userCreateController");
const userAuthController = require("../controller/userAuthController");
const userUpdateController = require("../controller/userUpdateController");
const router = express.Router();

router.post("/register", userCreateController);

router.patch("/profile/:id", userUpdateController);

router.post("/login", userAuthController);

module.exports = router; 