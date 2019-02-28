#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// create express app
const app = express();
const cors = require('cors');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));
app.use('/public', express.static(__dirname + '/public'));
// app.use('/public', express.static(__dirname + '/public'));
//app.use('/favicon.ico', express.static(__dirname + '/favicon.ico'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'AdminPanel'
    })
});

const mongo = require('mongodb').MongoClient;
//var url = process.env.MONGO_URL;
var url = 'mongodb://172.17.0.2:27017/';
console.log(url);

app.get('/acshapes/', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var db_api = db.db("Demo_Apollo");
        db_api.collection("loadgeojson").find({}).toArray(function(err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
    });
});
app.get('/entity', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var db_api = db.db("Demo_Apollo");
        //console.log(req.query)

          db_api.collection("entity").find({'properties.type':req.query.type}).toArray(function(err, result) {
                  if (err) throw err;
                  console.log(result)
                  res.json(result);
                  db.close();
              });



    });
});
app.get('/connect', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var db_api = db.db("Demo_Apollo");
        //console.log(req.query)

          db_api.collection("entity").find({'properties.name':req.query.name}).toArray(function(err, result) {
                  if (err) throw err;
                  console.log(result)
                  res.json(result);
                  db.close();
              });



    });
});

app.get('/grid', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var db_api = db.db("Demo_Apollo");
        //console.log(req.query)




          console.log(req.query.number);
          db_api.collection("grid").find({'grid_number':req.query.number}).project({'_id':0,'grid_number':0}).toArray(function(err, result) {
                  if (err) throw err;
                  //console.log(result)
                  res.json(result);
                  db.close();
              });



    });
});

app.get('/lines', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var db_api = db.db("Demo_Apollo");
        //console.log(req.query)





          db_api.collection("lines_new").find({}).project({'_id':0}).toArray(function(err, result) {
                  if (err) throw err;
                  console.log(result)
                  res.json(result);
                  db.close();
              });



    });
});
app.get('/district', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var db_api = db.db("Demo_Apollo");
        //console.log(req.query)





          db_api.collection("district").find({}).project({'_id':0}).toArray(function(err, result) {
                  if (err) throw err;
                  console.log(result)
                  res.json(result);
                  db.close();
              });



    });
});

app.listen(80,'0.0.0.0');

// listen for requests
