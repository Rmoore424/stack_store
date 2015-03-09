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
				var cartFromKookies = JSON.parse($kookies.get('cart'));
	     		var cartId = cartFromKookies._id;	
	     		CartFactory.setUserCart(cartId, responseObj.user).then(function (cart) {
	     			alert('Signup Successful');
	     			cart = JSON.stringify(cart);
	     			$kookies.set('cart', cart, {path: '/'});
				 	$state.go('login');
				 });
	     	}
	});
};