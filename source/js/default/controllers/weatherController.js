(function () {
    'use strict';

    App.controller('WeatherController', WeatherController);

    function WeatherController($scope, $location, $routeParams, weatherService, flickrService) {
        $scope.config = weatherService.config;

        $scope.coords  = "";
        $scope.city = $routeParams.city || '';
        $scope.weatherData = {};
        $scope.photoData = {};

        $scope.fetchData = fetchData;

        $scope.$watch('config.units', fetchData);

        function setData (data) {
            angular.extend($scope.weatherData, data);
            $scope.weatherData.loaded = true;

            setPhoto(data.today.coord);
        }

        function setPhoto(coords) {
            flickrService.searchPhoto(coords).then(function (photoUrl) {
                $scope.photoData.url = photoUrl;
                $scope.photoData.loaded = true;
            });
        }

        function fetchData () {
            $scope.weatherData.loaded = false;
            $scope.photoData.loaded = false;

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
