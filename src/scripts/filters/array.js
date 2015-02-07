/* globals angular */
'use strict';

angular
    .module('example')
    .filter('last', function () {
        return function (arr) {
            return arr[arr.length - 1];
        };
    });