/* eslint-env node */

var express = require("express"),
    app = express();

app.use(express.static("app/resources"));
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

app.listen(8701, function(){
    console.log("Serving homepage on http://localhost:8701/");
});