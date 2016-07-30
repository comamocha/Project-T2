import React from 'react';
import countriesArray from './data/countriesArray.js';

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      selectedCountry: 'US',
    }
  }

  componentDidMount() {
    this.worldMap();
    this.googleTrendGrab('US');
  }

  googleTrendGrab (countryCode) {
    var that = this;
    $.get('http://localhost:4000/test', countryCode, function(list) {
        that.props.trends(list);
    });
  }
  
  clickHandler() {
    var that = this;

    setTimeout(function() {
      this.state.map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
        var obj = {target: {value: geography.id}};
        that.handleFormChange(obj);
        for (var i = 0; i < countriesArray.length; i++) {
          if (countriesArray[i][2] === geography.id) {
            that.googleTrendGrab(countriesArray[i][1]);
            return;
          }
        }
      });
    }.bind(this), 2000);
  }

  worldMap() {
    this.state.map = new Datamap({
      element: document.getElementById('worldMapContainer'),
      responsive: true,
      geographyConfig: {
        popupOnHover: true
      },
      fills: {
          SELECTED: 'red',
          UNSELECTED: 'green',
          defaultFill: 'gray'
      }
    })
    var selectedCountry = this.state.selectedCountry;
    var map = this.state.map;
    countriesArray.map(function(triple) {
      var obj = {}
      var toggle = (triple[1] === selectedCountry) ? 'SELECTED' : 'UNSELECTED';
      obj[triple[2]] = {'fillKey': toggle};
      map.updateChoropleth(obj);
    });
    d3.select(window).on('resize', function() {
      map.resize();
    });
  }

  handleFormChange (e) {
    var clickedCountry = e.target.value;
    this.toggleMapColors(this.state.selectedCountry);
    this.setState({selectedCountry: e.target.value});
    setTimeout(function() {
      this.toggleMapColors(clickedCountry)
    }.bind(this), 250);
  }

  toggleMapColors (clickedCountry) {
    //Google's Trend API requires 2-digit country-codes
    //Datamaps requires 3-digit country-codes
    //For loop will find the corresponding 3-digit country-code for selected item
    var countryCode = clickedCountry;
    
    if (clickedCountry.length !== 3) {
      for (var i = 0; i < countriesArray.length; i++) {
        if (countriesArray[i][1] === this.state.selectedCountry) {
          countryCode = countriesArray[i][2];
        }
      }
    }

    var toggleVar = this.state.map.options.data[countryCode]['fillKey'] === 'SELECTED';
    var fillKey = (toggleVar) ? 'UNSELECTED' : 'SELECTED';
    var obj = {};
    obj[countryCode] = {fillKey: fillKey};
    this.state.map.updateChoropleth(obj);
  }

  render () {
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

    return (
      <div style={outline}>              
        <h1 style={titular}>World Map</h1>
        <div id="worldMapContainer" 
             style={{top: '-15%', height: '90%'}} 
             onClick={this.clickHandler()}>
        </div>
      </div>
    )
  }
}

export default WorldMap;
