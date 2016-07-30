import React from 'react';
import {Panel, Well, Button, Glyphicon} from 'react-bootstrap';
import {Image, PageHeader, small} from 'react-bootstrap';

var container = {
	'height': '250px',
	'float': 'left',
	'width': '100%',
  'padding-left': '27.5px'
};

var menuBox = {
	'height': '230px',
	'margin-bottom': '10px',
	'background': '#394264',
	'border-radius': '5px'
};

var titular = {
  'display': 'block',
  'line-height': '50px',
  'text-align': 'center',
  'border-top-left-radius': '5px',
  'border-top-right-radius': '5px',
  'font-size': '17px',
  'color': 'rgb(255, 255, 255)',
  'font-weight': 'bold',
  'background': '#35aadc'
};

var boxText = {
	'text-align': 'left',
  'color': 'white',
  'margin-left': '40px',
  'margin-right': '40px'
};

var timeSent = {
	'color': '#9099b7',
	'margin-left': '40px'
};

var glyphOffset = {
	'marginRight':'15px'
};

const TabPopularTweets = (props) => {
  console.log(props.sub1)
  return (
    <div style={container}>
      <div style={menuBox}>
        <h2 style={titular}><Glyphicon glyph="retweet" style ={glyphOffset}/>{props.header}</h2>
        <p style={boxText}><a class="tweet-link" href="#17">{props.sub1}</a> {props.sub2}</p>
        <p style={timeSent}>{props.sub3}</p>
        <p style={boxText}><a class="tweet-link" href="#17">{props.sub4}</a> {props.sub5}</p>
        <p style={timeSent}>{props.sub6}</p>
      </div>
    </div>
  );
}

export default TabPopularTweets;


