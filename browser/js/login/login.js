'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'js/login/login.html'
    });
});

app.controller('LoginController', function ($scope, $window, $state, AuthService) {
    // need to determine whether state change belongs in a diff module
    $scope.getFacebook = function () {
        $window.location.href = "auth/facebook";
    };

});