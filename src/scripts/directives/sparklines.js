/* global MG */
/* jshint camelcase:false, unused:false */
'use strict';

/**
 * Easy sparklines for Angular.
 * TODO
 * supported types: line, dot, bar, area
 * options: height, width, colors, stroke, fill, min, max
 */
angular.module('sparklines').directive('sparkline', function() {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      options: '='
    },
    link: function(scope, element) {

      // generate sparkline
    }
  };
});
