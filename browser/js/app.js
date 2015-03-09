'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'angular-carousel', 'ngKookies']);

app.controller('MainController', function ($scope, $state, $kookies, AuthService, UserFactory, CartFactory) {
    //$kookies.set('cookie', 'stackation', { expires: 2000000, path: '/'});

    $scope.isLoggedIn = false;
    $scope.isAdmin = false;

    AuthService.getLoggedInUser().then(function (user) {
        if (user) {
            $scope.isLoggedIn = true;
            CartFactory.getUserCart(user).then(function (cart) {
                cart = JSON.stringify(cart);
                $kookies.set('cart', cart, {path: '/'});
           });
            if (user.admin) {
                $scope.isAdmin = true;
            }
        }
        else {
            CartFactory.createCart().then(function (cart) {
                cart = JSON.stringify(cart);
                $kookies.set('cart', cart, {path: '/'});

            });
        }
        
    });
    //not necessary but we can use this for something
    // $scope.$on('auth-login-success', function (event, args) {
    //     alert("Login Successful!");
    // });

    $scope.$on('auth-login-failed', function (event, args) {
        $scope.failedAttempt = true;
    });

     $scope.$on('auth-login-success', function (event, args) {
        $scope.failedAttempt = false;
    });

    $scope.logoutUser = function () {
        AuthService.logout();
        $scope.isLoggedIn = false;
        $scope.isAdmin = false;
    };

    $scope.loginUser = function (user) {
        AuthService.login(user).then(function (response) {
            if (response.email) {
                $scope.isLoggedIn = true;
                CartFactory.getUserCart(response).then(function (cart) {
                    cart = JSON.stringify(cart);
                    $kookies.set('cart', cart, {path: '/'});
                    $state.go('home');
                });
                if (response.admin) {
                    $scope.isAdmin = true;
                }
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