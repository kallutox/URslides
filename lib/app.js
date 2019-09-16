/* eslint-env node */
import DBManager from "../lib/utility/DBManager.js";
import ServerConst from "../lib/utility/ServerConst.js";

var express = require("express"),
    app = express(),
    dbm = new DBManager();

app.use(express.static("app/resources"));
app.use(express.static("node_modules/pdfjs-dist"));
app.set("view engine", "ejs");
app.set("views", "app/views");

//serve the home page on the main route
app.get("/", function(req, res) {
    res.render("index");
});

//serve the reader page on /reader for debugging
app.get("/reader", function(req, res) {
    res.render("reader");
});

//serve the search page on /search for debugging
app.get("/search", function(req, res) {
    res.render("search");
});

app.listen(ServerConst.port, function(){
    console.log("Serving homepage on http://localhost:" + ServerConst.port + "/");
});