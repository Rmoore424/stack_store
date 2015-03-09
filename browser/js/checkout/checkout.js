'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, $kookies, CartFactory, AuthService) {

	AuthService.getLoggedInUser().then(function(user) {
		$scope.user = user;
	});

});