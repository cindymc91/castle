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

function arrayToTxt(array, file){
  var fs = require('fs');
  var stream = fs.createWriteStream(file);
  stream.once('open', function(fd) {
    for(var i = 0; i < array.length; i++){
      stream.write(array[i] + '\n');
    }
    stream.end();
  });
}

function txtToArray(file) {
  var fs = require('fs');
  var array = fs.readFileSync(file).toString().split("\n");
  /*for(i in array) {
  console.log(array[i]);
}*/
return array;
}

let tabWithAllurl; //liste avec les 150 url correspondant aux établissements français
let tabHotelRestaurant; //liste avec les noms des chefs des établissements
let chefStarredResto; //liste avec les chefs des restos étoilés

async function start(){

  //--------------------Bloc qui stock dans des txt les data scrappés-------------//

  /*
  tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');
  arrayToTxt(tabWithAllurl, 'allurl.txt');
  console.log('url ok');

  tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);
  arrayToTxt(tabHotelRestaurant, 'allChefProperties.txt');
  console.log('properties chef ok');



  chefStarredResto = await michelin.grabChefName();
  arrayToTxt(chefStarredResto, 'allChefStarred.txt');
  console.log('resto chef ok');
*/

  //------------------------------------------------------------------------------//



  //--------------------Bloc qui récup les données des txt et les mets dans les array-------------//
  //tabWithAllurl = txtToArray("allurl.txt");
  //tabHotelRestaurant = txtToArray("allChefProperties.txt");
  chefStarredResto = txtToArray("allChefStarred.txt");
  console.log(chefStarredResto.length);
  console.log(chefStarredResto);

  //------------------------------------------------------------------------------//



  /*
  //--------------------Bloc à exécuger pour du scraping en temps réel (long)-------------//

    //On récupère la partie Relaix Chateaux
    //--tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');
    //--tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);


    //On récupère la partie Michelin
    //--chefStarredResto = await michelin.grabChefName();


  //------------------------------------------------------------------------------//
  */






  //On récupère la partie Relaix Chateaux
  //--tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');
  //tabWithAllurl = txtToArray("allurl.txt");
  //console.log(tabWithAllurl);
  //arrayToTxt(tabWithAllurl, 'allurl.txt');


  //console.log(tabWithAllurl[0]);
  //console.log(tabWithAllurl[1]);
  //--tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);
  //console.log(tabHotelRestaurant[0]);
  //console.log(tabHotelRestaurant[1]);
  /*console.log(tabHotelRestaurant);
  console.log(tabHotelRestaurant.length);*/


  //On récupère la partie Michelin
  //--chefStarredResto = await michelin.grabChefName();
  //console.log(chefStarredResto[20]);
  //console.log(chefStarredResto.length);

  /*for(var i = 0; i < 626; i++){
  if(starredResto[i].toUpperCase() === 'au crocodile'.toUpperCase()){
  console.log(starredResto[i]);
  console.log(i);
}
}*/

}

start();
