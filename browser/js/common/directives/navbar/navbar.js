'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        controller: 'NavController',
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});

app.controller('NavController', function ($scope, $state, VacationsFactory, CategoriesFactory, HomeViewFactory) {
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

    $scope.adminOptions = [
        { label: 'Make Vacation', state: 'makeVacation'}
    ];

    CategoriesFactory.getCategories().then(function (categories) {
        $scope.categories = categories;
    });

    $scope.getVacationsByCategory = function(categoryId) {
      VacationsFactory.getVacationsByCategory(categoryId).then(function (vacations) {
        HomeViewFactory.vacations = vacations;
        $state.go('home');
      });
    };

});
        //vacationsByCategory needs to be changed as well -RICH
        //should probably go in MainController

        // setUser: function () {
        //      var self = this;
        //      AuthService.getLoggedInUser().then(function (user) {
        //         if (user) {
        //             self.loggedIn = true;
        //         }
        //      });
        // }
