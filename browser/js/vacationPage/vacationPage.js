'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/vacation/:name',
		params: { name: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});
});

app.controller('VacationPgCtrl', function($scope, $stateParams, $state, VacationsFactory, ReviewFactory) {
	VacationsFactory.getOneVacation($stateParams.name).then(function(vacation) {
		$scope.vacation = vacation;
	});

	var setUpReviews = function (){
	    ReviewFactory.getReviews($stateParams.id).then(function (returnedReviews){
	        $scope.reviews = returnedReviews;
	    });
	};

	setUpReviews();
});