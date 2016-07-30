import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'halogen/PulseLoader';
import {Grid, Row, Col, Clearfix, Panel, Well, Button, Glyphicon} from 'react-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Jumbotron} from 'react-bootstrap';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';

import LeftTab from './leftTab';
import WorldMap from  './DashboardComponents/map/WorldMap';
import MidTab from './MidTab';
import RightTab from './RightTab';
import TabPopularTweets from './TabPopularTweets';
import TabNewsHeadlines from './TabNewsHeadlines';
import Search from './SearchComponent.js';


var styles = {
  'background-color': 'black'
}

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchedItem: '',
      trends: [],
      currentTrend: 'Select Trend',
      twitterData:[
        {label: 'positive', score: 50},
        {label: 'negative', score: 50},
      ],
      facebookData:[
        {label: 'loves', score: 20},
        {label: 'wows', score: 20},
        {label: 'hahas', score: 20},
        {label: 'sads', score: 20},
        {label: 'angrys', score: 20},
      ],
      publicSentiment: '',
      emotionalFeedback: '',
      trendHistory: '',
      representativeTweet1: '',
      representativeTweet2: '',
      representativeNewsSource: '',
      twitterSpinner: false,
      twitterSummary: '',
      facebookSummary: '',
      NewsTopHeadlines: '',
      trendScore: 0,
      historicalTrendArray: [],
      facebookLikes: '',
      currentChart: 'twitterChart'
    }
  }

  componentDidMount () {
    this.getTrends();
    this.updateChart(this.state.twitterData, '#sentimentChart');
  }
/**************************
 * Map Component Logic
 **************************/

  getObjectValues(obj) {
    var values = [];
    for (var i in obj) {
      values.push(obj[i]);
    }
    return values;
  }

/**************************
 * End Map Component Logic
 **************************/

  searchTrend (e) {
    this.setState( {
      currentTrend: e
    })
    if(this.state.currentChart === "twitterChart"){
      this.twitterGrab(e);
      this.updateNewsTopHeadlines(e);
      this.topTweetGrab(e);
    }
  }

getObjectValues(obj) {
  var values = [];
  for (var i in obj) {
    values.push(obj[i]);
  }
  return values;
}

  setHistoryDataPoints(array) {
    var dataPointsForGraph = [];
    for (var i = 1; i < array.length; i++) {
      dataPointsForGraph.push({'x': i, 'y': Number(this.getObjectValues(array[i])[0])})
      console.log(dataPointsForGraph)
    }
    return dataPointsForGraph;
  }

  getHistory (q) {
    var context = this;
    $.ajax({
      method: "POST",
      url: 'http://localhost:4000/history',
      data: JSON.stringify({q: q}),
      contentType: "application/json",
      success: function(d){
        var history = d;
        var dataPoints = context.setHistoryDataPoints(history);
        console.log(history, 'THIS IS ALL THE HISTORY DATA')
        context.setState({
          historyArray: history,
          trendScore: context.getObjectValues(history[history.length-1])[0],
          historicalTrendArray: dataPoints
        })
      },
      dataType: 'json'
    });
  }


