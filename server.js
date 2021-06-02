const express = require("express");
const bodyParser = require("body-parser");
//var path = require("path");
const routes = require("./routes.js");
const cors = require('cors')
const port = process.env.PORT || 8001;

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

routes(app);

const server = app.listen(port, function () {
    console.log("app running on port :", server.address().port);
});