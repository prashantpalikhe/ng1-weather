angular.module('weatherapp')
    .factory('weatherService', ["$http", "$q", function ($http, $q) {
        'use strict';

        var BASE_URL = 'http://api.openweathermap.org/data/2.5/';

        var get = function (urls) {
            var promises = urls.map(function (url) {
                var deferred = $q.defer();

                $http.get(url)
                    .success(function (data) {
                        if (data.cod == 200) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject();
                        }
                    })
                    .error(function (error) {
                        deferred.reject();
                    });

                return deferred.promise;
            });

            return $q.all(promises);
        };

        return {
            getByCityName: function (city, units) {
                var weatherUrl  = BASE_URL + 'weather?q=' + city + '&units=' + units;
                var forecastUrl = BASE_URL + 'forecast/daily/?q=' + city + '&units=' + units + '&count=7';

                return get([weatherUrl, forecastUrl]);
            },
            getByGeoCoords: function (coords, units) {
                var weatherUrl  = BASE_URL + 'weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=' + units;
                var forecastUrl = BASE_URL + 'forecast/daily?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=' + units + '&count=7';

                return get([weatherUrl, forecastUrl]);
            }
        };
    }]);
