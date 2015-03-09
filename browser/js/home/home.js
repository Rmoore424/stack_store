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

    $scope.addToCart = function(product) {
        var currentCart = JSON.parse($kookies.get('cart'));
        currentCart.items.push({item: product._id, quantity: 1});

		CartFactory.updateCart(currentCart).then(function(cart) {
             $kookies.set('cart', JSON.stringify(cart), {path: '/'});
             //var ourCart = JSON.parse($kookies.get('cart'));
		 });
	};

});
