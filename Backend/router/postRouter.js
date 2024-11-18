const express = require("express");
const createController = require("../controller/createController");
const fetchController = require("../controller/fetchController");
const deleteController = require("../controller/deleteController");
const updateController = require("../controller/updateController");

const router = express.Router();

router.post("/create/post", createController);

router.get("/fetch/post", fetchController);

router.get("/fetch/post/:id", fetchController);

router.put("/update/post/:id",updateController);

router.delete("/delete/post/:id",deleteController);

module.exports = router;
