'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'angular-carousel', 'ngCookies', 'angularPayments']);

app.controller('MainController', function ($scope, $state, $cookieStore, AuthService, UserFactory, UserStatusFactory, CartFactory) {

    $scope.userStatus = UserStatusFactory;

    AuthService.getLoggedInUser().then(function (user) {
        if (user) {
            UserStatusFactory.isLoggedIn = true;
            CartFactory.getUserCart(user).then(function (cart) {
                $cookieStore.put('cart', cart);
           });
            if (user.admin) {
                UserStatusFactory.isAdmin = true;
            }
        }
        else {
            CartFactory.createCart().then(function (cart) {
                $cookieStore.put('cart', cart);
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
        UserStatusFactory.isLoggedIn = false;
        UserStatusFactory.isAdmin = false;
        $cookieStore.remove('cart');
         CartFactory.createCart().then(function (cart) {
            $cookieStore.put('cart', cart);
         });
    };

$scope.loginUser = function (user) {
        AuthService.login(user).then(function (returnedUser) {
            if (returnedUser.email) {
                UserStatusFactory.isLoggedIn = true;
                CartFactory.getUserCart(returnedUser).then(function (cart) {
                    //cart = JSON.stringify(cart);
                    $cookieStore.put('cart', cart);
                    $state.go('home');
                });
                if (returnedUser.admin) {
                    UserStatusFactory.isAdmin = true;
                }
            }
            else {
                $scope.failedAttempt = true;
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