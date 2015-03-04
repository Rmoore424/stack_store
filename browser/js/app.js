'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'angular-carousel']);

app.controller('MainController', function ($scope) {

    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'My Cart', state: 'mycart' },
        { label: 'Make Vacation', state: 'makeVacation'},
        { label: 'Checkout', state: 'checkout'}
    ];

    $scope.rightMenu = [
        { label: 'Log In', state: 'login' },
        { label: 'Sign Up', state: 'signup'}
    ]

});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});