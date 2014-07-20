/**
 * MUST use inline injection notation to prevent uglification breaking the app.
 */
angular.module('weatherapp')
    .controller('WeatherController', ["$scope", "$location", "weatherService", function ($scope, $location, weatherService) {
        'use strict';

        $scope.units   = "metric";
        $scope.city    = $location.path().replace(/^\/|\/$/g, '');
        $scope.data    = {};

        $scope.resetData = function () {
            $scope.data.weather = $scope.data.forecasts = $scope.data.error = undefined;
        };

        $scope.fetchData = function () {
            if (!$scope.city) {
                return;
            }

            $location.path('/' + $scope.city);

            $scope.resetData();

            weatherService.getByCityName($scope.city, $scope.units).then(function (data) {
                var today     = data[0];
                var forecasts = data[1];

                $scope.data.today  = today;
                $scope.data.period = (today.dt > today.sys.sunset || today.dt < today.sys.sunrise) ? "night" : "day";


                forecasts.list.shift();
                $scope.data.forecasts = forecasts.list;
            });
        };

        $scope.toC = function () {
            $scope.units = "metric";
            $scope.fetchData();
        };

        $scope.toF = function () {
            $scope.units = "imperial";
            $scope.fetchData();
        };

        if (!$scope.city && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.coords = position.coords;
                weatherService.getByGeoCoords($scope.coords, $scope.units).then(function (data) {
                    var today     = data[0];
                    var forecasts = data[1];

                    $scope.data.today  = today;
                    $scope.data.period = (today.dt > today.sys.sunset || today.dt < today.sys.sunrise) ? "night" : "day";


                    forecasts.list.shift();
                    $scope.data.forecasts = forecasts.list;
                });
            });
        } else {
            $scope.fetchData();
        }
    }]);
