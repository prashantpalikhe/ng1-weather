/*global angular */

/**
 * The main weather app module
 *
 * @type {angular.Module}
 */
var app = angular.module('weatherapp', [])
    .filter('climacon', function () {
        'use strict';

        var iconMapping = {
            "01d" : "sun" ,
            "02d" : "cloudSun",
            "03d" : "cloud",
            "04d" : "cloud",
            "09d" : "cloudDrizzleSun",
            "10d" : "cloudRainSun",
            "11d" : "cloudLightning",
            "13d" : "cloudSnow",
            "50d" : "cloudFog",
            "01n" : "moon",
            "02n" : "cloudMoon",
            "03n" : "cloud",
            "04n" : "cloud",
            "09n" : "cloudDrizzleMoon",
            "10n" : "cloudRainMoon",
            "11n" : "cloudLightning",
            "13n" : "cloudSnow",
            "50n" : "cloudFog"
        };

        return function (input) {
            return iconMapping[input];
        };
    });
