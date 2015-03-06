'use strict';
app.directive('vacation', function () {
	return {
		restrict: 'E',
		controller: 'SingleVacationCtrl',
		templateUrl: 'js/common/directives/vacation/vacation.html'
	};
});

app.controller('SingleVacationCtrl', function($scope, $state) {

	$scope.showCurrentVacation = function(vacation) {
			//SingleVacationFactory.getSingleVacation(vacation._id).then(function (vacation) {
			$state.go('vacation', { id: vacation._id });
				
			//})
		};	
});