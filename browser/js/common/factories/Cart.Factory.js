'use strict';
app.factory('CartFactory', function ($http, $kookies) {
	return {
		createCart: function() {
			return $http.post('/api/cart').then(function (response) {
				return response.data;
			});
		},
		//need to look at this function
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

			});
		},
		getItems: function(cart) {
			return $http.get('/api/cart/' + cart._id + '/items').then(function (response) {
				return response.data;
			});
		},
		//add or remove: look at this too
		updateCart: function(cartId, product, idx) {
			return $http.put('api/cart', {cartId: cartId, product: product, idx: idx}).then(function (response) {
				return response.data;
			});
		},
		addToCart: function(cartId, product) {
			return $http.put('api/cart/add', {cartId: cartId, product: product}).then(function (response) {
				return response.data;
			});
		},
		removeFromCart: function(cartId, productId) {
			return $http.put('/api/cart/remove', {cartId: cartId, productId: productId}).then(function (response) {
				return response.data;
			});
		},

		clearCart: function(cartId) {
			return $http.put('/api/cart/clear', {cartId: cartId }).then(function (response) {
				return response.data;
			});
		}
	};
});