getTrends () {
    //pull in data from google trends to populate dropdown menu

    var context = this;
    $.get('http://localhost:4000/trends', function(data){
      context.setState({
        trends: data
      })
    });
  }

  //pull in twitter data from watson to populate twitter chart
  twitterGrab (q) {
    var context = this;
    this.setState({
      currentTrend: q,
      twitterSpinner: true
    })
  
    $.ajax({
      method: "POST",
      url: 'http://localhost:4000/grabTweets',
      data: JSON.stringify({q: q}),
      contentType: "application/json",
      success: function(d){
        setTimeout(function() {
          console.log(d);
        }, 2000);
        context.setState({
          twitterData: [{label: 'positive', score:d.positive},{label:'negative', score:d.negative}],
          twitterSpinner: false,
          twitterSummary: d.summary
        });
        d3.select('#sentimentChart').selectAll('svg').remove();
        context.updateChart(context.state.twitterData, '#sentimentChart');
      },
      dataType: 'json'
    });
  }

  topTweetGrab (q) {
    //grab top tweet data to populate representative tweet panel
    var context = this;
    this.setState({
      currentTrend: q
    })

    $.ajax({
      method: "POST",
      url: 'http://localhost:4000/grabTopTweet',
      data: JSON.stringify({q: q}),
      contentType: "application/json",
      success: function(d){
        var tweet = map(d, function(item){
          return item;
        });
        context.setState({
          representativeTweet1user: '@' + tweet[0],
          representativeTweet1headline: tweet[1],
          representativeTweet1time: tweet[2] + ' hours ago',
          representativeTweet2user: '@' + tweet[3],
          representativeTweet2headline: tweet[4],
          representativeTweet2time: tweet[5] + ' hours ago'
        })
      },
      dataType: 'json'
    });
  }

  //Updates all data. API calls for NewsFeed, Twitter are set here 
  allDataGrab (q) {
    //update everything (when new trend is selected)
    this.setState({
      currentTrend: q
    })
    if(this.state.currentChart === "twitterChart"){
      this.twitterGrab(q);
    } else {
      //this.facebookGrab(q);
    }
    this.getHistory(q);
    this.updateNewsTopHeadlines(q);
    this.topTweetGrab(q);
  }


  updateChart (data, id) {
    var width = 350, //960
        height = 350, //500
        radius = Math.min(width, height) / 2;

    //Ordinal scale w/ default domain and colors for range
    var color = d3.scale.ordinal()
        .range(["#F0AD44","#128085","#FAE8CD","#385052","#C74029"]);

    //create arc data (to define path svg)
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    //create pie layout order data
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d){
          return d.score;
        });
    //append both and svg and a g (group) element to the page. Move it over to the middle
    var svg = d3.select(id).append('svg')
              .attr('class', 'twitterChart')
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + width / 2 + "," + height / 2 + ')');

    //Apply data to pie and add g's on enter
    var g = svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

    //put a path element in the g, give it a d attribute of the previously defined arc path. Grab its color from the scale range
    g.append('path')
    .attr('d', arc)
    .style('fill', function(d) {return color(d.data.label);});

    //put svg text elements on each g. Use the cenrtroid method to position center of the slice. Shift the dy positioning. Pull text from data
    g.append('text')
    .attr('transform', function(d){return 'translate('+ labelArc.centroid(d) + ')'; })
    .attr('dy', '.35em')
    .attr('dx', '-.8em')
    .attr('font-size', '15px')
    .text(function(d) {return d.data.label;});
  }

  updateNewsTopHeadlines(keyword) {
    var context = this;
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "38618d65ade0456985ffee0915ba6299",
      'q': keyword
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function (result) {
      var finalbody = [];
      //Go Through news articles and extract snippit
      result.response.docs.map(function (article, index) {

        //Snippet That is clickable 
        //Number of articles to display 
        if (index < 2) {
          finalbody.push(
            <a href={article.web_url}>
              <div>
                {article.snippet}
              </div></a>)
        }
      })
      context.setState({ NewsTopHeadlines: finalbody });
    }).fail(function (err) {
      throw err;
    });
  }

  render () {
    var header = {
      backgroundColor: '#394264',
      fontColor: 'white',
      borderColor: 'rgba(231, 231, 231, 0)',
      marginTop: '2.5%',
      height: '65px',
      fontSize: '17px',
      borderRadius: '5px'
    };

    var headerli = {
      padding: '0 10px',
      display: 'block',
      lineHeight: '74px',
      fontSize: '17px',
      webkitTransition: 'background .3s',
      transition: 'background .3s',
      marginTop: '10px'
    };

    var liColor = {
      textColor: 'white'
    };

    var outline = {
      backgroundColor: 'rgb(57, 66, 100)',
      height: '485px' ,
      borderRadius: '5px'
    };

    var titular = {
      display: 'block',
      lineHeight: '50px',
      textAlign: 'center',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      fontSize: '17px',
      color: 'rgb(255, 255, 255)',
      fontWeight: 'bold',
      background: '#35aadc'
    };

    var glyphOffset = {
      marginRight:'15px',
      fontSize:'25px',
      marginBottom: '10px'
    };

    var sentimentChart = {
      position: 'relative',
      left: '70%',
      top: '2%',
      WebkitTransform: 'translateX(-50%)',
      mstransform: 'translateX(-50%)',
      transform: 'translateX(-50%)',
      paddingRight: '27.5px'
    };

    return (
      
      <Grid>
          <Row>
            <Navbar style={header}>
              <Navbar.Header>
                <Navbar.Brand style={headerli}>
                  <a href="#" ><Glyphicon glyph="signal" style ={glyphOffset}/>Trend Wave</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav style={headerli}>
                <NavDropdown style={liColor} eventKey={1} title="Current Trends" id="basic-nav-dropdown" >
                  <MenuItem style={liColor} eventKey={1.1} >Select Trend</MenuItem>
                  <MenuItem divider />
                  <MenuItem />
                  {
                    this.state.trends.map(function(trend, index) {
                      var eKey = Number('1.' + (index + 1));
                      var context = this;
                      var handler = function(){
                        context.allDataGrab(trend);
                      }
                      return <MenuItem eventKey={eKey} key={index} onClick={handler}>{trend}</MenuItem>
                    }.bind(this))
                  }
                </NavDropdown>
                <Button >Toggle Display</Button>
              </Nav>
              <Search search={this.searchTrend.bind(this)} />
            </Navbar>
          </Row>
          <Row>
            <Col xs={6} md={4}><LeftTab info={this.state.trendHistory} header={this.state.currentTrend.toUpperCase()} sub={"Trend Score: " + this.state.trendScore}/></Col>
            <Col xs={6} md={4}><MidTab loading={this.state.twitterSpinner} info={this.state.publicSentiment} header="PUBLIC SENTIMENT" sub={this.state.twitterSummary}/></Col>
            <Col xs={6} md={4}><RightTab id='visualisation' header={"TREND GRAPH (1 YEAR)"} sub={'graph'} plotPoints={this.state.historicalTrendArray}/></Col>
          </Row>
          <Row>
            <Col md={6} mdPush={6}>
              <Row>  
                <TabPopularTweets info={this.state.trendHistory} header="MOST POPULAR TWEETS" sub1={this.state.representativeTweet1user} sub2={this.state.representativeTweet1headline} sub3={this.state.representativeTweet1time} sub4={this.state.representativeTweet2user} sub5={this.state.representativeTweet2headline} sub6={this.state.representativeTweet2time}/>
              </Row>
              <Row>
                <TabNewsHeadlines info={this.state.trendHistory} header="MOST POPULAR HEADLINES" sub1={this.state.NewsTopHeadlines[0]}  sub2={this.state.NewsTopHeadlines[1]} />
              </Row>
            </Col>
            <Col md={6} mdPull={6}>
              <div style={outline}>
                <h1 style={titular}>SENTIMENT ANALYSIS</h1>
                <div id="sentimentChart" style={sentimentChart}>
                  {this.state.twitterSpinner ? <Loader color="#26A65B " size="16px" margin="4px"/> : <div></div>}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <WorldMap trends={function(list) { this.setState({trends: list.split('\n') })}.bind(this)} />
          </Row>
      </Grid>
    );
  }
}

export default Dashboard;

var map = function(obj, cb){
  var result = [];
  for(var i in obj){
    result.push(cb(obj[i], i, obj));
  }
  return result;
}