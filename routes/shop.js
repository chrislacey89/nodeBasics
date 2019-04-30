const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  //dirname holds aboslute path on our OS to this project folder
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
