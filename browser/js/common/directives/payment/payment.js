'use strict';
app.directive('payment', function () {
	return {
		restrict: 'E',
		controller: 'PaymentCtrl',
		templateUrl: 'js/common/directives/payment/payment.html'
	};
});

app.controller('PaymentCtrl', function ($scope, $state) {
	$scope.stripeCallback = function (code, result) {
	    if (result.error) {
	        $window.alert('it failed! error: ' + result.error.message);
	    } else {
	        $window.alert('success! token: ' + result.id);
	    }
	};
});