import React from 'react';
import {Panel, Well, Button} from 'react-bootstrap';
import {Image, PageHeader, small} from 'react-bootstrap';


class RightTab extends React.Component {
  constructor(props){
    super(props);
    }

InitChart(plotPoints) {

	// d3.select('svg').remove();

    var lineData = plotPoints;
    console.log(lineData)

    var vis = d3.select("#visualisation"),
      WIDTH = 280,
      HEIGHT = 100,
      MARGINS = {
        top: 20,
        right: 10,
        bottom: 20,
        left: 50
      },
      xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
          return d.x;
        }),
        d3.max(lineData, function (d) {
          return d.x;
        })
      ]),

      yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
          return d.y;
        }),
        d3.max(lineData, function (d) {
          return d.y;
        })
      ]),

      xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSize(5)
        .tickSubdivide(true),

      yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(5)
        .orient("left")
        .tickSubdivide(true);


    vis.append("svg:g")
      .attr("className", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);

    vis.append("svg:g")
      .attr("className", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

    var lineFunc = d3.svg.line()
    .x(function (d) {
      return xRange(d.x);
    })
    .y(function (d) {
      return yRange(d.y);
    })
    .interpolate('linear');

  vis.append("svg:path")
    .attr("d", lineFunc(lineData))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

}


render() {
var container = {
	'height': '150px',
	'float': 'left',
	'width': '100%',
	'padding-left' : '15px'	
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
}
  return (
    <div style={container}>
      <div style={menuBox}>
        <h2 style={titular}>{this.props.header}</h2>
        <svg id='visualisation' width='349.5' height='100'>{this.InitChart(this.props.plotPoints)}</svg>
      </div>
    </div>
  );
}
}
export default RightTab;


