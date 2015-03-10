'use strict';
app.factory('OrderFactory', function($http) {
	return {
		createOrder: function(token, cart) {
			return $http.post('/api/order/', {token: token.id, cart: cart}).then(function (response) {
				console.log("New order created");
				return response.data;
			});
		},
		getOrder: function (id) {
			return $http.get('/api/order/' + id).then(function (response) {
				return response.data;
			});
		}
	}
});