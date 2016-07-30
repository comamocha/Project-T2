var router = require('express').Router();
var trendController = require('./controllers/trendController.js');
var twitterController = require('./controllers/twitterController.js');

// Requests to grab the latest Google Trends
router.route('/trends')
	.get(trendController.getTrends)

router.route('/history')
	.post(trendController.trendHistory)

// Requests to grab the tweets on a given topic
router.route('/grabTweets')
	.post(twitterController.grabTweets)

// Request to grab the top two tweets for the topic
router.route('/grabTopTweet')
	.post(twitterController.grabTopTweet)

router.route('/test')
  .get(twitterController.test)

module.exports = router;
