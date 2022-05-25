//imports modules
const express = require('express')
let mongodb = require('mongodb')
let jwt = require("jwt-simple")


//create mongo client
let mcl = mongodb.MongoClient

//create router instance
var router = express.Router()

//import url
let url = require("../url")

//import token
let token = require("../token/token")
//create rest api

//fetch all users
router.get("/usercollection", (req, res) => {
    

    //compare with database
    mcl.connect(url, (err, conn) => {
        if (err) throw err;
        else {
            let db = conn.db("blog")
            
            db.collection("users").find({}).toArray((err, array) => {
                
                if (err) {
                    throw err
                }
                else {
                    res.send({"fetch" : "success", "usercollection" : array})
                   
                }
            })
        }
    })

})


router.post("/imagecollection", (req, res) => {
    let decoded = jwt.decode(req.body.token, '12345');
    

    //compare with database
    mcl.connect(url, (err, conn) => {
        if (err) throw err;
        else {
            let db = conn.db("blog")
            
            db.collection("users").findOne(decoded, (err, array) => {
                
                if (err) {
                    throw err
                }
                else {
                    res.send({"fetch" : "success", "imagecollection" : array})
                   
                }
            })
        }
    })

})

//export router
module.exports = router