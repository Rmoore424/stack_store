'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, $kookies, CartFactory, AuthService, $window) {

	AuthService.getLoggedInUser().then(function(user) {
		$scope.user = user;
	});

	

	$scope.sendPayment = function () {
		stripe.card.createToken(req.body, function(err, response) {	
			console.log("token", response);
			stripe.charges.create({
			  amount: 400,
			  currency: "usd",
			  source: response.id, // obtained with Stripe.js
			  description: "Stackations unLTD"
			}, {
			  idempotency_key: "ecSQBz738rb2g19W"
			}, function(err, charge) {
			  // asynchronously called
			  console.log("charge created");
			});
		});
	};

});