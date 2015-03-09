'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/vacation/:id',
		params: { id: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});
});

// app.config(function ($stateProvider) {
// 	$stateProvider.state('cart', {
// 		url: '/cart',
// 		controller: 'HomeCtrl',
// 		templateUrl: 'js/cart/cart.html'
// 	});
// });

app.controller('VacationPgCtrl', function($scope, $stateParams, $state, VacationsFactory, ReviewFactory, CartFactory) {
	VacationsFactory.getOneVacation($stateParams.id).then(function(vacation) {
		$scope.vacation = vacation;
	});

	$scope.addToCart = function(product) {
		CartFactory.getCart().then(function(cart) {
			console.log('cart', cart);
			cart.items.push({product: product._id, quantity: 1});	
		});
		$state.go('cart');

	};

	var setUpReviews = function (){
	    ReviewFactory.getReviews($stateParams.id).then(function (returnedReviews){
	        $scope.reviews = returnedReviews;
	    });
	};

	setUpReviews();
});
