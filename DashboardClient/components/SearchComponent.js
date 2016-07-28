import React from 'react';
import {Button} from 'react-bootstrap'

export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	search: ""
    }
  }

  addSearch(e) {
  	console.log(e.target.value)
  	this.setState({
  		search: e.target.value
  	})
  }

  searchClick(){
  	var context = this;
  //twitter api call for this.state onClick
  	context.props.search(this.state.search)
  }



  render() {
    return (
    	<span className="input">
        <input placeholder="Search new trends!" onChange={this.addSearch.bind(this)}></input>
        <span className="inputSubmit">
          <Button onClick={this.searchClick.bind(this)}>Search Trend</Button>
        </span>
      </span>

    );
  }
}
