(function () {
    'use strict';

    angular
        .module('weatherapp')
        .controller('WeatherController', WeatherController);

    function WeatherController($scope, $location, $routeParams, geoLocator, forecastService, flickrService) {
        var vm = this;

        vm.config = forecastService.config;

        vm.city = $routeParams.city || '';
        vm.weatherData = null;
        vm.photoUrl = '';

        vm.fetchData = fetchData;

        $scope.$watch('weatherVm.config.units', function () {
            fetchData();
        });

        function setData (data) {
            vm.weatherData = data;

            setPhoto(data.coords);
        }

        function setPhoto(coords) {
            flickrService.searchPhoto(coords).then(function (photoUrl) {
                vm.photoUrl = photoUrl;
            });
        }

        function fetchData (coords) {
            vm.weatherData = null;
            vm.photoUrl = '';

            if (vm.city) {
                $location.path('/' + vm.city);
                return forecastService.getForecastByAddress(vm.city).then(setData);
            }

            if (coords) {
                return forecastService.getForecastByCoords(coords, $scope.units).then(setData);
            } else {
                geoLocator.getCurrentCoords().then(fetchData);
            }
        }
    }
})();
