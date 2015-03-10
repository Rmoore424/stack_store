'use strict';
app.directive('payment', function () {
	return {
		restrict: 'E',
		controller: 'CheckoutCtrl',
		templateUrl: 'js/common/directives/payment/payment.html'
	};
});