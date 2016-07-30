var indico = require('indico.io');
indico.apiKey = require('../../api_keys.js').indico_api_key;
var Promise = require('bluebird');


module.exports = {
	getSentiment : function(string, req, res) {
		return new Promise(function(resolve, reject){
			indico.sentimentHQ(string)
				.then(function(data){
					var positive = Math.floor(data * 100);
					var negative = 100 - positive;
					res.send({summary: 'Mostly Negative', positive: positive, negative: negative});
				})

				// ,
				//  function (err, response) {
				// if (err) {
				// 	console.log(err)
				// 	reject(err);
				// } else {
				// 	console.log(response)
				// 	resolve(response)
				// }
			// })			
		})
	},

	politicalAnalysis : function(string) {
		return new Promise(function(resolve, reject){
			indico.political(string, function (err, response) {
				if (err) {
					reject(err);
				} else {
					resolve(response)
				}
			})			
		})
	},

	emotionAnalysis : function(string) {
		return new Promise(function(resolve, reject){
			indico.emotion(string, function (err, response) {
				if (err) {
					reject(err);
				} else {
					resolve(response)
				}
			})			
		})
	},

	personalityTraits : function(string) {
		return new Promise(function(resolve, reject){
			indico.personas(string, function (err, response) {
				if (err) {
					reject(err);
				} else {
					resolve(response)
				}
			})			
		})	
	}
}