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
	var body1={"first":"NCSU","second":"UNC","third":"Gatech","fourth":"UCLA"}
    console.log(req.body);
	var score=0
	var name=req.body.major
	console.log(name)
    MongoClient.connect('mongodb://localhost:27017/mydb', function (err, db) {
  db.collection('colleges').find().toArray(function (err, docs) {
        docs.forEach(function (doc) {
			score=0
			if(doc['public(0) /private(1)']==1)
				  console.log(doc['schools'])
            
        });
      });
              db.close();

});

    res.status(200).send(body1);

});



    app.listen('3001', function(){
        console.log('running on 3001...');
    });