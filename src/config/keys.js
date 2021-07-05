// ternary operation for indicating whether to use (or not) production keys
process.env.NODE_ENV === 'production' 
? 
    module.exports = require('./prod') // retrieve production keys
:
    module.exports = require('./dev') // use development keys  