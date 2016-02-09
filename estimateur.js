var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var coin = require('./boncoin-result.json');
var agent = require('./agent-result.json');

var avgprice;

app.use(express.static('carrez'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/myserver', function(req, res){

//res.render('./views/mainpage');

res.sendFile( __dirname  + '/app.html');




}) ;

app.post('/checkresult', function(req, res) {
  var url = req.body.url; 
  lbc.getlbc(url);
 
  var deal = ma.getMa();
 console.log(deal);
 if(deal  == true){
 //res.send('good deal');
 res.sendFile( __dirname  + '/views/goodchoice.html');
 }
 
 if(deal  == false){
 //res.send('bad deal');
 res.sendFile( __dirname  + '/views/badchoice.html');
 }
 
});

app.listen('8080')
console.log('the server is coming');




function estimationMetre (var surface, var price)
{
	return (price / surface);
}

if (coin.properties.type == "Appartement")
{
	maxPrice = agent.location.appartment.maxprice;
	averageprice = agent.location.appartment.averageprice;
	minprice = agent.location.appartment.minprice;
}

else if (coin.properties.type == "House")  // not sure about 'house'
{
	maxPrice = agent.location.house.maxprice;
	averageprice = agent.location.house.averageprice;
	minprice = agent.location.house.minprice;
}

else if (coin.properties.type == "Leasing")  // not sure neither, maybe location
{
	maxPrice = agent.location.leasing.maxprice;
	averageprice = agent.location.leasing.averageprice;
	minprice = agent.location.leasing.minprice;
}

var priceMetre = estimation(coin.properties.price, coin.properties.surface);

if (priceMetre < minprice)
{
	Console.log("Tres mauvais bail")
}

else if (priceMetre => minprice && priceMetre < averageprice)
{
	Console.log("Pas tres bon bail")
}

else if (priceMetre => averageprice && priceMetre < maxprice)
{
	Console.log("Bon bail")
}

else if (priceMetre => maxprice)
{
	Console.log("Tres bon bail")
}

