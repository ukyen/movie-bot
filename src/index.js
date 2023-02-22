// Third-party
const { log } = require('node-wit');
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
require('dotenv').config();

// Internal
const movies = require('./movie-functions');
const witClient = require('./wit-service');


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

const conn = mysql.createConnection({
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

app.post('/ask-movies', async (req, res) => {
  let data;
  try {
    data = await witClient.query(req.body.question);
  } catch (e) {
    console.error(e);
  };
  console.log(data);
  let intents = data.intents || [];
  let entities = data.entities || [];
  let queryResults = [];
  let renderData = {
    text: "Sorry, I don't understand your question.",
    intents: intents,
    entities: entities,
    queryResults: queryResults,
  };

  if (intents.length > 0 && entities.length > 0) {
    renderData.text = data.text;
    // A question should only have one intent
    intentName = data.intents[0].name;
    // A question may contain multiple entities for a complex question
    let queryEntities = [];
    data.entities.forEach(item => {
      queryEntities.push(item.value);
    });
    result = await movies.mappingFunc[intentName](queryEntities, conn);
    console.log(`query result ${JSON.stringify(result)}`);
    renderData.queryResults = result;
  };
  
  res.render('index', renderData);
}
);

app.listen(process.env.PORT, () => {
  console.log(`Movie Bot listening on port ${process.env.PORT}`)
})
