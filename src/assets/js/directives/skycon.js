angular.module('weatherapp')
    .directive('skycon', function () {
        'use strict';

        var mapping = {
            "01d" : "clear-day" ,
            "02d" : "partly-cloudy-day",
            "03d" : "cloudy",
            "04d" : "cloudy",
            "09d" : "rain",
            "10d" : "rain",
            "11d" : "rain",
            "13d" : "snow",
            "50d" : "fog",
            "01n" : "clear-night",
            "02n" : "partly-cloudy-night",
            "03n" : "cloudy",
            "04n" : "cloudy",
            "09n" : "rain",
            "10n" : "rain",
            "11n" : "rain",
            "13n" : "snow",
            "50n" : "fog"
        };

        var skycon = new Skycons({'color': 'white'});

        return {
            restrict: 'A',
            scope: {
                icon: '='
            },
            link: function (scope, elem, attrs) {
                skycon.set(elem[0], mapping[scope.icon]);
                skycon.play();
            }
        }
    });
