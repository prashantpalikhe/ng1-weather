(function () {
    'use strict';

    App.controller('WeatherController', WeatherController);

    function WeatherController($scope, $location, $routeParams, weatherService) {
        $scope.config = weatherService.config;

        $scope.coords  = "";
        $scope.city = $routeParams.city || '';
        $scope.data = {};

        $scope.fetchData = fetchData;

        $scope.$watch('config.units', fetchData);

        function setData (data) {
            angular.extend($scope.data, data);

            $scope.data.loaded = true;
        }

        function fetchData () {
            $scope.data.loaded  = false;

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
