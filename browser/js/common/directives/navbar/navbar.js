'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        scope: {
          items: '=',
          rightItems: '='
        },
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});