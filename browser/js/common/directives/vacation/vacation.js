'use strict';
app.directive('vacation', function () {
	return {
		restrict: 'E',
		controller: 'SingleVacationCtrl',
		templateUrl: 'js/common/directives/vacation/vacation.html'
	};
});

app.controller('SingleVacationCtrl', function($scope, $state, SingleVacationFactory) {

	$scope.getCurrentVacation = function(vacation) {
			//SingleVacationFactory.getSingleVacation(vacation._id).then(function (vacation) {
			$state.go('vacation', { id: vacation._id });
				
			//})
		};	
});

app.factory('SingleVacationFactory', function($http) {
	return {
		getSingleVacation: function(id) {
			return $http.get('/api/vacation/vacation', { params: { id: id }}).then(function (response) {
				return response.data;
			});
		}
	};
});