/**
 * MUST use inline injection notation to prevent uglification breaking the dependency injection.
 */
angular.module('weatherapp')
    .controller('WeatherController', ["$scope", "$location", "weatherService", function ($scope, $location, weatherService) {
        'use strict';

        $scope.units   = "metric";
        $scope.city    = $location.path().replace(/^\/|\/$/g, '');
        $scope.coords  = "";
        $scope.data    = {};

        $scope.setData = function (data) {
            $scope.resetData();

            var today     = data[0];
            var forecasts = data[1];

            $scope.data.today  = today;
            $scope.data.period = (today.dt > today.sys.sunset || today.dt < today.sys.sunrise) ? "night" : "day";

            forecasts.list.shift();
            $scope.data.forecasts = forecasts.list;
        };

        $scope.resetData = function () {
            $scope.data.weather = $scope.data.forecasts = $scope.data.error = undefined;
        };

        $scope.fetchData = function () {
            var by = "";

            if ($scope.coords) {
                by = 'getByGeoCoords';
            }

            // Higher precedence for city, because city is user input.
            if ($scope.city) {
                by = 'getByCityName';
            }

            if (!by) {
                return;
            }

            $scope.city && $location.path('/' + $scope.city);

            weatherService[by]($scope.city, $scope.units).then($scope.setData);
        };

        $scope.toC = function () {
            $scope.units = "metric";
            $scope.fetchData();
        };

        $scope.toF = function () {
            $scope.units = "imperial";
            $scope.fetchData();
        };

        /**
         * If no city provided, display user's local weather.
         * Uses HTML5 Geo-location API to get user's coordinates.
         */
        if (!$scope.city) {
             ("geolocation" in navigator) && navigator.geolocation.getCurrentPosition(function (position) {
                $scope.coords = position.coords;
                $scope.fetchData();
            });
        } else {
            $scope.fetchData();
        }
    }]);
