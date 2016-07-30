var indico = require('indico.io');
indico.apiKey = require('../../api_keys.js').indico_api_key;
var Promise = require('bluebird');

var	getSentiment = function(string, req, res) {
	return new Promise(function(resolve, reject){
		indico.sentiment(string)
			.then(function(response){
				var data = 0;
				var stats = {}
				for(var i = 0; i < response.length; i++) {
					data += response[i]
				}
				data = data/response.length;
				stats.positive = Math.abs(Math.floor(data * 100));
				stats.negative = 100 - stats.positive;
				if(stats.positive > 60) {
					stats.summary = 'Thumbs up'
				} else if (stats.positive < 40) {
					stats.summary = 'Thumbs down'
				} else {
					stats.summary = 'Thumbs middle'
				}
				resolve(stats);
			})	
	})
};

var	politicalAnalysis = function(string) {
	return new Promise(function(resolve, reject){
		indico.political(string, function (err, response) {
			if (err) {
				reject(err);
			} else {
				resolve(response)
			}
		})			
	})
};

var	emotionAnalysis = function(string) {
	return new Promise(function(resolve, reject){
		indico.emotion(string)
			.then(function(data){
				var stats = {
	        'anger': 0,
	        'joy': 0,
	        'fear': 0,
	        'sadness': 0,
	        'surprise' : 0
				};
				for(var i = 0; i < data.length; i++) {
					stats.anger += data[i].anger/data.length,
					stats.joy += data[i].joy/data.length,
					stats.fear += data[i].fear/data.length,
					stats.sadness += data[i].surprise/data.length,
					stats.surprise += data[i].surprise/data.length					
				}
				resolve(stats)
			})		
	})
};

var	personalityTraits = function(string) {
	return new Promise(function(resolve, reject){
		indico.personas(string, function (err, response) {
			if (err) {
				reject(err);
			} else {
				resolve(response)
			}
		})			
	})	
};


module.exports = {
	getSentiment : getSentiment,
	politicalAnalysis: politicalAnalysis,
	emotionAnalysis: emotionAnalysis,
	personalityTraits: personalityTraits
}

