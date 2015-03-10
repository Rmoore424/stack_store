'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupController',
		templateUrl: 'js/signup/signup.html'
	});
});


app.controller('SignupController', function ($scope, $state, $kookies, CartFactory, UserFactory, UserStatusFactory) {
	
	$scope.signup = function (user) {
		UserFactory.createUser(user).then(function (responseObj) {
			if (responseObj.error) {
				$scope.duplicateUser = true;
			}
			else {
				if ($kookies.get('cart')) {
					var cart = JSON.parse($kookies.get('cart'));
		     		CartFactory.setUserCart(cart._id, responseObj.user).then(function (cart) {
		     			cart = JSON.stringify(cart);
		     			$kookies.set('cart', cart, {path: '/'});
		     			UserStatusFactory.isLoggedIn = true;
					 	$state.go('home');
					 });
				}
				else {
					CartFactory.createCart().then(function (newCart) {
						CartFactory.setUserCart(newCart._id, responseObj.user).then(function (cart) {
							cart = JSON.stringify(cart);
							$kookies.set('cart', cart, {path: '/'});
							UserStatusFactory.isLoggedIn = true;
							$state.go('home');
						});
					});
				}
	     	}
		});
	};
});