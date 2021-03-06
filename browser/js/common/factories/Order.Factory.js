'use strict';
app.factory('OrderFactory', function($http) {
	return {
		createOrder: function(token, cart, total) {
			return $http.post('/api/order/', {token: token.id, cart: cart, total: total}).then(function (response) {
				console.log("New order created");
				return response.data;
			});
		},
		getOrder: function (id) {
			return $http.get('/api/order/' + id).then(function (response) {
				return response.data;
			});
		},
		getOrders: function () {
			return $http.get('/api/order').then(function (response) {
				return response.data;
			});
		},

		getUserOrders: function (userId) {
			return $http.get('/api/order/user/' + userId).then(function (response) {
				return response.data;
			});
		},
		updateOrderStatus: function (orderId, orderStatus) {
			return $http.put('/api/order/status', {orderId: orderId, orderStatus: orderStatus}).then(function (response) {
				return response.data;
			});
		}
	}
});