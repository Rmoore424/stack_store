'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $window, HomeFactory) {

	HomeFactory.getVacations().then(function (returnedVacations) {
		$scope.vacations = returnedVacations;
	});
});

app.factory('HomeFactory', function ($http) {
	return {
		getVacations: function () {
			return $http.get('/api/vacation/vacations').then(function (response) {
				return response.data;
			});
		},
		getVacationsByCategory: function (categoryId) {
			return $http.get('/api/vacation/vacations_by_category', {params: { id: categoryId }}).then(function (response) {
				return response.data;
			});
		},
		validateUser: function () {
			return $http.get('session').then(function (response) {
				return response.data;
			});
		}
	};
});