'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, $kookies, CartFactory, AuthService, $window, OrderFactory, MathFactory) {

	AuthService.getLoggedInUser().then(function(user) {
		$scope.user = user;
		//$cookies.getObject('cart');
		$scope.cart = JSON.parse($kookies.get('cart'));
		CartFactory.getItems($scope.cart)
    	.then( function(items) {
    		$scope.total = MathFactory.getTotalPrice(items)
    	});
	});

	$scope.stripeCallback = function (code, result) {
	    if (result.error) {
	        $window.alert('it failed! error: ' + result.error.message);
	    } else {
	        $window.alert('Processing... wait a moment...');
	        OrderFactory.createOrder(result, $scope.cart, $scope.total).then(function (order) {
	        	console.log("stripeCallback called, order:", order);
	        	CartFactory.clearCart($scope.cart._id).then(function(cart) {
	        		var parsedCart = JSON.stringify(cart);
	        		//$cookies.setObject('cart', cart)
	        		$kookies.set('cart', parsedCart, { path: '/'});
	        		$scope.cart = cart;
	        	});
	        	$state.go('order-confirmation', {id: order._id});
	        });
	    }
	};
});