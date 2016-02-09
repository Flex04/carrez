var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var coinjs = require('./leboncoin.js');
var agentjs = require('./lesmeilleursagents.js')

var avgprice;


app.use(express.static('web_files'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){

res.sendFile( __dirname  + '/web_files/app.html');

}) ;

app.post('/#', function(req, res) {
  var url = req.body.url; 
  coinjs.getinfosLbc(url);
 
  var dealRes = agentjs.getinfosLma();
 console.log(dealRes);

 if(dealRes  == true){

 res.sendFile( __dirname  + './web_files/Good_deal.html');
 }
 
 if(dealRes  == false){
 //res.send('bad deal');
 res.sendFile( __dirname  + './web_files/Bad_deal.html');
 }
 
});


app.listen('8080')
console.log('Check your localhost : "http://localhost:8080/"');