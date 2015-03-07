'use strict';
app.factory('CartFactory', function($http) {
	return {
		createCart: function(newCart) {
			return $http.post('/api/cart', newCart).then(function (data) {
				console.log("New cart created");
			})
		},

		addToCart: function(cart) {
			return $http.put('api/cart', cart).then(function (data) {
				return response.data;
			});
		},

		getCart: function(cart) {
			return $http.get('/api/cart', cart).then(function (data) {
				return response.data;
			};
		},

		deleteCart: function(cart) {
			return $http.delete('/api/cart', cart).then(function (data) {
				
			})
		}
	};
});