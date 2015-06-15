var cheerio = require("./node_modules/cheerio/lib/cheerio.js");
var express = require("express");
var fs = require("fs");
var request = require("request");
var app = express();
var http = require('http');

app.use(express.static(__dirname + '/public'));

var reactViews = require('express-react-views');


app.get('/', function(req, res){
            url = 'https://www.pinterest.com/mrdanemark/hot-fitness-girls/';

        // The structure of our request call
        // The first parameter is our URL
        // The callback function takes 3 parameters, an error, response status code and the html

        request(url, function(error, response, html){

            // First we'll check to make sure no errors occurred when making the request

            if(!error){
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture

                var images = $('.pinImg').length;
                var output = "";
                $('.pinImg').each(function(i, elem){
                   output = output + "<img src='" + $(elem).attr("src") + "' />";
                });
                res.send("<div>" + output + "</div>");
            }
        });
});

app.listen("8081");

console.log("Starting on port 8081");

exoports = module.exports = app;