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

app.controller('NavController', function ($scope, NavFactory, MakeCategoryFactory, HomeFactory) {
    
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

    //$scope.nav = NavFactory;

    CategoriesFactory.getCategories().then(function (categories) {
        $scope.categories = categories;
    });

    $scope.vacationsByCategory = function(categoryId) {
      VacationsFactory.getVacationsByCategory(categoryId).then(function (vacations) {
        HomeFactory.vacations = vacations;
      })
    }
});