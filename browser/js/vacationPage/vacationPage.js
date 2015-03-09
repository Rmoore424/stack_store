'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('vacation', {
		url: '/:name/:id',
		params: { id: null },
		controller: 'VacationPgCtrl',
		templateUrl: 'js/vacationPage/vacationPage.html'
	});
});

app.controller('VacationPgCtrl', function($scope, $kookies, $stateParams, $state, VacationsFactory, ReviewFactory, CartFactory) {
	VacationsFactory.getOneVacation($stateParams.id).then(function(vacation) {
		$scope.vacation = vacation;
	});

	$scope.add = function (product) {
		CartFactory.addToCart(product);
	};
	
	var setUpReviews = function (){
	    ReviewFactory.getReviews($stateParams.id).then(function (returnedReviews){
	        $scope.reviews = returnedReviews;
	    });
	};

	setUpReviews();
});
