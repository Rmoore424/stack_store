'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupController',
		templateUrl: 'js/signup/signup.html'
	});
});


app.controller('SignupController', function ($scope, $state, $kookies, CartFactory, UserFactory) {
	$scope.signup = function (user) {
		UserFactory.createUser(user).then(function (responseObj) {
			if (responseObj.error) {
				alert(responseObj.error);
			}
			else {
				var cart = JSON.parse($kookies.get('cart'));
	     		var cartId = cart._id;	
	     		CartFactory.setUserCart(cartId, responseObj.user).then(function (cart) {
	     			alert('Signup Successful');
	     			$kookies.set('cart', JSON.stringify(cart), {path: '/'});
				 	$state.go('login');
				 });
	     	}
		});
	};
});