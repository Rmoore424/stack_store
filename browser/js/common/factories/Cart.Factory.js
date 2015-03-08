'use strict';
app.factory('CartFactory', function($http) {
	return {
		createCart: function() {
			return $http.post('/api/cart').then(function (data) {
				console.log("New cart created");
			})
		},

		//add or remove
		updateCart: function(cart) {
			return $http.put('api/cart', cart).then(function (data) {
				return response.data;
			});
		},

		getCart: function(cart) {
			return $http.get('/api/cart' + cart.id).then(function (data) {
				return response.data;
			});
		},

		deleteCart: function(cart) {
			return $http.delete('/api/cart' + cart.id).then(function (data) {

			})
		}
	};
});