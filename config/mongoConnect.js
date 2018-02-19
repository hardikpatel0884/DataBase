/**
 * config/mongoConnect.js
 * mongodb connetion file
 */

const mongoose = require("mongoose"),
    fs = require("fs"),
    config = require("./config");

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url, (err) => {
    fs.appendFile("./log/server.log", `onConnect mongoose /config/mongoConnect.js : ${err}\n`)
    console.log(err);
});

module.exports = { mongoose };