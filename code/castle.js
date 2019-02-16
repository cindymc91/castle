const request_promise = require('request-promise');
const cheerio = require('cheerio');

exports.grabAllurl = async function grabAllurl (url){
    const options = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    let results =[];
    try{
      let $ = await request_promise(options);
      $('#countryF + #countryF').children('.listDiamond').children('li').each(function(i){
        results[i] = $(this).children('a').first().attr('href'); //Only have the 1st link
      });
    }
    catch(error){
      console.log(error);
  }
  return results;
}

exports.checkHotelRestaurant = async function checkHotelRestaurant(tabAllurl){
  let filteredResults = [];

  //Variables pour le json
  //let url;
  let urlTabResto;
  let propertyName;
  let chefName;
  let jsonObject;


  for(var i = 0; i < tabAllurl.length; i++){
    //Une requête
    const options = {
      uri: tabAllurl[i],
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    try{
      let $ = await request_promise(options);
      if($('.jsSecondNav').children('.jsSecondNavMain').children('li').children('a').first().attr('data-id') === 'isProperty'){
        //console.log('Good');
        /*$('.jsSecondNav').children('.jsSecondNavSub').children('li').each(function(i){
          filteredResults.push($(this).children('a').text());
        });*/
        //filteredResults.push(tabAllurl[i]);

        urlTabResto = $('.jsSecondNav').children('.jsSecondNavMain').children('li').eq(1).children('a').attr('href');
        propertyName = $('h3.mainTitle2.noVerticalMargin').first().text();


        const options2 = {
          uri: urlTabResto,
          transform: function (body) {
            return cheerio.load(body);
          }
        };

        let $2 = await request_promise(options2);
        chefName = $2('.tabRestaurant').children('.grid').children('#restaurant-staff').children('.staffCard').children('.staffCard-heading').children('h4').first().text()
        jsonObject = {
          'url' : tabAllurl[i],
          'urlTabResto' : urlTabResto,
          'propertyName' : propertyName,
          'chefName' : chefName
        };

        filteredResults.push(jsonObject);


         //filteredResults.push($2('.tabRestaurant').children('.grid').children('#restaurant-staff').children('.staffCard').children('.staffCard-heading').children('h4').first().text());
         //filteredResults.push($2('.tabRestaurant').children('.grid').children('#restaurant-chief-carousel').children('#restaurant-chief').children('h4').first().text());

      }
      else{
        //console.log('Bad');
      }

      process.stdout.write("Fetching " + i + "/" + tabAllurl.length + "\r");
  }
  catch(error){
    console.log(error);
}

  }
  return filteredResults;
  //console.log(tabAllurl.length);
}

// "https://www.relaischateaux.com/fr/search/availability/check?month=2019-2&idEntity=360&pax=2&room=1"

exports.getPrice = function getPrice(url){
  const options = {
    uri: url,
    json : true
  }

  request_promise(options)
    .then((data) => {
      let result;
      //result = data['2019-2'].pricesPerDay[1];
      //result = data.directory_items[0].user.username;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.getPrice2 = async function getPrice2(tabAllurl){
  for(var i = 0; i < 2; i++){
    //Une requête
    const options = {
      uri: tabAllurl[i],
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    try{
      let $ = await request_promise(options);
      if($('.jsSecondNav').children('.jsSecondNavMain').children('li').children('a').first().attr('data-id') === 'isProperty'){

        const options2 = {
          uri: "https://www.relaischateaux.com/fr/search/availability/check?month=2019-2&idEntity=360&pax=2&room=1",
          json : true
        };

        let $2 = await request_promise(options2);
        jsonObject = {
          'url' : tabAllurl[i],
          'price' : $2[1].pricespPerDay[1]
        };
        console.log(jsonObject);

        filteredResults.push(jsonObject);

      }
      else{
        //console.log('Bad');
      }
  }
  catch(error){
    console.log(error);
}

  }
}
