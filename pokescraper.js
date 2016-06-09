var request = require('request');

function promisifyGet(url) {
    return new Promise(function(resolve, reject) {

        request.get(url, function(error, response, body){
            if(error) {
                reject(error);
            }
            else {
                resolve(response);
            }
        });
    });
}

var baseURL = "http://pokeapi.co/api/v2/pokemon/";
var promises = [];

for (var i = 1; i < 45; i++) {
  var pokeURL = baseURL + i;
  promises.push(promisifyGet(pokeURL));
}

Promise.all(promises).then(function (manyResponses) {
  console.log(`got ${manyResponses.length}`)

  for (var i = 0; i < manyResponses.length; i++) {
    try {
      var pokemon = JSON.parse(manyResponses[i].body);
      var name = pokemon.name;
      var pokedex_number = pokemon.id;
      if (pokemon.types) {
        if (pokemon.types[0].slot == 1) {
          var type1 = pokemon.types[0].type.name;
          var type2 = pokemon.types[1].type.name;
        } else {
          var type1 = pokemon.types[1].type.name;
          var type2 = pokemon.types[0].type.name;
        }
      }
      console.log(`INSERT INTO pokemon (name, pokedex_number, type1, type2) VALUES ('${name}', ${pokedex_number}, '${type1}', '${type2}');`);
    } catch (e) {
      //console.log(e)
    }
  }




});
