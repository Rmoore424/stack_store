'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'js/login/login.html'
    });

});

app.controller('LoginController', function ($scope, $state, LoginFactory) {

    // need to determine whether state change belongs in a diff module
    $scope.loginUser = function (user) {
        console.log('loginUser called');
        LoginFactory.authenticateUser(user).then(function (response) {
            //this is not working it's not going home
            $state.go('home');
        });
    };


});

app.factory('LoginFactory', function($http) {
    return {
        authenticateUser: function (user) {
            return $http.post('/login', user).then(function (response) {
                console.log("authenticateUser called", user);
                return response.data;
            });
        }

    };
});