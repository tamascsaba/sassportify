var path = require("path");
var fs = require("fs");
var tools = require("browserify-transform-tools");

var sassportify = require('../lib/');
var sample = path.resolve(__dirname, "sample.js");

var content = fs.readFileSync(path.resolve(__dirname, "sample.scss"), "utf8");

tools.runTransform(sassportify, sample, {content: content},
    function(err, transformed) {
        console.log(transformed);
    }
);