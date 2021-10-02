const { google } = require("googleapis");
const oAuth2Client = require("./oAuth2Client");

async function getDriveFileList() {
    let driveFileList = [];
    drive = google.drive({ version: 'v3', auth: oAuth2Client });
    driveFileList = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });

    return driveFileList;
}

module.exports = getDriveFileList;
