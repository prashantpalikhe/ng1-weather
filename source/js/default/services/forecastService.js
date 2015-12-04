(function () {
    'use strict';

    App.factory('forecastService', forecastService);

    function forecastService($http, FI_API_URL, GEOCODING_API_URL) {
        var config = {
            units: 'uk'
        };

        return {
            config               : config,
            getForecastByAddress : getForecastByAddress,
            getForecastByCoords  : getForecastByCoords
        };

        function getForecastByAddress(address) {
            return getGeoCodeForAddress(address)
                .then(function (response) {
                    var geoCode = response.data.results[0];
                    return getForecastByCoords(geoCode.geometry.location, geoCode.formatted_address);
                });

        }

        function getForecastByCoords(coords, address) {
            return $http
                .jsonp(FI_API_URL + '/' + coords.lat + ',' + coords.lng + '?units=' + config.units + '&exclude=minutely,hourly,alerts,flags&callback=JSON_CALLBACK')
                .then(function (response) {
                    var dailyData = response.data.daily.data;
                    var today = dailyData.shift();

                    dailyData.pop();

                    return {
                        coords    : coords,
                        current   : response.data.currently,
                        today     : today,
                        forecasts : dailyData,
                        address   : address
                    };
                });

        }

        function getGeoCodeForAddress(address) {
            return $http.get(GEOCODING_API_URL + '?address=' + address);
        }
    }
})();
