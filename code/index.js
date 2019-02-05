const castle = require('./castle');
const michelin = require('./michelin')


/*const options = {
  uri: 'https://www.relaischateaux.com/fr/site-map/etablissements',
  transform: function (body) {
    return cheerio.load(body);
  }
};

request_promise(options)
  .then(($) => {
    //var test = $('#countryF + #countryF').text(); //Get all the div #countryF

    //var test = $('#countryF + #countryF').children('.listDiamond').children('li').children('a').text();

    var test =[];

    $('#countryF + #countryF').children('.listDiamond').children('li').each(function(i,elm){
      //test[i] = $(this).text(); //To have the text (name of the hotel)
      test[i] = $(this).children('a').first().attr('href'); //Only have the 1st link
      //test[i] = $(this).attr('href'); //To have the link
    });
    console.log(test);
  })
  .catch((err) => {
    console.log(err);
  });*/

let tabWithAllurl;
let tabHotelRestaurant;
let starredResto;

async function start(){
  //On récupère la partie Relaix Chateaux
  //tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');
  //console.log(tabWithAllurl.length);
  //tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);
  //console.log(newTab.length);
  //console.log(tabWithAllurl.length);

  //On récupère la partie Michelin
  starredResto = await michelin.loopThroughPages();
  console.log(starredResto[625]);

}

start();
