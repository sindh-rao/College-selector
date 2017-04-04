    var express = require('express'); 
    var app = express(); 
    var bodyParser = require('body-parser');
    var mongodb = require('mongodb');
var assert = require('assert');
var fs = require('fs');
var uri = 'mongodb://localhost:27017/test';
var MongoClient = require('mongodb').MongoClient;

    app.use(function(req, res, next) { 
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

    app.use(express.static('../client'));
    app.use(bodyParser.json());  



app.post('/api/formDetails', function (req, res) {
    console.log(req.body);
	
    MongoClient.connect('mongodb://localhost:27017/mydb', function (err, db) {
  db.collection('colleges').find({"North(0)/ South(1)": 0}).toArray(function (err, docs) {
        docs.forEach(function (doc) {
            
        });
      });
              db.close();

});

    res.status(200).send("Success");

});



    app.listen('3001', function(){
        console.log('running on 3001...');
    });