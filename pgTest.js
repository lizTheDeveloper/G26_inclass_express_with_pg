var pg = require('pg');
var conString = "postgres://localhost:5432/pokemon";

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM pokemon;', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    for (var i = 0; i < result.rows.length; i++) {
      var pokemon = result.rows[i];
      console.log(pokemon.name);
    }


    client.query("SELECT * FROM moves;", function(err, result) {
      console.log(result.rows);
    })

  });
});
