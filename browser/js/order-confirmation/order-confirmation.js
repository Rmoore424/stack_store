'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('order-confirmation', {
		url: '/confirmation/:id',
		params: { id: null },
		controller: 'OrderConfCtrl',
		templateUrl: 'js/order-confirmation/order-confirmation.html'
	});
});

app.controller('OrderConfCtrl', function($scope, $stateParams, $state, OrderFactory, CartFactory) {
	OrderFactory.getOrder($stateParams.id).then(function(order) {
		$scope.order = order;
		console.log("order confirmed:", $scope.order);
		CartFactory.createCart( { user: $scope.order.user });
	});

	
});
