'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'angular-carousel', 'ngKookies', 'angularPayments']);

app.controller('MainController', function ($scope, $state, $kookies, AuthService, UserFactory, CartFactory, $window) {
    //$kookies.set('cookie', 'stackation', { expires: 2000000, path: '/'});

    $scope.isLoggedIn = false;
    $scope.isAdmin = false;

    UserFactory.validateUser().then(function (responseObj) {
        if (responseObj) {
            $scope.isLoggedIn = true;
            CartFactory.getUserCart(responseObj.user).then(function (cart) {
                $kookies.set('cart', JSON.stringify(cart), {path: '/'});
           });
            if (responseObj.user.admin) {
                $scope.isAdmin = true;
            }
        }
        
    }, function (err) {
            if (err.status === 401) {
                CartFactory.createCart().then(function (cart) {
                    $kookies.set('cart', JSON.stringify(cart), {path: '/'});
                });
            }
        }
    );
    //not necessary but we can use this for something
    $scope.$on('auth-login-success', function (event, args) {
        alert("Login Successful!");
    });

    $scope.logoutUser = function () {
        AuthService.logout();
        $scope.isLoggedIn = false;
        $scope.isAdmin = false;
    };

    $scope.loginUser = function (user) {
        AuthService.login(user).then(function (returnedUser) {
            if (returnedUser) {
                $scope.isLoggedIn = true;
                CartFactory.getUserCart(returnedUser).then(function (cart) {
                    $kookies.set('cart', JSON.stringify(cart), {path: '/'});
                    $state.go('home');
                });
            }
            if (returnedUser.admin) {
                $scope.isAdmin = true;
            }
        });
    };
});

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});