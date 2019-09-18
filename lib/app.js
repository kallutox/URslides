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

app.get("/reader/:id", function (req, res) {
    dbm.getSlideByID(req.params.id).then(function(slide) {
        //need to pass data with a container commentLit because otherwise stringify doesn't work
        let commentLit = {comments: slide[0].comments};
        
        res.render("reader", {
            path: slide[0].pdfPath,
            name: slide[0].name,
            comments: JSON.stringify(commentLit),
            edit: false,
        });
    }).catch(function(err) {
        res.send(err);
    });
});

//serve the search page on /search for debugging
app.get("/search", function (req, res) {
    dbm.getAllSlides().then(function(slides) {
        res.render("search", {slides: slides});
    }).catch(function(error) {
        res.send(error);
    });
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
                    comments: "",
                    edit: true,
                });
            }
        });
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });
});

app.post("/save", function(req, res) {
    var newSlides = JSON.parse(req.body.json);
    dbm.insert(newSlides);
});

app.listen(ServerConst.port, function () {
    console.log("Serving homepage on http://localhost:" + ServerConst.port + "/");
});