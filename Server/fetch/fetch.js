//imports modules
const express = require('express')
let mongodb = require('mongodb')


//create mongo client
let mcl = mongodb.MongoClient

//create router instance
var router = express.Router()

//import url
let url = require("../url")


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

//export router
module.exports = router