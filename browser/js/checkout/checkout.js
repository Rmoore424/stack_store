'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, $cookieStore, CartFactory, AuthService, $window, CheckoutFactory) {

	var cart;
	AuthService.getLoggedInUser().then(function(user) {
		$scope.user = user;
		//$cookies.getObject('cart');
		cart = $cookieStore.get('cart');
		CartFactory.getItems(cart)
    	.then( function(items) {
    		$scope.total = MathFactory.getTotalPrice(items)
    	});
	});

	$scope.stripeCallback = function (code, result) {
	    if (result.error) {
	        $window.alert('it failed! error: ' + result.error.message);
	    } else {
	        $window.alert('Processing... wait a moment...');
	        OrderFactory.createOrder(result, cart, $scope.total).then(function (order) {
	        	console.log("stripeCallback called, order:", order);
	        	CartFactory.clearCart(cart._id).then(function(emptyCart) {
	        		$cookieStore.put('cart', emptyCart);
	        		cart = emptyCart;
	        	});
	        	$state.go('order-confirmation', {id: order._id});
	        });
	    }
	};
});