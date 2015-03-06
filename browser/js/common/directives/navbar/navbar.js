'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        controller: 'NavController',
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});

app.controller('NavController', function ($scope, MakeCategoryFactory, HomeFactory) {
    console.log($scope);

    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'About', state: 'about'},
    ];

    $scope.userOptions = [
        { label: 'My Account', state: 'myAccount'},
        { label: 'My Orders', state: 'myOrders'},
        { label: 'Log Out', state: 'login', click: 'logoutUser()'}
    ];

    $scope.generalOptions = [
        { label: 'Checkout', state: 'checkout'},
        { label: 'Log In', state: 'login'},
        { label: 'Sign Up', state: 'signup'}
    ];

    MakeCategoryFactory.getCategories().then(function (categories) {
        $scope.categories = categories;
    });
//should probably go in MainController
    $scope.vacationsByCategory = function(categoryId) {
      HomeFactory.getVacationsByCategory(categoryId).then(function (vacations) {
        HomeFactory.vacations = vacations;
      });
    };
});

app.factory('NavFactory', function (AuthService) {
    return {
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