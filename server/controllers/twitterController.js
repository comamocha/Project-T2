var routes = require('express').Router();
var googleTrends = require('google-trends-api');
var Twitter = require('twitter');
var api_key = require('../../api_keys.js')
var watson = require('watson-developer-cloud');
var Promise = require('bluebird');
var {getSentiment, politicalAnalysis, emotionalAnalysis, personalityTraits} = require('./IndicoApi.js')

// We are using the 'watson-developer-cloud' npm module
// See documentation for examples of how to request data from Watson using this module
// Setup the alchemy_language variable to use the api key from the api key file
var alchemy_language = watson.alchemy_language({
  api_key: api_key.watson_api_key
});

module.exports = {
	test: function(req, res) {
	  var country = req._parsedUrl.query;
	  googleTrends.hotTrends(country)
	  .then(function(results){
	    var trends = '\n';
	    results.forEach(function(item) {
	      trends += item + "\n";
	    });
	    res.send(trends);
	  })
	  .catch(function(err){
	    res.send("there was an error :(" + err);
	  });
	},
	
	grabTweets: function(req, res) {
		var query = req.body.q;
		var grabTweets = new Twitter({

		 consumer_key: api_key.consumer_key,
		 consumer_secret: api_key.consumer_secret,
		 access_token_key: api_key.access_token_key,
		 access_token_secret: api_key.access_token_secret

		});

		var tweetString = '';

		// Promise function to get the 100 most recent Tweets from twitter
		var callTwitter = function() {
			return new Promise(function(resolve, reject) {	
				grabTweets.get('search/tweets', {
					q: query, 
					count: 100, 
					result_type: 'recent', 
					lang: 'en', 
					result_type: 'recent', 
				}, function(error, tweets) {
				  if (error) {
				 		reject(error) 
				  } else {

				  	resolve(
					   	tweets.statuses.forEach(function(tweetObj, index) {
					   		//console.log(tweetObj.user.location)
					      tweetString += tweetObj.text
					      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
					      .replace(/[`❤️~@#$%^&*()_|☆+\-=;:<>\{\}\[\]\\\/]/gi, ' ')
					      
					    })
				    )
				  }
				})
			})		
		}


		// Make five calls to Twitter and gather ~500 tweets
		callTwitter().then(function() {
			callTwitter().then(function() {
				callTwitter().then(function() {
					callTwitter().then(function() {
						callTwitter().then(function() {

							// Send the tweets to Watson for analysis
							var storage = {}

							tweetString.split(/[\s,.!?]+/).map(function(string) {
								if (string.length > 3) {
									var lString = string.toLowerCase()
									if (storage[lString]) {
										storage[lString] += 1													
									} else {
										storage[lString] = 1
									}
								}
							})

							for(var key in storage) {
								if (storage[key] < 5) {
									delete storage[key]
								}
							}
							getSentiment(tweetString, req, res).then(function(data) {
								
								var positive = 0;
								var negative = 0;
								console.log(data)

							});
							
						});
					});
				});
			});
		});

	},

	// Get the top two tweets on a topic
	grabTopTweet: function(req, res) {

		var query = req.body.q;
		var grabTweets = new Twitter({

		 consumer_key: api_key.consumer_key,
		 consumer_secret: api_key.consumer_secret,
		 access_token_key: api_key.access_token_key,
		 access_token_secret: api_key.access_token_secret

		});

		// Searh for 'popular' tweets
		grabTweets.get('search/tweets', {q: query, count: 3, result_type: 'popular', lang: 'en'}, function(error, tweets) {
			if (error) {
				throw error
			} else {
				if(tweets.statuses.length > 2) {
	
					// Calculate time of tweets
					var firstTweetTime = Math.round((new Date().getTime() - new Date(tweets.statuses[0].created_at).getTime()) / 3600000);
					var secondTweetTime = Math.round((new Date().getTime() - new Date(tweets.statuses[1].created_at).getTime()) / 3600000);

					// Send top two tweets to front end
					// console.log(tweets.statuses[0].text)
					res.json({firstUser: tweets.statuses[0].user.screen_name, firstTweet: tweets.statuses[0].text, firstTweetTime: firstTweetTime, secondUser: tweets.statuses[1].user.screen_name, secondTweet: tweets.statuses[1].text, secondTweetTime: secondTweetTime});
				}
			}
		});		
	}

}

