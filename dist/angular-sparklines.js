/* global d3 */
/* jshint camelcase:false, unused:false */
'use strict';

// module
angular.module('sparklines', []);

/**
 * Utility functions.
 */
angular.module('sparklines').service('SparkUtils', function () {
  var svc = {};

  /**
   * Create an area chart and add it to the DOM.
   * @param {String} id Element ID
   * @param {Array} data Data array
   * @param {Object} options Chart configuration options
   */
  svc.areaChart = function (id, data, options) {
    // create the d3 SVG element
    var graph = d3.select(id).append('svg:svg').attr('width', options.width).attr('height', options.height);
    // X and Y scales
    var x = d3.time.scale()
      .domain([0, data.length])
      .range([0, options.width]);
    var y = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([options.height, 0]);
    // create the area shape
    var area = d3.svg.area()
      .x(function(d, i) { return x(i); })
      .y0(options.height)
      .y1(function(d) { return y(d); });
    // add the area fill to the graph
    graph.append('path').datum(data).attr('class', 'area').attr('d', area);
  };

  /**
   * Create a bar chart and add it to the DOM.
   * @param {String} id Element ID
   * @param {Array} data Data array
   * @param {Object} options Chart configuration options
   */
  svc.barChart = function (id, data, options) {
    // create the d3 SVG element
    var graph = d3.select(id).append('svg:svg').attr('width', options.width).attr('height', options.height);
    // Y scale
    var yScale = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, options.height]);
    var barWidth = options.width / data.length;
    var bar = graph.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function(d, i) { return 'translate(' + i * barWidth + ',0)'; });
    bar.append('rect')
        .attr('class', 'bar')
        .attr('y', function(d) { return yScale(d); })
        .attr('height', function(d) { return options.height - yScale(d); })
        .attr('width', barWidth - 1);
  };

  /**
   * Create a bar chart and add it to the DOM.
   * @param {String} id Element ID
   * @param {Array} data Data array
   * @param {Object} options Chart configuration options
   */
  svc.binaryChart = function (id, data, options) {
    // create the d3 SVG element
    var graph = d3.select(id).append('svg:svg').attr('width', options.width).attr('height', options.height);
    // Y scale
    var yScale = d3.scale.linear()
        .domain([0, 1])
        .range([0, options.height]);
    var barWidth = options.width / data.length;
    var bar = graph.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function(d, i) { return 'translate(' + i * barWidth + ',0)'; });
    bar.append('rect')
        .attr('class', function (d) { return d ? 'binary' : 'binary negative'; })
        .attr('y', function(d) { return d ? 0 : yScale(0.5); })
        .attr('height', function() { return options.height / 2; })
        .attr('width', barWidth - 1);
  };

  /**
   * Default chart configuration.
   */
  svc.defaultOptions = {
    animate: false,
    dimensionUnit: 'px',
    height: 15,
    interpolation: 'basis', // basis, linear
    transitionDelay: 1000,
    type: 'line',
    updateDelay: 1000,
    width: 100
  };

  /**
   * Create a line chart and add it to the DOM.
   * @param {String} id Element ID
   * @param {Array} data Data array
   * @param {Object} options Chart configuration options
   */
  svc.lineChart = function (id, data, options) {
    // create the d3 SVG element
    var graph = d3.select(id).append('svg:svg').attr('width', options.width).attr('height', options.height);
    // X and Y scales
    // FIXME adjust chart height, width to accommodate dots at perimeter
    var xScale = d3.scale.linear().domain([0, data.length]).range([0, options.width]);
    var yMax = d3.max(data);
    var yMin = d3.min(data);
    var yScale = d3.scale.linear().domain([yMin, yMax]).range([0, options.height]);
    var line = d3.svg.line()
        .x(function(d, i) {
          // verbose logging to show what's actually being done
          //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
          // return the X coordinate where we want to plot this datapoint
          return xScale(i);
        })
        .y(function(d) {
          // verbose logging to show what's actually being done
          //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + ' using our yScale.');
          // return the Y coordinate where we want to plot this datapoint
          return yScale(d);
        });
    graph.append('svg:path').attr('d', line(data));

    var dotHeight = 4;
    var dotWidth = 4;
    var dot = graph.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', function(d, i) { return 'translate(' + (xScale(i) - (dotWidth / 2)) + ',' + (-dotHeight/2) + ')'; });

    if (options.endValue) {
      dot.append('rect')
        .attr('class', function (d, i) { return i === (data.length - 1) ? 'dot last' : 'hidden'; })
        .attr('y', function(d) { return yScale(d); })
        .attr('height', dotHeight)
        .attr('width', dotWidth);
    }
    if (options.startValue) {
      dot.append('rect')
        .attr('class', function (d, i) { return i === 0 ? 'dot first' : 'hidden'; })
        .attr('y', function(d) { return yScale(d); })
        .attr('height', dotHeight)
        .attr('width', dotWidth);
    }
    if (options.maxValue) {
      var maxValueIndex = data.reduce(function(lastIndex, current, index) {
        if (data[index] >= data[lastIndex]) {
          return index;
        } else {
          return lastIndex;
        }
      }, 0);
      console.dir('max ' + maxValueIndex);
      dot.append('rect')
        .attr('class', function (d, i) { return i === maxValueIndex ? 'dot max' : 'hidden'; })
        .attr('y', function(d) { return yScale(d); })
        .attr('height', dotHeight)
        .attr('width', dotWidth);
    }
    if (options.minValue) {
      var minValueIndex = data.reduce(function(lastIndex, current, index) {
        if (data[index] < data[lastIndex]) {
          return index;
        } else {
          return lastIndex;
        }
      }, Infinity);
      console.dir('min ' + minValueIndex);
      dot.append('rect')
        .attr('class', function (d, i) { return i === minValueIndex ? 'dot min' : 'hidden'; })
        .attr('y', function(d) { return yScale(d); })
        .attr('height', dotHeight)
        .attr('width', dotWidth);
    }
  };

  /**
   * Merge by reference from source to destination object. Overwrites existing
   * keys.
   * @param dest Destination object
   * @param src Source object
   * @returns {Object} Merged object
   */
  svc.mergeOptions = function (dest, src) {
    Object.keys(src).forEach(function(key) {
      dest[key] = src[key];
    });
    return dest;
  };

  svc.randomNumbers = function (count, max) {
    var i, val, vals = [];
    max = max || 100;
    for (i = 0; i < count; i++) {
      val = Math.floor(Math.random() * max);
      vals.push(val);
    }
    return vals;
  };

  svc.randomString = function (len) {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var s = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      s += charSet.substring(randomPoz, randomPoz + 1);
    }
    return s;
  };

  return svc;
});

/**
 * Line graph.
 * options: height, width, colors, stroke, fill, min, max
 * @see http://prag.ma/code/sparky/
 * @see http://bl.ocks.org/benjchristensen/1133472
 * @see http://bl.ocks.org/benjchristensen/1148374
 */
angular.module('sparklines').directive('sparkline', ['SparkUtils', function(Sparklines) {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '='
    },
    link: function (scope, element) {
      var data, id, options;
      // chart element identifier
      element[0].id = element[0].id ? element[0].id : 'sparkline-' + Sparklines.randomString(5);
      id = '#' + element[0].id;
      // chart data and configuration options
      data = scope.test ? Sparklines.randomNumbers(20, 100) : scope.data || [];
      options = scope.options ? Sparklines.mergeOptions(Sparklines.defaultOptions, scope.options) : Sparklines.defaultOptions;
      // build the chart
      if (options.type === 'area') {
        Sparklines.areaChart(id, data, options);
      } else if (options.type === 'bar') {
        Sparklines.barChart(id, data, options);
      } else if (options.type === 'binary') {
        Sparklines.binaryChart(id, data, options);
      } else if (options.type === 'line') {
        Sparklines.lineChart(id, data, options);
      }
    }
  };
}]);
