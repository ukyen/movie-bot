const WitService = require('./wit-service');
const { log } = require('node-wit');
const express = require('express')
require('dotenv').config();
const movies = require('./movie-functions');
var bodyParser = require('body-parser')
var mysql = require('mysql2');


const app = express()

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})
)
app.set('view engine', 'ejs');


const client = new WitService(
  process.env.WIT_API_KEY,
  new log.Logger(log.DEBUG), // optional
);


var conn = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get('/', function (req, res) {
  res.render('index', {
    text: "", intents: [],
    entities: [], queryResults: []
  });
});

app.post('/ask-movies', (req, res) => {
  client.query(req.body.question)
    .then(data => {
      console.log(data);
      let intents = data.intents ? data.intents : []
      let entities = data.entities ? data.entities : {}
      var queryResults = [];
      debugger;
      if (intents.length === 0 && Object.keys(entities).length === 0) {
        res.render('index', {
          text: "Sorry, I don't understand your question.",
          intents: intents,
          entities: entities,
          queryResults: queryResults,
        });
      } else {
        // A question should only have one intent
        intentName = data.intents[0].name;
        // A question may contain multiple entities for a complex question
        queryEntities = [];
        data.entities.forEach(item => {
          queryEntities.push(item.value);
        });
        movies.mappingFunc[intentName](queryEntities, conn,
          function (result) {
            console.log(`query result ${JSON.stringify(result)}`);
            res.render('index', {
              text: data.text,
              intents: intents,
              entities: entities,
              queryResults: result,
            });
          }
        );
      }
    })
    .catch(console.error);
}
);

app.listen(process.env.PORT, () => {
  console.log(`Movie Bot listening on port ${process.env.PORT}`)
})
