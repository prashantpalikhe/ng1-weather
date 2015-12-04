(function () {
    'use strict';

    App.factory('flickrService', flickrService);

    function flickrService($http, $q, $httpParamSerializer, FLICKR_API_URL, FLICKR_API_KEY) {
        var cache = {};

        return {
            searchPhoto: searchPhoto
        };

        function searchPhoto(coords) {
            var normalizedCoords;

            coords = {
                lat: coords.lat,
                lon: coords.lng
            };

            normalizedCoords = coords.lat + ''.replace('.', '') + coords.lng + ''.replace('.', '');

            if (cache[normalizedCoords]) {
                return $q.when(cache[normalizedCoords], getPhotoUrl);
            }

            return get('flickr.photos.search', coords).then(function (response) {
                cache[normalizedCoords] = response.data.photos;

                return getPhotoUrl(cache[normalizedCoords])
            });
        }

        function getPhotoUrl(photos) {
            var randomIndex = Math.floor(Math.random() * ((photos.photo.length - 1) + 1));

            var photo = photos.photo[randomIndex];
            return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
        }

        function get(method, params) {
            return $http.get(FLICKR_API_URL + '/?method=' + method + '&api_key=' + FLICKR_API_KEY + '&format=json&&nojsoncallback=1&' + $httpParamSerializer(params));
        }
    }
})();
