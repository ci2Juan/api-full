const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const db = require('./queries')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200);
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/users', db.getUsers)
app.post('/users', db.createUser)


app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
