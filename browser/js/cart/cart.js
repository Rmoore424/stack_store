'use strict';
app.config(function ($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartCtrl',
		templateUrl: 'js/cart/cart.html'
	});
});


app.controller('CartCtrl', function ($scope, $stateParams, $kookies, $state, CartFactory) {
    //need to call a function that populates the product refs with the product properties
    $scope.cart = JSON.parse($kookies.get('cart'));
    $scope.populatedItems;

    var getTotalPrice = function (items) {
    	var total = 0;
	    for(var i = 0; i < items.length; i++){
	        var item = items[i];
	        if (item) {
	        	total += (item.item.price * item.quantity);
	        }
	    }
		$scope.total = total;
		$scope.populatedItems = items;
	};
	console.log($scope.cart);
    CartFactory.getItems($scope.cart)
    	.then(getTotalPrice);

	$scope.removeFromCart = function(productToRemove, idx) {
		$scope.cart.items = $scope.cart.items.splice(idx, 1);
		$scope.populatedItems.splice(idx, 1);
		CartFactory.updateCart($scope.cart).then(function(cart) {
             $kookies.set('cart', JSON.stringify(cart), {path: '/'});
             getTotalPrice($scope.populatedItems);
		 });
		// CartFactory.getCart().then(function(cart) {
		// 	$scope.cart = cart.items.filter(function(item) {
		// 		return item._id !== productToRemove._id;
		// 	});
		// });
	};
});

    // $scope.loadCart = function() {
    // 	if (typeof $scope.cart == undefined) {
    // 		CartFactory.createCart().then(function (cart) {
    // 			$scope.cart = cart;
    // 			console.log('cart created!');
    // 		});
    // 	}
    // 	else {
    // 		//$scope.cart should already be set if it exists(?) but not sure if this will load without setting some variable to get the promised data
    // 		CartFactory.getCart($scope.cart).then(function(cart) {
    // 			console.log(cart);
    // 		})
    // 	}
    // };

	//need to add ability to add >1 of an item to cart
	//need to add a function to increase/decrease qty of an item
	

	//$scope.loadCart();

