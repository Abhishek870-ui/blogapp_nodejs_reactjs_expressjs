//imports modules
const express = require('express')
let mongodb = require('mongodb')
let multer = require("multer");
let jwt = require("jwt-simple")
const fs = require('fs')
var async = require('async');


//create mongo client
let mcl = mongodb.MongoClient

//create router instance
var router = express.Router()

//import url
let url = require("../url")

//import token
let token = require("../token/token")

// upload image in specfic folder
let storage = multer.diskStorage({
    destination: function (req, image, cb) {
        cb(null, '../blog/public/uploads')
    },
    filename: function (req, image, cb) {
        cb(null, image.fieldname + '-' + Date.now() + '.jpg')
    }
})
let upload = multer({ storage: storage })

//create rest api

//create rest api

//login api
router.post("/authuser", (req, res) => {
    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }


    //compare with database
    mcl.connect(url, (err, conn) => {
        if (err) throw err;
        else {
            let db = conn.db("blog")
            db.collection("users").findOne(user, (err, array) => {
                if (err) {
                    throw err
                }
                else {
                    if (array.length != 0) {
                        let myToken = token(user, ({ id: array._id }, '12345'))

                        db.collection("users").updateOne({ '_id': array._id }, { $set: { token: myToken } }, (err, result) => {
                            if (err) {
                                res.send({ "update": "error", "error": err })

                            }
                            else {
                                res.send({ 'auth': 'success', 'token': myToken, 'userDetailswithtoken': result, "logindata": array })


                            }
                        })

                    }
                    else {
                        res.send({ 'auth': 'failed', "error": err })
                    }
                }
            })
        }
    })

})


router.post("/imageupdated", upload.single('image'),async (req, res) => {
    let imagerequest = {
        username: req.body.username,
        token: req.body.token

    }
    let decoded = jwt.decode(req.body.token, '12345');
    console.log(decoded,"decoded");
    let imagefile = req.body.image

    mcl.connect(url, (err, conn) => {
        if (err) throw err;
        else {
            let db = conn.db("blog")
            db.collection("users").findOne(decoded, (err, array) => {
                if (err) throw err
                else {
                    if (array.length != 0) {
                        console.log(array,"array");
                        if(array.image === "" || array.image === null || array.image === undefined)
                        {
                        let image = '../uploads' + '/' + req.file.filename;
                        db.collection("users").updateOne({"_id" : array._id}, { $set: { image: image } }, (err, result) => {
                            if (err) {
                                res.send({ "update": "error", "error": err })

                            }
                            else {
                                res.send({ 'auth': 'success', 'image': image, "imagedata": array })


                            }
                        })
                    }
                    else{
                        console.log(array.image,"array.image");
            let str = (array.image).replace('../','')
            fs.unlinkSync(`../blog/public/${str}`);
            let image = '../uploads' + '/' + req.file.filename;

            db.collection("users").updateOne(decoded, { $set: { image: image } }, (err, result) => {
                if (err) {
                    res.send({ "update": "error", "error": err })

                }
                else {
                    res.send({ 'auth': 'success', 'image': image, "imagedata": array })


                }
            })


                    }
                    }
                }
            })
        }
    })
})

//export router
module.exports = router