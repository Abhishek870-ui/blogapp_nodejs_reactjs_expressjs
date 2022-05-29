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
var path = require('path')
// upload image in specfic folder
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../blog/public/blogfiles')
    },
    filename: function (req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({ storage: storage })


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
        "updated_at": moment().format()

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


                    res.send({ "insert": "success", "data": userdata })
                }
            })
        }
    })

})


router.post("/blogadd", upload.fields([{
    name: 'blogimage',
    maxCount: 1
},
{
    name: 'blogaudio',
    maxCount: 1
},
// {
//     name: 'blogvideo',
//     maxCount: 1

// }
]), (req, res) => {
    console.log(req.body, "reqfrom frontend");
    console.log(req.file, "reqfrom frontend");

    let blogtitle = req.body.blogtitle
    let blogdescription = req.body.blogdescription
    let blogimage = '';
    if (req.files.blogimage) {
        blogimage = '../blogfiles' + '/' + req.files.blogimage[0].filename;

    }
    let blogaudio = '';
    if (req.files.blogaudio) {
        blogaudio = '../blogfiles' + '/' + req.files.blogaudio[0].filename;

    }
    // let blogvideo = '';
    // if (req.files.blogvideo) {
    //     blogvideo = '../blogfiles' + '/' + req.files.blogvideo[0].filename;

    // }

    let decoded = jwt.decode(req.body.token, '12345');
    mcl.connect(url, (err, conn) => {
        if (err) throw err;
        else {
            let db = conn.db("blog")

            db.collection("users").findOne(decoded, (err, array) => {

                if (err) {
                    throw err
                }
                else {
                    res.send({ "fetch": "success", "blogcollestionuser": array })
                    const blogdata = {
                        "userid": array._id,
                        "fname": array.fname,
                        "lname": array.lname,
                        "email": array.email,
                        "username": array.username,
                        "blogtitle": blogtitle,
                        "blogdescription": blogdescription,
                        "blogimage": blogimage,
                        // "blogvideo": blogvideo,
                        "blogaudio": blogaudio,
                        "created_at": moment().format(),
                        "updated_at": moment().format()

                    }
                    console.log(blogdata, "blogdata");
                    db.collection("blogs").insertOne(blogdata, (err) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            res.send({ "insert": "success", "blogdata": blogdata })
                        }
                    })


                }
            })
        }
    })

})






//export router
module.exports = router