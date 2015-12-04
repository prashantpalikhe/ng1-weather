(function () {
    'use strict';

    window.App = angular
        .module('weatherapp', ['ngRoute'])
        .config(["$routeProvider", function ($routeProvider) {
            'use strict';

            $routeProvider
                .when('/:city?', {
                    controller: 'WeatherController',
                    templateUrl: 'module/weather.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
        .constant('OWM_API_URL', 'http://api.openweathermap.org/data/2.5')
        .constant('OWM_API_KEY', '909876c41f18d47b83800fdcad715819')
        .constant('FLICKR_API_URL', 'https://api.flickr.com/services/rest')
        .constant('FLICKR_API_KEY', '8c74a14f2db1073a01ab404ca9275166')
        .constant('FI_API_KEY', '4891dee8e0ca9cf8fdb7ad6dd07fef9f')
        .factory('FI_API_URL', function (FI_API_KEY) {
            return 'https://api.forecast.io/forecast/' + FI_API_KEY;
        })
        .constant('GEOCODING_API_URL', 'https://maps.googleapis.com/maps/api/geocode/json')
    ;
})();
