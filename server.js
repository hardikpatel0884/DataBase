/**
 * /server.js
 * main file
 */

const express = require("express"),
    config = require("./config/config"),
    { mongoose } = require("./config/mongoConnect"),
    bodyParser = require("body-parser"),
    fs = require("fs"),
    app = express();

app.use(bodyParser());

app.use((req, res, next) => {
    let log = `${new Date()} : ${req.method} ${req.baseUrl} ${req.url}\n`
    fs.appendFile('./log/server.log', log);
    next()
});

require("./routes/routeUser")(app);

app.get("/testing", (req, res) => {
    let errLog = `\tthis is example of error writing in server log\n`;
    fs.appendFile('./log/server.log', errLog);
    res.send("wow its word");
})



app.listen(config.port, () => {
    console.log(`megic start on port ${config.port}`)
})