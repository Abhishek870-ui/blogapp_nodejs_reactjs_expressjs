//import modules
const express = require('express')
let mongodb = require('mongodb')
let multer = require("multer");
let jwt = require("jwt-simple")
var async = require('async');
const moment = require('moment')
//create mongo client
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//import url
let url = require("../url")

// upload image in specfic folder
// let storage = multer.diskStorage({
//     destination: function (req, image, cb) {
//         cb(null, '../blogapp/public/uploads')
//     },
//     filename: function (req, image, cb) {
//         cb(null, image.fieldname + '-' + Date.now() + '.jpg')
//     }
// })
// let upload = multer({ storage: storage })


//create rest api


// insert user details
router.post("/registerUser", (req, res) => {
    console.log(req.body);
    let obj = req.body;
    let fname = obj.fname;
    let lname = obj.lname;
    let email = obj.email;
    let phone = obj.phone;
    let password = obj.password;
    let username = obj.username;
    
    let userdata = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "phone": phone,
        "password": password,
        "username": username,
        "created_at": moment().format(),
        "updated_at":moment().format()

    }
    console.log(userdata);
    mcl.connect(url, (err, conn) => {
        if (err) {
            throw err;
        }
        else {
            let db = conn.db("blog")
            db.collection("users").insertOne(userdata, (err) => {
                if (err) {
                    throw err;
                }
                else {

                    
                    res.send({ "insert": "success","data":userdata })
                }
            })
        }
    })

})






//export router
module.exports = router