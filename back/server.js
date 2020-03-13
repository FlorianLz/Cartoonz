const express = require("express");
const router = require('./router');

const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const app = express();

const connectionRouter = require('./connectionRouter').router;

const port = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/pictures'));
app.get('./public/pictures/*', (req, res) => {
    res.sendFile(req.url, {root: './'})
});
app.get('./public/pictures/videoc', (req, res) => {
    res.sendFile(req.url, {root: './'})
});
app.use(connectionRouter);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));
app.use(router); // Requests processing will be defined in the file router
app.listen(port, () => console.log('Server app listening on port ' + port));
