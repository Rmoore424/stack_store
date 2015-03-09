'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/vacation/:id',
		params: { id: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});
});

app.controller('VacationPgCtrl', function($scope, $kookies, $stateParams, $state, VacationsFactory, ReviewFactory, CartFactory) {
	VacationsFactory.getOneVacation($stateParams.id).then(function(vacation) {
		$scope.vacation = vacation;
	});

    $scope.addToCart = function(product) {
        var currentCart = JSON.parse($kookies.get('cart'));
        var inCart = false;
            currentCart.items.forEach(function (item) {
                if(item.item == product._id) {
                    item.quantity += 1;
                    inCart = true;
                }
            });

            if (!inCart) {
                currentCart.items.push({item: product._id, quantity: 1});
            }

		CartFactory.updateCart(currentCart).then(function(cart) {
             $kookies.set('cart', JSON.stringify(cart), {path: '/'});
		 });
	};

	var setUpReviews = function (){
	    ReviewFactory.getReviews($stateParams.id).then(function (returnedReviews){
	        $scope.reviews = returnedReviews;
	    });
	};

	setUpReviews();
});
