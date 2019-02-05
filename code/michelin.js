const request_promise = require('request-promise');
const cheerio = require('cheerio');

async function grabStarredResto (url, tabStar){
    const options = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    try{
      let $ = await request_promise(options);
      $('.poi-search-result').children('li').each(function(i){
        tabStar.push($(this).children('div').attr('attr-gtm-title'));
      });
      //console.log(tabStar[8]);

      //console.log(results[0]);
    }
    catch(error){
      console.log(error);
  }
  //return results;
}

exports.loopThroughPages = async function loopThroughPages(){
  let results = [];
  //Page 1
  await grabStarredResto('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin', results);

  //Loop for page 2-35
  for(var i = 2; i <= 35; i++){
    await grabStarredResto('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + i, results)
  }
  return results;
}
