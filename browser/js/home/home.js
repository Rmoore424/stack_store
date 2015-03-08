'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $state, HomeViewFactory, VacationsFactory, CartFactory) {
	$scope.homeView = HomeViewFactory;

    VacationsFactory.getVacations().then(function (vacations) {
        HomeViewFactory.vacations = vacations;
    });

    $scope.showCurrentVacation = function(vacation) {
		$state.go('vacation', { id: vacation._id });
	};	

    $scope.addToCart = function(product) {
		CartFactory.getCart().then(function(cart) {
			cart.items.push({item: product._id, quantity: 1});	
		});
	};

});
