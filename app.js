var express = require('express');
var knex = require('knex');
var app = express();
const port = 3000;

let db = new knex({
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite"
  }
});

async function getArtists(f) {
  let q = db.select().table('artists')
  return (f) ? q.where('Name', 'like', `%${f}%`) : q;
}

app.get('/api/artists', async function (req, res) {
  let artists = await getArtists((req.query.filter)?req.query.filter:null);
    res.send(artists.map((a)=>({
      id : a.ArtistId,
      name : a.Name
    })
  ));
})

app.listen(port, () => console.log(`Serving at http://localhost:${port}`))
