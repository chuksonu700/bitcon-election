if (process.env.NODE_ENV === "production") {
    // statement
    module.exports = require('./prod');
} else {
    // statement
    module.exports = require('./dev');
}

// remember to create a development and production database and event their different client like google oath for production and for development