'use strict';
app.config(function ($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartCtrl',
		templateUrl: 'js/cart/cart.html'
	});
});


app.controller('CartCtrl', function ($scope, $stateParams, $window, $state, CartFactory) {
    //need to call a function that populates the product refs with the product properties
    $scope.cart;

    $scope.loadCart = function() {
    	if (typeof $scope.cart == undefined) {
    		CartFactory.createCart().then(function (cart) {
    			$scope.cart = cart;
    			console.log('cart created!');
    		});
    	}
    	else {
    		//$scope.cart should already be set if it exists(?) but not sure if this will load without setting some variable to get the promised data
    		CartFactory.getCart($scope.cart).then(function(cart) {
    			console.log(cart);
    		})
    	}
    };

    $scope.getTotal = function(){
	    var total = 0;
	    for(var i = 0; i < $scope.cart.items.length; i++){
	        var item = $scope.cart.items[i];
	        total += (item.price * item.quantity);
	    }
	    return total;
	};

	//need to add ability to add >1 of an item to cart
	//need to add a function to increase/decrease qty of an item
	

	$scope.removeFromCart = function(productToRemove) {
		CartFactory.getCart().then(function(cart) {
			$scope.cart = cart.items.filter(function(item) {
				return item.product._id !== productToRemove._id;
			});
		});
	};

	$scope.loadCart();
});

