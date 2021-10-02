const router = require("express").Router();
const { google } = require("googleapis");
const oAuth2Client = require("../services/oAuth2Client");

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

// Route for Google callback
router.get("/authentication/google-callback", function (req, res) {
    const code = req.query.code;
    if (code) {
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log("Error", err);
            } else {
                oAuth2Client.setCredentials(tokens);
                authorizedUser = true;
                res.redirect("/");
            }
        });
    }
});

module.exports = router;