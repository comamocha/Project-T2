import React from 'react';

import {Panel, Well, Button, Glyphicon} from 'react-bootstrap';
import {Image, PageHeader, small} from 'react-bootstrap';


var container = {
	'height': '235px',
	'float': 'left',
	'width': '100%',
  'padding-left': '27.5px'
}

var menuBox = {
	'height': '235px',
	'margin-bottom': '25px',
	'background': '#394264',
	'border-radius': '5px'
}

var titular = {
    'display': 'block',
    'line-height': '50px',
    'text-align': 'center',
    'border-top-left-radius': '5px',
    'border-top-right-radius': '5px',
    'font-size': '17px',
    'color': 'rgb(255, 255, 255)',
    'font-weight': 'bold',
    'background': '#e64c65'
}

var boxText = {
	'text-align': 'left',
    'color': 'white',
    'margin-left': '40px',
    'margin-right': '40px'
}

var glyphOffset = {
  'marginRight':'15px'
}





const TabNewsHeadlines = (props) => {
  return (
    <div style={container}>
      <div style={menuBox}>
          <h2 style={titular}><Glyphicon glyph="globe" style ={glyphOffset}/>{props.header}</h2>
          <p style={boxText}>{props.sub1}</p>
          <p style={boxText}>{props.sub2}</p>

      </div>
    </div>
  );
}




export default TabNewsHeadlines;


