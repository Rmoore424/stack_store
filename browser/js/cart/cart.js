'use strict';
app.config(function ($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		params: { cart.id: null },
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

	$scope.addToCart = function(product) {
		//not sure if this will work without wrapping in a function
		$scope.loadCart().then($scope.addToCart()
			cart.items.push(product._id);	
		);
    	
	}

	$scope.loadCart();
});

