const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://power:power123@cluster0.2xpg6.mongodb.net/power?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
client.connect((err) => {
  const collection = client.db("power").collection("load");
  // perform actions on the collection object
  app.post("/chartdata", (req, res) => {
    // console.log(req.body);
    collection.insertOne(req.body).then((doc) => {
      console.log(doc);
    });
  });
  app.get("/showdata", (req, res) => {
    collection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });
});

app.listen(process.env.PORT || port);
