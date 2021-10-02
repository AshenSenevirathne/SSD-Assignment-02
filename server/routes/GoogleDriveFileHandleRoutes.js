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

// Router to delete google drive file
router.delete("/delete/:id", async (req, res) => {
  const drive = google.drive({
    version: "v3",
    auth: oAuth2Client
  });

  try {
    const response = await drive.files.delete({
      fileId: req.params.id
    });
    console.log(response.data, response.status);
    res.send();
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
