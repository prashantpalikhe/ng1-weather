(function () {
    'use strict';

    angular
        .module('weatherapp')
        .factory('geoLocator', geoLocator);

    function geoLocator($q) {
        return {
            getCurrentCoords: getCurrentCoords
        };

        function getCurrentCoords() {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function (position) {
                deferred.resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });

            return deferred.promise;
        }
    }
})();