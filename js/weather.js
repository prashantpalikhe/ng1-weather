angular.module('myapp', ['ngAutocomplete'])
    .controller('WeatherController', function ($scope, $http) {
        var WEATHER_API  = 'http://api.openweathermap.org/data/2.5/weather?q=';
        var FORECAST_API = 'http://api.openweathermap.org/data/2.5/forecast/daily?count=7&q=';

        $scope.data = {
            units: "metric",
            city: "",
            options: {
                country: 'nl',
                types: '(cities)'
            },
            details: ""
        };

        $scope.fetchData = function () {
            var city = $scope.data.city.substring(0, $scope.data.city.indexOf(','));

            if (!city) {
                return;
            }

            $scope.data.weather = $scope.data.forecasts = $scope.data.error = undefined;

            $scope.fetchWeather(city).fetchForecast(city);
        };

        $scope.fetchWeather = function (city) {
            var url = WEATHER_API + city + '&units=' + $scope.data.units;

            $http
                .get(url)
                .success(function (data) {
                    if (data.cod === "404") {
                        $scope.data.error = "No data found for " + $scope.data.city;
                    } else {
                        $scope.data.weather = data.main;
                    }
                });

            return $scope;
        };

        $scope.fetchForecast = function (city) {
            var url = FORECAST_API + city + '&units=' + $scope.data.units;

            $http
                .get(url)
                .success(function (data) {
                    if (data.cnt) {
                        $scope.data.forecasts = data.list;
                    }
                });

            return $scope;
        };

        $scope.toC = function () {
            $scope.data.units = "metric";
            $scope.fetchData();
        };

        $scope.toF = function () {
            $scope.data.units = "imperial";
            $scope.fetchData();
        };
    })
    .config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
