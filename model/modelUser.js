/**
 * model/modelUser.js
 * user scheema with post
 */

const mongoose = require("mongoose"),
    validator = require("validator"),
    fs = require("fs"),
    logPath = "./../log/server.log",
    bcrypt = require("bcryptjs");

const scheemaUser = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: validator.isEmail
        }
    },
    password: {
        type: String,
        require: true
    },
    apiKey: {
        type: String
    }
});

scheemaUser.pre("save", function(next) {
    if (this.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                fs.appendFile(`onSave USER schema encrypt password : ${err}`)
                return next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                console.log(`encrypted password : ${hash}`);
                this.password = hash

                // genrate apikey
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        fs.appendFile(`onSave USER schema encrypt apiKey : ${err}`)
                        return next(err);
                    }
                    bcrypt.hash(Date.now().toString(), salt, (err, hash) => {
                        console.log(`dynamic rendome apiKey : ${hash}`);
                        this.apiKey = hash;
                        next();
                    })
                })
            })
        })
    }
});

module.exports = mongoose.model("User", scheemaUser);