const express = require("express");
const cors = require("cors");
const fs = require('fs')
const logger = require('morgan');
const path = require('path')
const apiEndpoint = require('./server/routes');
const config = require('./server/config/config');

const app = express();

var corsOptions = {
    origin: "http://localhost:4001"
};

if (config.env === 'development') {
    app.use(logger('dev'));
}

app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))


app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true, parameterLimit: 5000 }));

app.get("/", (req, res) => {
    res.json({ message: "Wellcome Api :)" });
});

app.use(apiEndpoint(express));

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}.`);
});

module.exports = app;