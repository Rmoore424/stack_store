'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $state, $kookies, HomeViewFactory, VacationsFactory, CartFactory) {
	$scope.homeView = HomeViewFactory;

    VacationsFactory.getVacations().then(function (vacations) {
        HomeViewFactory.vacations = vacations;
    });

    $scope.showCurrentVacation = function(vacation) {
		$state.go('vacation', { id: vacation._id });
	};	

    //maybe goes on main controller so VacationPgCtrl can access it too
    $scope.add = function(product) {
        CartFactory.addToCart(product);
	};

});
