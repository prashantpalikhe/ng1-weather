/*global angular */

/**
 * The main weather app module
 *
 * @type {angular.Module}
 */
var app = angular.module('weatherapp', [])
    .filter('beautifulicon', function () {
        'use strict';

        var iconMapping = {
            "01d" : "wi-day-sunny" ,
            "02d" : "wi-day-cloudy",
            "03d" : "wi-cloudy",
            "04d" : "wi-cloudy",
            "09d" : "wi-showers",
            "10d" : "wi-day-rain",
            "11d" : "wi-thunderstorm",
            "13d" : "wi-snow",
            "50d" : "wi-fog",
            "01n" : "wi-night-clear",
            "02n" : "wi-night-cloudy",
            "03n" : "wi-cloudy",
            "04n" : "wi-cloudy",
            "09n" : "wi-showers",
            "10n" : "wi-night-rain",
            "11n" : "wi-thunderstorm",
            "13n" : "wi-snow",
            "50n" : "wi-fog"
        };

        return function (input) {
            return iconMapping[input];
        };
    });
