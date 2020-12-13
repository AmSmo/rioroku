const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const fs = require("fs");
const dropboxV2Api = require("dropbox-v2-api");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.post('/', upload.any(), (req, res)=>{
    console.log(req.files)
    let {path} = req.files[0]
    console.log("lala",req.body)
    let {folder, user} = req.body
    console.log("f", folder, "u", user, "p", path)
    const dropbox = dropboxV2Api.authenticate({
        token: keys.dropBoxToken
    });
    const params = Object.freeze({
        resource: 'files/upload',
        parameters: {
            path: `/${folder}/${user}.jpg`
        },
        readStream: fs.createReadStream(path)
    });
    
    let  dropboxPromise = new Promise(function (resolve, reject) {
        dropbox(params, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    dropboxPromise.then(function (resultObj) {
        console.log("fileUpload_OK")
    }).catch(function (err) {
        console.log(err)
    });

    return res.json({woo: "hoo"})
})

module.exports = router;