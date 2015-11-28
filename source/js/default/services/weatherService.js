(function () {
    'use strict';

    App.factory('weatherService', weatherService);

    function weatherService($http, $q, OWM_API_URL, OWM_API_KEY) {
        return {
            getByCityName: getByCityName,
            getByGeoCoords: getByGeoCoords
        };

        function getByCityName(city, units) {
            var weatherUrl  = '/weather?q=' + city + '&units=' + units;
            var forecastUrl = '/forecast/daily/?q=' + city + '&units=' + units + '&count=7';

            return get([weatherUrl, forecastUrl]);
        }

        function getByGeoCoords(coords, units) {
            var weatherUrl  = '/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=' + units;
            var forecastUrl = '/forecast/daily?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=' + units;

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
                var today = data[0];
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
