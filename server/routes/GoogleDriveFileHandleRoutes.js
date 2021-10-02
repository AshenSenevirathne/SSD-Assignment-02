const router = require("express").Router();
const { google } = require("googleapis");
const multer = require("multer");
const fs = require("fs");
const oAuth2Client = require("../services/oAuth2Client");

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("file");

module.exports = router;
