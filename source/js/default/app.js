(function () {
    'use strict';

    window.App = angular
        .module('weatherapp', ['ngRoute'])
        .config(["$routeProvider", function ($routeProvider) {
            'use strict';

            $routeProvider
                .when('/:city?', {
                    controller: 'WeatherController as weatherVm',
                    templateUrl: 'module/weather.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
        .constant('FLICKR_API_URL', 'https://api.flickr.com/services/rest')
        .constant('FLICKR_API_KEY', '8c74a14f2db1073a01ab404ca9275166')
        .constant('FORECASE_API_URL', 'https://api.forecast.io/forecast/4891dee8e0ca9cf8fdb7ad6dd07fef9f')
        .constant('GEOCODING_API_URL', 'https://maps.googleapis.com/maps/api/geocode/json')
    ;
})();
