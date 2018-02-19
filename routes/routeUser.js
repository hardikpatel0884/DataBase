/**
 * routes/routeUser.js
 * user routes
 */

const fs = require("fs"),
    User = require("./../model/modelUser"),
    logPath = './log/server.log';

module.exports = (app) => {

    /**
     * POST /user
     */
    app.post("/user", (req, res) => {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        user.save().then(user => {
            res.send({ error: false, message: "successfully created", user: user });
        }, err => {
            console.log(`something wrong at ${req.method}:${req.url} ${err}`);
            fs.appendFile(logPath, `\t${req.method}:${req.url} ${err}\n`);
            res.send("oops...!!!")
        })
    });

    /**
     * POST /user/post
     */
    app.post("/user/post", (req, res) => {
        const post = {
            description: req.body.post
        }
        User.findOneAndUpdate({ _id: req.body.user }, { $addToSet: { post: post } }, { new: true }, (err, post) => {
            if (err) {
                fs.appendFile(logPath, `\t onPostUpdate ${req.method}:${req.url} ${err}`);
                res.send("fail: ", err);
            }
            res.send(post);
        })
    })
}