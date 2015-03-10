'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupController',
		templateUrl: 'js/signup/signup.html'
	});
});


app.controller('SignupController', function ($scope, $state, $cookieStore, CartFactory, UserFactory, UserStatusFactory, AuthService) {
	
	$scope.signup = function (user) {
		UserFactory.createUser(user).then(function (responseObj) {
			if (responseObj.error) {
				$scope.duplicateUser = true;
			}
			else {
					UserStatusFactory.isLoggedIn = true;
					if (responseObj.user.admin) {
						UserStatusFactory.isAdmin = true;
					}
				AuthService.login(user).then(function (returnedUser) {
					if ($cookieStore.get('cart')) {
						var cart = $cookieStore.get('cart');
			     		CartFactory.setUserCart(cart._id, responseObj.user).then(function (cart) {
			     			//cart = JSON.stringify(cart);
			     			$cookieStore.put('cart', cart);
						 	$state.go('home');
						 });
					}
					else {
						CartFactory.createCart().then(function (newCart) {
							CartFactory.setUserCart(newCart._id, responseObj.user).then(function (cart) {
								//cart = JSON.stringify(cart);
								$cookieStore.put('cart', cart);
								$state.go('home');
							});
						});
					}
				});
	     	}
		});
	};
});