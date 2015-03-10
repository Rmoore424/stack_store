'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/:name/:id',
		params: { id: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});
});

app.controller('VacationPgCtrl', function ($scope, $kookies, $stateParams, $state, VacationsFactory, ReviewFactory, CartFactory) {
	$scope.cart = JSON.parse($kookies.get('cart'));

	VacationsFactory.getOneVacation($stateParams.name).then(function(vacation) {
		$scope.vacation = vacation;
	});

	$scope.add = function (productToAdd) {
		var inCart = false;
		var addedItem = {item: productToAdd._id, quantity: 1};
		var cart;

		$scope.cart.items.forEach(function (item, idx) {
			if (item.item == productToAdd._id) {
				item.quantity += 1;
				inCart = true;
				cart = JSON.stringify($scope.cart);
				$kookies.set('cart', cart, {path: '/'});
				
				CartFactory.updateCart($scope.cart._id, item, idx).then(function () {
					$state.go('cart');
				});
			}
		});

		if (!inCart) {
			$scope.cart.items.push(addedItem);
			cart = JSON.stringify($scope.cart);
			$kookies.set('cart', cart, {path: '/'});
			
			CartFactory.addToCart($scope.cart._id, addedItem).then(function () {
				$state.go('cart');
			});

		}
	};
	
	var setUpReviews = function (){
	    ReviewFactory.getReviews($stateParams.id).then(function (returnedReviews){
	        $scope.reviews = returnedReviews;
	    });
	};

	$scope.showReviewTextBox = function () {
		$scope.showReviewForm = true;
	};

	$scope.leaveReview = function (vacationId) {

	}

	setUpReviews();
});
