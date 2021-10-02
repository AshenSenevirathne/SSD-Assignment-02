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

// Router to upload files to drive
router.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      throw err
    } else {
      console.log(req.file.path);
      const drive = google.drive({
        version: "v3",
        auth: oAuth2Client
      });

      const fileMetadata = {
        name: req.file.filename,
      };

      const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(req.file.path),
      };

      drive.files.create(
        {
          resource: fileMetadata,
          media: media,
          fields: "id",
        }, (err, file) => {
          if (err) {
            console.error(err);
          } else {
            fs.unlinkSync(req.file.path)
            res.redirect("/");
          }
        }
      );
    }
  });
});

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
