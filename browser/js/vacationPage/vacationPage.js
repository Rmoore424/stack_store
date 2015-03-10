'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/:name/:id',
		params: { id: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});

    $stateProvider.state('vacation.review', {
        templateUrl: 'js/makeReview/makeReview.html'
    });
});

app.controller('VacationPgCtrl', function ($scope, $kookies, $stateParams, $state, VacationsFactory, ReviewFactory, AuthService, CartFactory) {
	$scope.cart = JSON.parse($kookies.get('cart'));

	AuthService.getLoggedInUser().then(function (responseObj) {
		if (responseObj) {
			if(responseObj.user) {
				$scope.user = responseObj.user;
			}
		}
	});

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

	$scope.getReviewPage = function () {
		$state.go('vacation.review');
	};
	
    $scope.leaveReview = function (vacationId, userId, rating, review) {
        rating = Number(rating);
        ReviewFactory.createReview(vacationId, userId, rating, review).then(function (review) {
        	setUpReviews();
        });
    };

	var setUpReviews = function (){
	    ReviewFactory.getReviews($stateParams.id).then(function (returnedReviews){
	        $scope.reviews = returnedReviews;
	    });
	};

	setUpReviews();
});
