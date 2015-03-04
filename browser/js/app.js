'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'angular-carousel']);

app.controller('MainController', function ($scope, NavFactory) {

    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'About', state: 'about'},
    ];

    $scope.userOptions = [
        { label: 'My Account', state: 'myAccount'},
        { label: 'My Orders', state: 'myOrders'},
        { label: 'Log Out', state: 'login'}
    ];

    $scope.adminOptions = [
        { label: 'Make Vacation', state: 'makeVacation'}
    ];

    $scope.generalOptions = [
        { label: 'Checkout', state: 'checkout'},
        { label: 'Log In', state: 'login'},
        { label: 'Sign Up', state: 'signup'}
    ];

    $scope.nav = NavFactory;
});

app.factory('NavFactory', function (AuthService) {
    return {
        loggedIn: false,
        setUser: function () {
             var self = this;
             AuthService.getLoggedInUser().then(function (user) {
                if (user) {
                    self.loggedIn = true;
                }
             });
        } 
    };
});
app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});