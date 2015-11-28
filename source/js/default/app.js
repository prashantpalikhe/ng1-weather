(function () {
    'use strict';

    window.App = angular
        .module('weatherapp', ['ngRoute'])
        .config(["$routeProvider", function ($routeProvider) {
            'use strict';

            $routeProvider.when('/', {
                controller: 'WeatherController',
                templateUrl: 'module/weather.html'
            }).when('/:city', {
                controller: 'WeatherController',
                templateUrl: 'module/weather.html'
            }).otherwise({
                redirectTo: '/'
            });
        }])
        .constant('OWM_API_URL', 'http://api.openweathermap.org/data/2.5')
        .constant('OWM_API_KEY', '909876c41f18d47b83800fdcad715819')

})();
