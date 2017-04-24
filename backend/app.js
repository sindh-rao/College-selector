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


var body1 = [];
app.post('/api/formDetails', function (req, res) {
    console.log(req.body);
	var score=0
	var name=req.body.major
	var score_array = [];
	var s2=[];
	console.log(name)
    MongoClient.connect('mongodb://localhost:27017/mydb', function (err, db) {
  		db.collection('collegesfinal').find().toArray(function (err, docs) {
			docs.forEach(function (doc) {
				score=0
				instate=false;
				var ranks=[req.body.rank3,req.body.rank2,req.body.rank1];
				
				if(doc['public(0) /private(1)']==req.body.public_private){
					score += 1;
					if(ranks.indexOf("public_private") != -1)
						score+=2+ranks.indexOf("public_private");
					}
				if(doc['State']==req.body.state) {
					score += 1;
					doc.instate=true;
				} else {
					score += 1;
					doc.instate=false;
				}
				if(doc['Acceptance rate']>req.body.accRate){
					score += 1;
					if(ranks.indexOf("accRate") != -1)
						score += 2+ranks.indexOf("accRate");
				}
				if(doc['Location (0=NE 1=NW 2=SE 3=SW 4=C)']==req.body.desired_location){
					score += 1;
					if(ranks.indexOf("location") != -1)
						score+=2+ranks.indexOf("location");
				}
				if(instate && doc['In-State Tuition']<req.body.inMax){
					score += 1;
					if(ranks.indexOf("tuition") != -1)
						score+=2+ranks.indexOf("tuition");
				}
				else if(!instate && doc['Out-of-state Tuition']<req.body.outMax){
					score += 1;
					if(ranks.indexOf("tuition") != -1)
						score+=2+ranks.indexOf("tuition");
				}
				if(doc['In power five no(0)/ yes(1)']== req.body.sports){
					score += 1;
					if(ranks.indexOf("sports") != -1)
						score+=2+ranks.indexOf("sports");
				
				}
				score*=(parseFloat(doc['Review Analysis Score'])/100);
				score *= parseFloat(doc['Youtube 2016-till now reviews']); 
				
				
			
				// if(doc['major'].indexOf(req.body.major)>=0){
				// 	  score+=2+ranks.indexOf("major");
				// 	  }
				
				s2.push(score, doc['Schools']);
				console.log(doc['Schools']+" "+score);
				score_array.push([score,doc]);				
        	});
			score_array=score_array.sort(function(a,b){return b[0] - a[0];});
			body1 = [];
			for(var i = 0; i < 4; i++) {
				console.log(score_array[i][0]);
				body1.push(score_array[i][1]);
			}
			console.log(body1);
    	});
    	db.close();
	});
    res.status(200).send(body1);
});

app.get('/api/results', function(req, res) {
	res.send(body1);
});


app.listen('3001', function(){
	console.log('running on 3001...');
});