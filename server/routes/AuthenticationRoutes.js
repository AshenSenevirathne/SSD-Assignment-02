const router = require("express").Router();
const { google } = require("googleapis");
const oAuth2Client = require("../services/oAuth2Client");
const getDriveFileList = require("../services/driveFileList");

let authorizedUser = false;

// Route to Sign In
router.get("/", (req, res) => {
    if (authorizedUser) {
        var oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: "v2",
        });
        oauth2.userinfo.get(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                res.render("dashboard", {
                    userName: response.data.name,
                    imageURL: response.data.picture,
                    files: [],
                    success: false
                });
            }
        });
    } else {
        var url = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: process.env.SCOPES,
        });
        res.render("index", { url: url });
    }
});

module.exports = router;