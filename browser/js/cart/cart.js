'use strict';
app.config(function ($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartController',
		templateUrl: 'js/cart/cart.html'
	});
});


app.controller('CartController', function ($scope, $window, $state) {
    

    
    $scope.getTotal = function(){
	    var total = 0;
	    for(var i = 0; i < $scope.cart.items.length; i++){
	        var item = $scope.cart.items[i];
	        total += (item.price * item.quantity);
	    }
	    return total;
	};

});

