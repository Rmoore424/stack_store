'use strict';
app.factory('CartFactory', function($http) {
	return {
		createCart: function() {
			return $http.post('/api/cart').then(function (response) {
				console.log("New cart created");
				return response.data;
			});
		},

		//add or remove
		updateCart: function(cart) {
			return $http.put('api/cart', cart).then(function (response) {
				return response.data;
			});
		},

		getCart: function(cart) {
			return $http.get('/api/cart' + cart._id).then(function (response) {
				return response.data;
			});
		},

		setUserCart: function(cartId, user) {
			return $http.put('/api/cart/user', {cartId: cartId, userId: user._id}).then(function (response) {
				return response.data;
			});
		},

		getUserCart: function(user) {
			return $http.get('/api/cart/' + user._id).then(function (response) {
				return response.data;
			});
		},

		deleteCart: function(cart) {
			return $http.delete('/api/cart/' + cart._id).then(function (response) {

			})
		},
		getItems: function(cart) {
			return $http.get('/api/cart/' + cart._id + '/items').then(function (response) {
				return response.data;
			});
		}
	};
});