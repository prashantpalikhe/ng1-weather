(function () {
    'use strict';

    App.directive('skycon', skyconDirective);

    function skyconDirective() {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var skycon = new Skycons({'color': 'white'});

                skycon.set(elem[0], scope.$eval(attrs.icon));
                skycon.play();

                scope.$on('$destroy', function () {
                    skycon.remove(elem[0]);
                });
            }
        }
    }
})();
