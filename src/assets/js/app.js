/*global angular */

/**
 * The main weather app module
 *
 * @type {angular.Module}
 */
var app = angular.module('weatherapp', ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
        'use strict';

        $routeProvider.when('/', {
            controller: 'WeatherController',
            templateUrl: 'weatherapp-index.html'
        }).when('/:city', {
            controller: 'WeatherController',
            templateUrl: 'weatherapp-index.html'
        }).otherwise({
            redirectTo: '/'
        });
    }]);
