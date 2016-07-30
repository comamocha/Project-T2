import React from 'react';
import {Panel, Well, Button} from 'react-bootstrap';
import {Image, PageHeader, small} from 'react-bootstrap';
import Loader from 'halogen/PulseLoader';

var container = {
	'height': '150px',
	'float': 'left',
	'width': '100%',
	'padding-left' : '7.5px',
	'padding-right' : '7.5px'	
};

var menuBox = {
	'height': '150px',
	'margin-bottom': '25px',
	'background': '#394264',
	'border-radius': '5px'
};

var titular = {
	'display': 'block',
	'line-height': '50px',
	'margin': '0',
	'text-align': 'center',
	'border-top-left-radius': '5px',
	'border-top-right-radius': '5px',
	'font-size': '17px',
	'color': '#fff',
	'background': '#11a8ab',
	'font-weight': 'bold',
};

var boxText = {
	'text-align': 'center',
  'font-size': '30px',
  'color': 'white',
  'margin-top': '25px'
};

const MidTab = (props) => {
  return (
    <div style={container}>
      <div style={menuBox}>
        <h2 style={titular}>{props.header}</h2>
        <p style={boxText}>{props.sub ? props.sub : 'N/A'}</p>
      </div>
    </div>
  );
}

export default MidTab;


