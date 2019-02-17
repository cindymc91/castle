const castle = require('./castle');
const michelin = require('./michelin')
var colors = require('colors');
const readLineSync = require('readline-sync');


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
let tabHotelRestaurant; //liste d'objets Json avec les infos de RelaisChateaux
let chefStarredResto; //liste avec les chefs des restos étoilés
let finalSelection = []; //liste avec les établissements français étoilés

async function start(option){

  //--------------------Bloc qui stock dans des txt les data scrappés-------------//


/*
    tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');
    console.log('url ok');

    tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);
    let json = JSON.stringify(tabHotelRestaurant);
    toTxt(json, "json_relais-chateaux.txt");
    console.log('json relaischateaux ok');

    chefStarredResto = await michelin.grabChefName();
    arrayToTxt(chefStarredResto, 'allChefStarred.txt');
    console.log('resto chef ok');


*/


  //------------------------------------------------------------------------------//



  //--------------------Bloc qui récup les données des txt et les mets dans les array-------------//

  if(option === '1'){

    tabWithAllurl = txtToArray("allurl.txt");

    let j_bis = fromTxt("json_relais-chateaux.txt");
    tabHotelRestaurant = JSON.parse(j_bis);

    chefStarredResto = txtToArray("allChefStarred.txt");

    console.log("We are using saved data.")
    console.log("In the " + tabWithAllurl.length + " french properties, " + tabHotelRestaurant.length + " are hotel + restaurant.")

    //console.log(tabHotelRestaurant[10].chefName);
    //console.log(chefStarredResto[10]);
    //console.log(tabHotelRestaurant.length);
  }




  //------------------------------------------------------------------------------//




  //--------------------Bloc à exécuter pour du scraping en temps réel (très long)-------------//

  if(option === '2'){
    //On récupère la partie Relaix Chateaux
    console.log("Searching for all French properties".green.bgBlack);
    tabWithAllurl = await castle.grabAllurl('https://www.relaischateaux.com/fr/site-map/etablissements');
    console.log("Got " + tabWithAllurl.length + " french properties")

    console.log("\nChecking if it has hotel + restaurant".green.bgBlack);
    tabHotelRestaurant = await castle.checkHotelRestaurant(tabWithAllurl);
    console.log("Got " + tabHotelRestaurant.length + " Hotel / Restaurant properties")


    //On récupère la partie Michelin
    console.log("\nGrabing all Michelin starred chef".green.bgBlack);
    chefStarredResto = await michelin.grabChefName();
    console.log("Got " + chefStarredResto.length + " starred chef from Michelin website")
  }



  //------------------------------------------------------------------------------//



//Comparaison pour ne garder que les étoilés

  for(var i = 0; i < tabHotelRestaurant.length; i++){
    for(var j = 0; j < chefStarredResto.length; j++){
      if(tabHotelRestaurant[i].chefName != '' && tabHotelRestaurant[i].chefName.toUpperCase() === chefStarredResto[j].toUpperCase()){
        finalSelection.push(tabHotelRestaurant[i]);
      }
    }
  }
  //console.log(finalSelection);
  //console.log(finalSelection.length);

//let price = castle.getPrice2(tabWithAllurl);

}


//start();

async function menu(){

  let userRes;

  console.clear();
  while (userRes !== '0') {
    console.log("-------------------------------------------------");
    console.log("Relais-Chateaux / Michelin Restaurant WORKSHOP".green.bgBlue);
    console.log("-------------------------------------------------");
    console.log("1. Search in saved data (quick)");
    console.log("2. Search in real time (may take up to 20 minutes)");
    console.log("0. Exit the program");

    userRes = readLineSync.question("\nPick an option : ");

    if (userRes === '1') {
      await start(userRes);
      console.log("\nWe found " + finalSelection.length + " of Hotel-Restaurant at RelaisChateaux website.\nHere they are :\n");
      for(var i = 0; i < finalSelection.length; i++){
        console.log("Property Name : " + finalSelection[i].propertyName.blue);
        console.log("Chef Name : " + finalSelection[i].chefName.blue);
        console.log("Starting price : " + finalSelection[i].startPrice.red);
        console.log("");
      }

    } else if (userRes === '2') {
      await start(userRes);
      console.log("\nWe found " + finalSelection.length + " of Hotel-Restaurant at RelaisChateaux website.\nHere they are :\n");

      for(var i = 0; i < finalSelection.length; i++){
        console.log("Property Name : " + finalSelection[i].propertyName.blue);
        console.log("Chef Name : " + finalSelection[i].chefName.blue);
        console.log("Starting price : " + finalSelection[i].startPrice.red);
        console.log("");
      }
    }
  }
}

menu();
//start(0);








//
