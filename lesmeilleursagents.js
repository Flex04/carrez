var getinfosLmg = function(url){

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var agent = require('./json/les-meilleurs-agents.json');
var coin = require('./json/boncoin-result.json');

var isok;
var type= coin.properties.type;
agent.properties.type = type;
var avgprice; 
agent.location.zip = coin.location.zip; // faire la recherche "meilleurs-agents" avec ce zip
agent.location.city = coin.location.city;

url = './web_files/lechesnay78150.html'; //a changer (voir READme)

request(url, function(error, response, html){
    if(!error){
 
        var $ = cheerio.load(fs.readFileSync(url, 'utf8'));

        var tabprice = $('.small-4.medium-2.columns.prices-summary__cell--median');
 
        if (type != null) {
          switch (type)
          {
            case "Appartement":
            avgprice = tabprice[0].children[0].data;
            break;              

            case "Maison":
            avgprice = tabprice[1].children[0].data;
            break;

            case "location":            //les meilleurs agents ne font pas la difference entre maison et appartement pour une location
            avgprice = tabprice[2].children[0].data;
            break;
          }

          agent.properties.averageprice =parseInt(avgprice.match(/[0-9,]/g).join("").replace(",", "."));

          var pri = coin.properties.price;
          var surf = coin.properties.surface;
          var priceMetre = pri / surf;

          if (avgprice > priceMetre )
          {
            isok = false;
          }
          else if (avgprice <= priceMetre)
          {
            isok = true;
          }
        }

        else 
        {
          console.log(err);
        };

    fs.writeFile('./json/agent-result.json', JSON.stringify(agent, null, 4), function(err){

    console.log(' Complete - Check your "les-meilleurs-agents.json" file');

});

res.send('Check your console!');
    
    };

app.listen('8080');

});
return isok;
};

exports.getinfosLmg = getinfosLmg;