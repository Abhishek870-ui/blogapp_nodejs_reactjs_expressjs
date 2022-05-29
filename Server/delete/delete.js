//imports modules
const express = require('express')
let mongodb = require('mongodb')
let jwt = require("jwt-simple")
var async = require('async');
const moment = require('moment')
const fs = require('fs')
//create mongo client
let mcl = mongodb.MongoClient

//create router instance
var router = express.Router()

//import url
let url = require("../url")

//import token
let token = require("../token/token")
//create rest api



router.post("/imagedelete", (req, res) => {
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
                    if (array.length != 0) {

                        db.collection("users").updateOne({ '_id': array._id }, { $set: { image: "" } }, (err, result) => {
                            if (err) {
                                res.send({ "update": "error", "error": err })

                            }
                            else {
                                res.send({"delete" : "success", "imagedelete" : array})
                                console.log(array,"result");


                            }
                        })

                    }
                    else {
                        res.send({ 'delete': 'failed', "error": err })
                    }
                   
                   
                }
            })
        }
    })

})


router.post("/deleteblog", async (req, res) => {
    let id = req.body.id;
      mcl.connect(url, (err, conn) => {
        if (err) throw err;
        else {
            let db = conn.db("blog")
            
            db.collection("blogs").findOne({"_id" : mongodb.ObjectId({id})}, (err, array) => {
                
                if (err) {
                    throw err
                }
                else {
                    if (array.length != 0) {
                        console.log(array,"array");
                        if(array.blogimage){
                            let str = (array.blogimage).replace('../','')
                            console.log(str)
                                fs.unlinkSync(`../blog/public/${str}`);
                        }

                        if(array.blogaudio){
                            let str = (array.blogaudio).replace('../','')
                            console.log(str)
                                fs.unlinkSync(`../blog/public/${str}`);
                        }

                        if(array.blogvideo){
                            let str = (array.blogvideo).replace('../','')
                            console.log(str)
                                fs.unlinkSync(`../blog/public/${str}`);
                        }
                        
                        db.collection("blogs").deleteOne({"_id" : mongodb.ObjectId({id})}, (err, result) => {
                            if (err) {
                                res.send({ "delete": "error", "error": err })

                            }
                            else {
                                res.send({"delete" : "success", "blogdelete" : result})
                                console.log(result,"result");


                            }
                        })

                    }
                    else {
                        res.send({ 'delete': 'failed', "error": err })
                    }
                   
                   
                }
            })
        }
    })
})

//export router
module.exports = router