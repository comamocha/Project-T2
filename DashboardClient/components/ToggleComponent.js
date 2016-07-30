import ReactDOM from 'react-dom';
import Loader from 'halogen/PulseLoader';
import {Grid, Row, Col, Clearfix, Panel, Well, Button, Glyphicon} from 'react-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Jumbotron} from 'react-bootstrap';
import React from 'react';

export default class ToggleComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='sentimentChart'>
        <ul className="legend horizontal-list">
          <li>
              <p className="love split scnd-font-color">Love</p>
              <p className="percentage">N/A<sup>%</sup></p>
          </li>
          <li>
              <p className="shocked split scnd-font-color">Shocked</p>
              <p className="percentage">N/A<sup>%</sup></p>
          </li>
          <li>
              <p className="funny split scnd-font-color">Funny</p>
              <p className="percentage">N/A<sup>%</sup></p>
          </li>
          <li>
              <p className="sad split scnd-font-color">Sad</p>
              <p className="percentage">N/A<sup>%</sup></p>
          </li>
          <li>
              <p className="angry split scnd-font-color">Angry</p>
              <p className="percentage">N/A<sup>%</sup></p>
          </li>
        </ul>
      </div> 
      
    );
  }
}
