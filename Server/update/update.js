//imports modules
const express = require('express')
let mongodb = require('mongodb')


//create mongo client
let mcl = mongodb.MongoClient

//create router instance
var router = express.Router()

//import url
let url = require("../url")

//import token
let token = require("../token/token")

//create rest api

//create rest api

//login api
router.post("/authuser", (req, res) => {
    let user = {
        username : req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    console.log(user);
   

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
                        console.log(array._id);
                        let myToken = token(user, ({ id: array._id }, '12345'))

                        db.collection("users").updateOne({ '_id': array._id }, { $set: { token: myToken } }, (err, result) => {
                            if (err) {
                                res.send({ "update": "error","error":err })

                            }
                            else {
                                res.send({ 'auth': 'success', 'token': myToken, 'userDetailswithtoken' : result,"logindata" : array })


                            }
                        })

                    }
                    else {
                        res.send({ 'auth': 'failed',"error" : err })
                    }
                }
            })
        }
    })

})

//export router
module.exports = router