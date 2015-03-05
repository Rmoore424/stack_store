'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $rootScope, HomeFactory) {
	//ask about this in code review
	$scope.vacations = HomeFactory;

	HomeFactory.getVacations().then(function (returnedVacations) {
		HomeFactory.vacations = returnedVacations;
	});

	// $scope.on('currentVacation', function() {
	// 	$rootScope.$broadcast('currentVacation');
	// })
});

app.factory('HomeFactory', function ($http) {
	return {
		vacations: [],
		getVacations: function () {
			return $http.get('/api/vacation/vacations').then(function (response) {
				return response.data;
			});
		},
		getVacationsByCategory: function (categoryId) {
			return $http.get('/api/vacation/vacations_by_category', {params: { id: categoryId }}).then(function (response) {
				return response.data;
			})
		}
	};
});