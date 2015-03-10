'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/:name/:id',
		params: { id: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});
});

app.controller('VacationPgCtrl', function ($scope, $cookieStore, $stateParams, $state, VacationsFactory, ReviewFactory, CartFactory) {
	var cart = $cookieStore.get('cart');
	console.log(cart);

	VacationsFactory.getOneVacation($stateParams.name).then(function(vacation) {
		$scope.vacation = vacation;
	});

	$scope.add = function (productToAdd) {
		var inCart = false;
		var addedItem = {item: productToAdd._id, quantity: 1};

		cart.items.forEach(function (item, idx) {
			if (item.item == productToAdd._id) {
				item.quantity += 1;
				inCart = true;
				$cookieStore.put('cart', cart);
				
				CartFactory.updateCart(cart._id, item, idx).then(function () {
					$state.go('cart');
				});
			}
		});

		if (!inCart) {
			cart.items.push(addedItem);
			//cart = JSON.stringify($scope.cart);
			$cookieStore.put('cart', cart);
			
			CartFactory.addToCart(cart._id, addedItem).then(function () {
				$state.go('cart');
			});

		}
	};
	
	var setUpReviews = function (){
	    ReviewFactory.getReviews($stateParams.id).then(function (returnedReviews){
	        $scope.reviews = returnedReviews;
	    });
	};

	setUpReviews();
});
