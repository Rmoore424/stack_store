'use strict';
app.directive('vacation', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/vacation/vacation.html'
	};
});

// app.controller('ShowVacationPageCtrl', function ($scope, $state) {
// 	$scope.showCurrentVacation = function(vacation) {
// 		$state.go('vacation', { id: vacation._id, name: vacation.name });
// 	};	
// });
