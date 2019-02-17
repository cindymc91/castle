const request_promise = require('request-promise');
const cheerio = require('cheerio');

//fc qui prend les restos étoilés de la page
async function grabStarredResto (url, tabStar){

    let linkUrl;

    const options = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    try{
      let $ = await request_promise(options);
      $('.poi-search-result').children('li').each(function(){
        //tabStar.push($(this).children('div').attr('attr-gtm-title'));

        linkUrl = 'https://restaurant.michelin.fr' + $(this).children('div').children('a').attr('href');
        tabStar.push(linkUrl);

        /*const options2 = {
          uri: linkUrl,
          transform: function (body) {
            return cheerio.load(body);
          }
        };

        let $2 = await request_promise(options2);
        let test = $2('.node_poi_description').children('field').children('.field__items').children('div').text()*/
        //tabStar.push($2('.node-poi-description').children('field').children('.field__items').children('div').text());
      });
      //console.log(tabStar[8]);

      //console.log(results[0]);
    }
    catch(error){
      console.log(error);
  }
  //return results;
}

async function loopThroughPages(){
  let allURL = [];
  //Page 1
  await grabStarredResto('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin', allURL);

  //Loop for page 2-35
  for(var i = 2; i <= 35; i++){
    await grabStarredResto('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + i, allURL)
  }
  return allURL;
}

exports.grabChefName = async function grabChefName(){
  let allChefName = [];
  let allLinks = [];
  allLinks = await loopThroughPages();
  //console.log(allLinks.length);

  for(var i = 0; i < allLinks.length; i++){
    const options = {
      uri: allLinks[i],
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    try{
      let $ = await request_promise(options);
      allChefName.push($('.node_poi_description').children('.field').children('.field__items').children('.field__item').first().text());
      //tabStar.push($2('.node-poi-description').children('field').children('.field__items').children('div').text());
      //console.log(allLinks[i]);
      //console.log(test);

      process.stdout.write("Fetching " + i + "/" + allLinks.length + "\r");
    }
    catch(error){
      console.log(error);
    }
  }

  return allChefName;
}
