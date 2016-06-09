var db = null;

pg.connect("postgres://localhost:5432/pokemon", function (err, client, done) {
  db = client;
})

module.exports = db;
