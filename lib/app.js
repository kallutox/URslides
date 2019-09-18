/* eslint-env node */
//these imports will only work if you use the esm package with server start

import DBManager from "../lib/utility/DBManager.js";
import ServerConst from "../lib/utility/ServerConst.js";

var express = require("express"),
    bodyParser = require("body-parser"),
    formidable = require("formidable"),
    fs = require("fs"),
    app = express(),
    dbm = new DBManager();

app.use(express.static("app/resources"));
app.use(express.static("node_modules/pdfjs-dist"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", "app/views");

//serve the home page on the main route
app.get("/", function (req, res) {
    res.render("index");
});

//serve the reader page on /reader for debugging
app.get("/reader", function (req, res) {
    res.render("reader");
});

//serve the search page on /search for debugging
app.get("/search", function (req, res) {
    res.render("search");
});

app.post("/upload", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('file', function (name, file) {
        var oldPath = file.path,
            newPath = "app/resources/pdfs/" + file.name,
            sendPath = "/pdfs/" + file.name;

        console.log(sendPath);
        //save uploaded file to resources/pdfs and render reader page, also send the filepath with the response
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                throw err;
            } else {
                console.log(sendPath);
                res.render("reader" , {
                    path: sendPath,
                    name: file.name,
                    edit: true,
                });
            }
        });
    });

    app.post("/save", function(req, res) {
        var newSlides = JSON.parse(req.body.json);
        dbm.insert(newSlides);
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });
});

app.listen(ServerConst.port, function () {
    console.log("Serving homepage on http://localhost:" + ServerConst.port + "/");
});