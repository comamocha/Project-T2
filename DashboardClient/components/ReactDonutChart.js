// import ReactDonutChartD3 from './ReactDonutChartD3';
// import React 
// import React from 'react';

// class ReactDonutChart extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   componentDidMount () {
//     ReactDonutChartD3.create(ReactDOM.findDOMNode(this), this.getChartState());
//   }

//   componentDidUpdate () {
//     ReactDonutChartD3.update(this.getDOMNode(), this.getChartState());
//   }

//   getChartState () {
//     return {
//       data: this.props.data,
//       colorLegend: this.props.colorLegend,
//       fixedDomain: this.props.fixedDomain,
//       selectedColor: this.props.selectedColor,
//       selectedTextColor: this.props.selectedTextColor,
//       onClick: this.props.onClick || () => {}
//     }
//   }

//   componentWillUnmount () {
//     ReactDonutChartD3.destroy(this.getDOMNode());
//   }

//   getDOMNode () {
//     return React.findDOMNode(this);
//   }

//   render () {
//     return <div className="donut-chart-container"></div>;
//   }

// }

// export default ReactDonutChart;