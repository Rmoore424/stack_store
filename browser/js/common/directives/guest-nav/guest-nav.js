'use strict';
app.directive('guestnav', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/guest-nav/guest-nav.html',
		controller: 'NavController'
	};
});