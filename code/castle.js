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
  let urlTabResto;

  let test;
  for(var i = 0; i < tabAllurl.length; i++){
    //console.log(tabAllurl[i]);
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

        const options2 = {
          uri: urlTabResto,
          transform: function (body) {
            return cheerio.load(body);
          }
        };

        let $2 = await request_promise(options2);


         filteredResults.push($2('.tabRestaurant').children('.grid').children('#restaurant-staff').children('.staffCard').children('.staffCard-heading').children('h4').first().text());
         //filteredResults.push($2('.tabRestaurant').children('.grid').children('#restaurant-chief-carousel').children('#restaurant-chief').children('h4').first().text());

      }
      else{
        //console.log('Bad');
      }
  }
  catch(error){
    console.log(error);
}

  }
  return filteredResults;
  //console.log(tabAllurl.length);
}
