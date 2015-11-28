(function () {
    'use strict';

    App.factory('weatherService', weatherService);

    function weatherService($http, $q, OWM_API_URL, OWM_API_KEY) {
        var config = {
            units: 'metric'
        };

        return {
            config         : config,
            getByCityName  : getByCityName,
            getByGeoCoords : getByGeoCoords
        };

        function getByCityName(city) {
            var weatherUrl  = '/weather?q=' + city + '&units=' + config.units;
            var forecastUrl = '/forecast/daily/?q=' + city + '&units=' + config.units + '&count=7';

            return get([weatherUrl, forecastUrl]);
        }

        function getByGeoCoords(coords) {
            var weatherUrl  = '/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=' + config.units;
            var forecastUrl = '/forecast/daily?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=' + config.units;

            return get([weatherUrl, forecastUrl]);
        }

        function get (urls) {
            var promises = urls.map(function (url) {
                url = OWM_API_URL + url + '&APPID=' + OWM_API_KEY;

                return $http
                    .get(url)
                    .then(function (response) {
                        if (parseInt(response.data.cod, 10) === 200) {
                            return response.data;
                        }

                        throw new Error('Could not load weather data');
                    });
            });

            return $q.all(promises).then(function (data) {
                var today     = data[0];
                var forecasts = data[1].list;

                forecasts.shift();

                return {
                    today     : today,
                    forecasts : forecasts,
                    period    : (today.dt > today.sys.sunset || today.dt < today.sys.sunrise) ? "night" : "day"
                };
            });
        }
    }
})();
