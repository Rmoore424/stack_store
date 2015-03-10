'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, $kookies, CartFactory, AuthService, $window, CheckoutFactory) {

	AuthService.getLoggedInUser().then(function(user) {
		$scope.user = user;
		CartFactory.getUserCart(user).then(function(cart) {
			//need to get access to the total price 
			//i set up code in the model but commented out for now
			//or can we get it on the front end somehow more easily?
			//if we set the cart like below we still need to calculate total bc
			$scope.cart = cart;
		})
	});

	$scope.stripeCallback = function (code, result) {
	    if (result.error) {
	        $window.alert('it failed! error: ' + result.error.message);
	    } else {
	        $window.alert('success! token: ' + result.id);
	        CheckoutFactory.createOrder(result, $scope.cart).then(function (order) {
	        	console.log("stripeCallback called, order:", order);
	        })

	    }
	};
});