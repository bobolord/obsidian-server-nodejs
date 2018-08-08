var Tokens = require('csrf')

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

exports.csrfMiddleware = myLogger;