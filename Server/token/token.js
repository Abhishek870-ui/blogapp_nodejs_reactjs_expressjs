//import jwt-simple module
let jwt = require("jwt-simple")
module.exports = function(obj, password) {
    return jwt.encode(obj, password)
}