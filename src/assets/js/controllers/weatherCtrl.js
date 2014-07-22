/**
 * MUST use inline injection notation to prevent uglification breaking the dependency injection.
 */
angular.module('weatherapp')
    .controller('WeatherController', ["$scope", "$location", "$routeParams", "weatherService", function ($scope, $location, $routeParams, weatherService) {
        'use strict';

        $scope.units   = "metric";
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
            $scope.data.today = $scope.data.forecasts = $scope.data.error = undefined;
        };

        $scope.fetchData = function () {
            var by, param;

            if ($scope.coords) {
                by = 'getByGeoCoords';
                param = $scope.coords;
            }

            // Higher precedence for city, because city is user input.
            if ($scope.city) {
                by = 'getByCityName';
                param = $scope.city;
            }

            if (!by) {
                return;
            }

            $scope.city && $location.path('/' + $scope.city);

            weatherService[by](param, $scope.units).then($scope.setData);
        };

        $scope.toC = function () {
            $scope.units = "metric";
            $scope.fetchData();
        };

        $scope.toF = function () {
            $scope.units = "imperial";
            $scope.fetchData();
        };

        $scope.init = function () {
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
        };

        $scope.$on('$routeChangeSuccess', function () {
            $scope.city = $routeParams.city || '';
            $scope.init();
        });
    }]);
