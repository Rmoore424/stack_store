'use strict';
app.config(function ($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartCtrl',
		templateUrl: 'js/cart/cart.html'
	});
});


app.controller('CartCtrl', function ($scope, $stateParams, $kookies, $state, CartFactory, MathFactory) {
    //need to call a function that populates the product refs with the product properties
    $scope.cart = JSON.parse($kookies.get('cart'));

    CartFactory.getItems($scope.cart)
    	.then( function(items) {
    		$scope.populatedItems = items;	
    		$scope.total = MathFactory.getTotalPrice(items)
    	});

	$scope.removeFromCart = function(productToRemove, idx) {
		$scope.cart.items.splice(idx, 1);
		$scope.populatedItems.splice(idx, 1);
		var cart = JSON.stringify($scope.cart);
		$kookies.set('cart', cart, {path: '/'});

		CartFactory.removeFromCart($scope.cart._id, productToRemove._id).then(function () {
             $scope.total = MathFactory.getTotalPrice($scope.populatedItems);
		 });
	};
});

    

	//need to add ability to add >1 of an item to cart
	//need to add a function to increase/decrease qty of an item

