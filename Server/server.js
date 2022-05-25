//import express body-parser and cors modules
var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
const path = require('path');
//create rest object
var app = express()

//set JSON as MIME type
app.use(bodyparser.json())

//client not sending from data -> encoding to JSON
app.use(bodyparser.urlencoded({extended : false}))
// app.use(express.static(__dirname + '../blog/public')); //__dir and not _dir
//enable CORS -> Cross Origin Resourse Sharing
app.use(cors())
let port = process.env.PORT || 8080
//import fetch insert update delete modules
var fetch = require("./fetch/fetch")
var insert = require("./insert/insert")
var update = require("./update/update")
var remove = require("./delete/delete")

//use above module
app.use("/fetch",fetch)
app.use("/insert",insert)
app.use("/update",update)
app.use("/delete",remove)

//assign port no
app.listen(port,()=>{
    console.log("Server listening port no"+port)

})
