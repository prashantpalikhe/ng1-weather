(function () {
    'use strict';

    App.controller('WeatherController', WeatherController);

    function WeatherController($scope, $location, $routeParams, forecastService, flickrService) {
        $scope.config = forecastService.config;

        $scope.coords  = "";
        $scope.city = $routeParams.city || '';
        $scope.weatherData = {};
        $scope.photoData = {};

        $scope.fetchData = fetchData;

        $scope.$watch('config.units', fetchData);

        function setData (data) {
            $scope.weatherData = data;
            $scope.weatherData.loaded = true;

            setPhoto(data.coords);

            console.log($scope.weatherData);
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
                return forecastService.getForecastByAddress($scope.city).then(setData);
            }

            if ($scope.coords) {
                return forecastService.getForecastByCoords($scope.coords, $scope.units).then(setData);
            } else {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    fetchData();
                });
            }
        }
    }
})();
