/* global d3 */
/* jshint camelcase:false, unused:false */
'use strict';

/**
 * Utility functions.
 */
angular.module('sparklines').service('SparkUtils', function () {
  var svc = {};

  svc.randomString = function (len) {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var s = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      s += charSet.substring(randomPoz, randomPoz + 1);
    }
    return 'as-' + s;
  };

  return svc;
});

/**
 * Easy sparklines for Angular.
 *
 * TODO
 * supported types: line, dot, bar, area
 * options: height, width, colors, stroke, fill, min, max
 *
 * Lots of help from:
 *
 * @see http://bl.ocks.org/benjchristensen/1148374
 * @see http://prag.ma/code/sparky/
 */
angular.module('sparklines').directive('sparkline', ['SparkUtils', function(Utils) {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      options: '='
    },
    link: function (scope, element) {
      // data array
      var data = scope.data || [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];
      // chart element identifier
      var id = element[0].id = element[0].id ? element[0].id : Utils.randomString(5);
      // chart options
      var options = scope.options || {
            animate: true,
            height: '100%',
            interpolation: 'basis', // basis, linear
            transitionDelay: 1000,
            updateDelay: 1000,
            width: '100%'
          };
      // create an SVG element inside the #graph div that fills 100% of the div
      var graph = d3.select(id).append('svg:svg').attr('width', options.width).attr('height', options.height);
      // X scale will fit values from 0-10 within pixels 0-100
      var x = d3.scale.linear().domain([0, 48]).range([-5, options.width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
      // Y scale will fit values from 0-10 within pixels 0-100
      var y = d3.scale.linear().domain([0, 10]).range([0, options.height]);
      // create a line object that represents the SVN line we're creating
      var line = d3.svg.line()
        // assign the X function to plot our line as we wish
          .x(function (d, i) {
            // verbose logging to show what's actually being done
            // console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
            // return the X coordinate where we want to plot this datapoint
            return x(i);
          })
          .y(function (d) {
            // verbose logging to show what's actually being done
            // console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + ' using our yScale.');
            // return the Y coordinate where we want to plot this datapoint
            return y(d);
          })
          .interpolate(options.interpolation);
      // display the line by appending an svg:path element with the data line we created above
      graph.append('svg:path').attr('d', line(data));
      // or it can be done like this
      //graph.selectAll('path').data([data]).enter().append('svg:path').attr('d', line);
      function redrawWithAnimation() {
        // update with animation
        graph.selectAll('path')
            .data([data]) // set the new data
            .attr('transform', 'translate(' + x(1) + ')') // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
            .attr('d', line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
            .transition() // start a transition to bring the new value into view
            .ease('linear')
            .duration(options.transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
            .attr('transform', 'translate(' + x(0) + ')'); // animate a slide to the left back to x(0) pixels to reveal the new value

        /* thanks to 'barrym' for examples of transform: https://gist.github.com/1137131 */
      }

      function redrawWithoutAnimation() {
        // static update without animation
        graph.selectAll('path')
            .data([data]) // set the new data
            .attr('d', line); // apply the new data values
      }

      setInterval(function () {
        var v = data.shift(); // remove the first element of the array
        data.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
        if (options.animate) {
          redrawWithAnimation();
        } else {
          redrawWithoutAnimation();
        }
      }, options.updateDelay);
    }
  };
}]);

angular.module('sparklines').directive('barChart', function () {

});

angular.module('sparklines').directive('heatCircle', function () {

});

angular.module('sparklines').directive('heatRectangle', function () {

});

angular.module('sparklines').directive('pieChart', function () {

});
