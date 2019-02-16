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

function toTxt(stringifiedObject, file){
  var fs = require('fs');
  var stream = fs.createWriteStream(file);
  stream.once('open', function(fd) {
    stream.write(stringifiedObject);
    stream.end();
  });
}

function fromTxt(file){
  var fs = require('fs');
  var result = fs.readFileSync(file);
  return result.toString();
}

let tabWithAllurl; //liste avec les 150 url correspondant aux établissements français
let tabHotelRestaurant; //liste avec les noms des chefs des établissements
let chefStarredResto; //liste avec les chefs des restos étoilés
let finalSelection = []; //liste avec les établissements français étoilés

async function start(){

  //--------------------Bloc qui stock dans des txt les data scrappés-------------//


/*
  tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');

  tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);
  let j = JSON.stringify(tabHotelRestaurant);
  toTxt(j, "json_relais-chateaux.txt");

  chefStarredResto = await michelin.grabChefName();
  arrayToTxt(chefStarredResto, 'allChefStarred.txt');
  console.log('resto chef ok');

*/

  //------------------------------------------------------------------------------//



  //--------------------Bloc qui récup les données des txt et les mets dans les array-------------//


  tabWithAllurl = txtToArray("allurl.txt");

  let j_bis = fromTxt("json_relais-chateaux.txt");
  tabHotelRestaurant = JSON.parse(j_bis);

  chefStarredResto = txtToArray("allChefStarred.txt");

  //console.log(tabHotelRestaurant[10].chefName);
  //console.log(chefStarredResto[10]);
  //console.log(tabHotelRestaurant.length);


  //------------------------------------------------------------------------------//



  /*
  //--------------------Bloc à exécuter pour du scraping en temps réel (très long)-------------//

    //On récupère la partie Relaix Chateaux
    //--tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');
    //--tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);


    //On récupère la partie Michelin
    //--chefStarredResto = await michelin.grabChefName();


  //------------------------------------------------------------------------------//
  */


//Comparaison pour ne garder que les étoilés

  for(var i = 0; i < tabHotelRestaurant.length; i++){
    for(var j = 0; j < chefStarredResto.length; j++){
      if(tabHotelRestaurant[i].chefName != '' && tabHotelRestaurant[i].chefName.toUpperCase() === chefStarredResto[j].toUpperCase()){
        finalSelection.push(tabHotelRestaurant[i]);
      }
    }
  }
  console.log(finalSelection);
  console.log(finalSelection.length);

//let price = castle.getPrice2(tabWithAllurl);



}



//start();










//
