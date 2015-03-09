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
     		var cartId = cart._id;
     		CartFactory.setUserCart(cartId, user).then(function (cart) {
                cart = JSON.stringify(cart);
     			$kookies.set('cart', cart, {path: '/'});
			 });
		});
	};
});