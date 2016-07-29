var router = require('express').Router();
var trendController = require('./controllers/trendController.js');
var twitterController = require('./controllers/twitterController.js');
var facebookController = require('./controllers/facebookController.js');

// Requests to grab the latest Google Trends
router.route('/trends')
	.get(trendController.getTrends)

// Requests to grab the tweets on a given topic
router.route('/grabTweets')
	.post(twitterController.grabTweets)

// Request to grab the top two tweets for the topic
router.route('/grabTopTweet')
	.post(twitterController.grabTopTweet)

// Request to grab the Facebook reactions to a given topic...
// ... as well as the top two headlines for that topic
router.route('/grabFbook')
	.post(facebookController.grabFbook)

//test
router.route('/test')
  .get(twitterController.test)

module.exports = router;
