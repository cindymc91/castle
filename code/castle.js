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
        filteredResults.push(tabAllurl[i]);
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
