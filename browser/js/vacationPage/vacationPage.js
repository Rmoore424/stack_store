'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/vacation/:id',
		params: { id: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});
});

app.controller('VacationPgCtrl', function($scope, $stateParams, $state, SingleVacationFactory) {
	SingleVacationFactory.getSingleVacation($stateParams.id).then(function(vacation) {
		$scope.vacation = vacation;
	});
});