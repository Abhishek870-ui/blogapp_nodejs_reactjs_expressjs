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

//export router
module.exports = router