/**
 * routes/routeUser.js
 * user routes
 */

const fs = require("fs"),
    User = require("./../model/modelUser"),
    Post = require("./../model/modelPost"),
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
        const post = new Post({
            userId: req.body.user,
            description: req.body.description
        })
        post.save().then(post => {
            res.send({ error: false, message: "successfully created", post: post });
        }, err => {
            console.log(`something wrong at ${req.method}:${req.url} ${err}`);
            fs.appendFile(logPath, `\t${req.method}:${req.url} ${err}\n`);
            res.send("oops...!!!")
        })
    })

    /**
     * POST /user/post/comment/:post/:user
     */

    app.post("/user/post/comment", (req, res) => {
        const postComment = {
            commentFrom: req.body.user,
            commnetMessage: req.body.commentMessage
        }
        console.log("comment: ", postComment)
        Post.findOneAndUpdate({ _id: req.body.comment }, { $addToSet: { comment: postComment } }, { new: true }, (err, post) => {
            if (err) {
                console.log("post comment: ", err);
                res.send("something wrong")
            } else {
                res.send({ error: false, message: "success", post });
            }
        })
    })
}