// // import d3 from 'd3';
// var ReactDonutChartD3 = {};
// var svg, html, Donut;

// /* Initialization */
// ReactDonutChartD3.create = function (el, props) {
//   var width = 450,
//       height = 450,
//       outerRadius = Math.min(width, height) * .5 - 10,
//       innerRadius = outerRadius * .6;

//   // emoDataset 

//   emoDataset = [null, 30, 10, 30, 25, 5]

//   var fTest = function () {
//     emoDataset.splice(0, 1);
//     return emoDataset[0]; 
//   }

//   var n = 5,
//       data0 = d3.range(n).map(Math.random),
//       data1 = d3.range(n).map(fTest),
//       data;

//   var color = d3.scale.category20();

//   var arc = d3.svg.arc();

//   var pie = d3.layout.pie()
//       .sort(null);

//   var svg = d3.select("body").append("svg")
//       .attr("width", width)
//       .attr("height", height);

//   svg.selectAll(".arc")
//       .data(arcs(data0, data1))
//     .enter().append("g")
//       .attr("class", "arc")
//       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
//     .append("path")
//       .attr("fill", function(d, i) { return color(i); })
//       .attr("d", arc);



//   // this.update(el, props);
// }

// /* Update */
// ReactDonutChartD3.update = function (el, props) {
//   var data = props.data;
//   if (!data) return;

//   // generate data with calculated layout values
//   var nodes = Donut.nodes({children: data})
//     .filter((d) => !d.children); // filter out the outer Donut

//   // assign new data to existing DOM for circles and labels
//   var circles = svg.selectAll('circle')
//     .data(nodes, (d) => 'g' + (d.displayText || d._id));
//   var labels = html.selectAll('.Donut-label')
//     .data(nodes, (d) => 'g' + (d.displayText || d._id));

//   // code to handle update
//   // code code code code code

//   // code to handle initial render
//   // code code code code code

//   // code to handle exit
//   // code code code code code
// }

// /** Any necessary cleanup */
// ReactDonutChartD3.destroy = function (el) {}

// export default ReactDonutChartD3;