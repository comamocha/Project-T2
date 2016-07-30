ToggleComponent.js
updateDonutChart (dataset){
    var width = 350,
        height = 350,
        outerRadius = Math.min(width, height) * .5 - 10,
        innerRadius = outerRadius * .6;

    // var dummyDataSet = [null, 20, 20, 20, 20, 20];
    // console.log('this is the dataset: ', dataset)
    var newDataset = dataset.slice(4);
    // console.log('this is the new and improved dataset: ', newDataset);
    var dataFromServer = map(newDataset, function(item){
      // console.log(item)
      return item.score == null ? 0 : item.score;
    });
    var emoDataset = [null].concat(dataFromServer);
    // console.log('emoDataset', emoDataset);  

    var fTest = function () {
      emoDataset.splice(0, 1);
      return emoDataset[0]; 
    }

    var n = 5,
        data0 = d3.range(n).map(Math.random),
        data1 = d3.range(n).map(fTest),
        data;

    var color = d3.scale.category20();

    var arc = d3.svg.arc();

    var pie = d3.layout.pie()
        .sort(null);

    var svg = d3.select("#sentimentChart").append("svg")
        .attr('class', 'facebookChart')
        .attr("width", width)
        .attr("height", height);

    svg.selectAll(".arc")
        .data(arcs(data0, data1))
      .enter().append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", arc);

    transition(1);

    // copied code //

    function arcs(data0, data1) {
      var arcs0 = pie(data0),
          arcs1 = pie(data1),
          i = -1,
          arc;
      while (++i < n) {
        arc = arcs0[i];
        arc.innerRadius = innerRadius;
        arc.outerRadius = outerRadius;
        arc.next = arcs1[i];
      }
      return arcs0;
    }

    // end copied code //

    function transition(state) {
      var path = d3.select('#sentimentChart').selectAll(".arc > path")
          .data(state ? arcs(data0, data1) : arcs(data1, data0));

      var t0 = path.transition()
          .duration(500)
          .attrTween("d", tweenArc(function(d, i) {
            return {
              innerRadius: i & 1 ? innerRadius : (innerRadius + outerRadius) / 2,
              outerRadius: i & 1 ? (innerRadius + outerRadius) / 2 : outerRadius
            };
          }));

      var t1 = t0.transition()
          .attrTween("d", tweenArc(function(d, i) {
            var a0 = d.next.startAngle + d.next.endAngle,
                a1 = d.startAngle - d.endAngle;
            return {
              startAngle: (a0 + a1) / 2,
              endAngle: (a0 - a1) / 2
            };
          }));

      var t2 = t1.transition()
            .attrTween("d", tweenArc(function(d, i) {
              return {
                startAngle: d.next.startAngle,
                endAngle: d.next.endAngle
              };
            }));

      var t3 = t2.transition()
          .attrTween("d", tweenArc(function(d, i) {
            return {
              innerRadius: innerRadius,
              outerRadius: outerRadius
            };
          }));
    }

    function tweenArc(b) {
      return function(a, i) {
        var d = b.call(this, a, i), i = d3.interpolate(a, d);
        for (var k in d) a[k] = d[k]; // update data
        return function(t) { return arc(i(t)); };
      };
    }
  }

