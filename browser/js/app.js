'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'angular-carousel']);

app.controller('MainController', function ($scope, $state, AuthService, UserFactory) {
    //$kookies.set('cookie', 'stackation', { expires: 2000000, path: '/'});

    $scope.isLoggedIn = false;
    $scope.isAdmin = false;
    UserFactory.validateUser().then(function (responseObj) {
        if (responseObj) {
            $scope.isLoggedIn = true;
            if (responseObj.user.admin) {
                $scope.isAdmin = true;
            }
        }
    });
    //not necessary but we can use this for something
    $scope.$on('auth-login-success', function (event, args) {
        alert("Login Successful!");
    });

    $scope.logoutUser = function () {
        AuthService.logout();
        $scope.isLoggedIn = false;
    };

    $scope.loginUser = function (user) {
        AuthService.login(user).then(function (response) {
            console.log(response);
            $scope.isLoggedIn = true;
            $state.go('home');
        });
    };
});

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});