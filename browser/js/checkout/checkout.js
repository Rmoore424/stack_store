'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, $cookieStore, CartFactory, AuthService, $window, OrderFactory, MathFactory, PromoFactory) {

	var cart;
	AuthService.getLoggedInUser().then(function(responseObj) {
		if (responseObj.user) {
			$scope.user = responseObj.user;
		}
			cart = $cookieStore.get('cart');
			CartFactory.getItems(cart)
	    	.then( function(items) {
	    		$scope.total = MathFactory.getTotalPrice(items)
	    		$scope.finalTotal = $scope.total;
    	});
	});

	$scope.invalidCode = false;
	

	$scope.applyPromo = function (code) {
			console.log("applyPromo called", PromoFactory.promoCheck(code));
			if (PromoFactory.promoCheck(code)) {
				$scope.finalTotal = $scope.total - ($scope.total/10);
				console.log("new total", $scope.total);
			}
			else {
				invalidCode = true;
			}
	}


	$scope.stripeCallback = function (code, result) {
	    if (result.error) {
	        $window.alert('it failed! error: ' + result.error.message);
	    } else {
	        $window.alert('Processing... wait a moment...');
	        OrderFactory.createOrder(result, cart, $scope.finalTotal).then(function (order) {
	        	CartFactory.clearCart(cart._id).then(function(emptyCart) {
	        		$cookieStore.put('cart', emptyCart);
	        		cart = emptyCart;
	        	});
	        	$state.go('order-confirmation', {id: order._id});
	        });
	    }
	};
});