/**
 * /config/confing.js
 * basic configuration file
 * contails port database connectivity
 */

module.exports = {
    port: process.env.PORT || 3000,
    mysql: {
        host: "localhost",
        user: "root",
        password: "",
        dbName: "nodeDemo"
    },
    mongodb: {
        url: "mongodb://localhost:27017/nodeDemo"
    }
}