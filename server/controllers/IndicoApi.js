var indico = require('indico.io');
indico.apiKey = require('../../api_keys.js').indico_api_key;
var Promise = require('bluebird');


module.exports = {
	getSentiment : function(string) {
		return new Promise(function(resolve, reject){
			console.log("HELLO")
			indico.sentimentHQ(string)
				.then(function(res){console.log(res)})
				.catch(function(err){console.log(err)})
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
					console.log("pointless code")
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