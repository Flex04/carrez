var getinfosLbc = function(url){

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var coin = require('./json/le-boncoin.json');


//var url = 'http://www.leboncoin.fr/ventes_immobilieres/922007676.htm?ca=12_s';
request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var price, city, zip, type, rooms, surface;
	
  price =  parseInt($("[itemprop='price']").text());
  console.log(price);
	city =   $("[itemprop='addressLocality']").text();
	zip = parseInt($("[itemprop='postalCode']").text());
  type =  $("[itemprop='addressLocality']").text();
	var datas = $("[class = 'lbcParams criterias']>table > tr > td");
	
   type = datas[0].children[0].data;
   rooms = parseInt(datas[1].children[0].data);
   surface = parseInt(datas[2].children[0].data);
  
  
   coin.properties.price = price;
   coin.location.city = city;
   coin.location.zip = zip;
   coin.properties.surface = surface;
   coin.properties.rooms = rooms;
   coin.properties.type = type;
   
}


fs.writeFile('./json/boncoin-result.json', JSON.stringify(coin, null, 4), function(err){

    console.log(' Complete - Check your "boncoin-result.json" file');

});

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!');

});



app.listen('8080');
}

exports.getinfosLbc = getinfosLbc;

