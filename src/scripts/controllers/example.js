/* jshint unused:false */
'use strict';

/**
 * Example controller.
 */
angular
  .module('example')
  .controller('ExampleCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.STATES = {
      READY: 0,
      LOADING: 1
    };

    $scope.alert = null;
    $scope.data = [ 23, 23, 53, 56, 12,
      36, 48, 24, 64, 54,
      51, 48, 33, 40, 37,
      27, 20, 21, 36, 39 ];
    $scope.chart = {
      area: {
        data: $scope.data,
        description: 'Volume',
        height: 20,
        title: 'Area Chart',
        type: 'area',
        width: 100
      },
      bar: {
        data: $scope.data,
        description: 'Price',
        height: 20,
        title: 'Bar Chart',
        type: 'bar',
        width: 100
      },
      binary: {
        data: [
          true, false, true, true, true,
          false, true, false, false, true,
          false, false, false, true, true,
          true, false, true, true, true
        ],
        description: 'Active',
        title: 'Binary Chart',
        type: 'binary',
        height: 20,
        width: 100
      },
      line: {
        data: $scope.data,
        description: 'Time',
        height: 20,
        title: 'Line Graph',
        type: 'line',
        width: 100
      }
    };
    $scope.state = $scope.STATES.READY;

    //-------------------------------------------------------------------------

    /**
     * Initialize the controller
     */
    $scope.init = function () {
      $scope.read();
    };

    /**
     * Read data.
     */
    $scope.read = function () {
      $scope.alert = null;
      $scope.state = $scope.STATES.LOADING;
      $http
        .get('data/test.json')
        .success(function(data) {
          //$scope.chart.data = JSON.parse(data);
          $scope.state = $scope.STATES.READY;
        })
        .error(function(err) {
          $scope.alert = {};
          $scope.chart.data = null;
          $scope.state = $scope.STATES.READY;
          $log.error(err);
        });
    };

    // initialize the controller
    $scope.init();

  }
]);