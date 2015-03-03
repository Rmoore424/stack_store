'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'js/login/login.html'
    });
});

app.controller('LoginController', function ($scope, $state, AuthService) {

    // need to determine whether state change belongs in a diff module
    $scope.loginUser = function (user) {
        AuthService.login(user).then(function (response) {
            $state.go('home');
            //if (response.user) {
            //} else {
            //}
        });
    };


});