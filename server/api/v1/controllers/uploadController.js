
const express = require('express');
const app = express();
const firebase = require('firebase');
const googleStorage = require('@google-cloud/storage');
const config = require('../../../config/config');
const User = require('../models/user');
const errorHandler = require('../utilities/errorHandler');

const storage = googleStorage({
  projectId: config.firebase.projectId,
  keyFilename: "./server/config/quickplay-1c2b7-firebase-adminsdk-fpwse-1ec74a95fa.json"
});

const bucket = storage.bucket(config.firebase.bucket);

/**
 * Adding new file to the storage
 */
exports.upload_image = function(req, res, next) {
    if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
    }
    
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);

    // Make sure to set the contentType metadata for the browser to be able
    // to render the image instead of downloading the file (default behavior)
    const blobStream = blob.createWriteStream({
    metadata: {
        contentType: req.file.mimetype
    }
    });

    blobStream.on("error", err => {
    next(err);
    return;
    });

    blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    
    //Update avatar URL from current user.
    const id = req.user.id;
    User.findByIdAndUpdate(id, {
        avatar: publicUrl
      }, {new: true})
        .then(user => {
          if(!user) {
            return errorHandler.handleAPIError(404, `User not logged in!`, next);
          }
          console.log(user);
        }).catch(err => {
          console.log(err);
        });

    // Make the image public to the web (since we'll be displaying it in browser)
    blob.makePublic().then(() => {
        res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
    });
    });

    blobStream.end(req.file.buffer);
};