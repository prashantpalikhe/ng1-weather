(function () {
    'use strict';

    App.controller('WeatherController', WeatherController);

    function WeatherController($scope, $location, $routeParams, weatherService) {
        $scope.units   = "metric";
        $scope.coords  = "";
        $scope.data    = {};

        $scope.city = $routeParams.city || '';

        $scope.fetchData = fetchData;

        $scope.$watch('units', fetchData);

        function setData (data) {
            resetData();

            var today     = data[0];
            var forecasts = data[1];

            $scope.data.today  = today;
            $scope.data.period = (today.dt > today.sys.sunset || today.dt < today.sys.sunrise) ? "night" : "day";

            forecasts.list.shift();
            $scope.data.forecasts = forecasts.list;
        }

        function resetData () {
            $scope.data.today = $scope.data.forecasts = $scope.data.error = undefined;
        }

        function fetchData () {
            console.log('Fetching weather data...');

            if ($scope.city) {
                $location.path('/' + $scope.city);
                return weatherService.getByCityName($scope.city, $scope.units).then(setData);
            }

            if ($scope.coords) {
                return weatherService.getByGeoCoords($scope.coords, $scope.units).then(setData);
            } else {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.coords = position.coords;
                    fetchData();
                });
            }
        }
    }
})();
