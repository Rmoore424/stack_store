'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupController',
		templateUrl: 'js/signup/signup.html'
	});
});


app.controller('SignupController', function ($scope, $kookies, CartFactory, UserFactory) {
	$scope.signup = function (user) {
		UserFactory.createUser(user).then(function (user) {
			var cart = JSON.parse($kookies.get('cart'));
			console.log("kookie", cart)
     		var cartId = cart._id;	
     		CartFactory.setUserCart(cartId, user).then(function (cart) {
     			console.log('returnedCart', cart);
     			$kookies.set('cart', JSON.stringify(cart), {path: '/'});
			 })-b;
		});
	};
});