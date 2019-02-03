const request_promise = require('request-promise');
const cheerio = require('cheerio');

const options = {
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

    $('#countryF + #countryF').children('.listDiamond').children('li').children('a').each(function(i,elm){
      //test[i] = $(this).text(); //To have the text (name of the hotel)
      test[i] = $(this).attr('href'); //To have the link
    });

    //Les établissements avec juste restaurant sont à enlever

    console.log(test[1]);
  })
  .catch((err) => {
    console.log(err);
  });
