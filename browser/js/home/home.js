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
    $scope.addToCart = function(product) {
        var currentCart = JSON.parse($kookies.get('cart'));
        console.log(currentCart.items);
        currentCart.items.push({item: product._id, quantity: 1});

		CartFactory.updateCart(currentCart).then(function(cart) {
             $kookies.set('cart', JSON.stringify(cart), {path: '/'});
		 });
	};

});
