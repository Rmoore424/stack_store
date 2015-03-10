'use strict';
app.factory('CheckoutFactory', function($http) {
	return {
		createOrder: function(token, cart) {
			return $http.post('/api/checkout/', {token: token.id, cart: cart}).then(function (response) {
				console.log("New order created");
				return response.data;
			});
		}
	}
});