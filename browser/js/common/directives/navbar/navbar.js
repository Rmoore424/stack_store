'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        scope: {
          items: '='
        },
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});

app.controller('NavController', function ($scope, NavFactory, MakeCategoryFactory) {
    
    $scope.userOptions = [
        { label: 'My Account', state: 'myAccount'},
        { label: 'My Orders', state: 'myOrders'},
        { label: 'Log Out', state: 'login'}
    ];

    $scope.generalOptions = [
        { label: 'Checkout', state: 'checkout'},
        { label: 'Log In', state: 'login'},
        { label: 'Sign Up', state: 'signup'}
    ];

    $scope.nav = NavFactory;

    MakeCategoryFactory.getCategories().then(function (categories) {
        $scope.categories = categories;
    })
})

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