'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, HomeFactory) {
	$scope.vacations = HomeFactory;

	HomeFactory.getVacations().then(function (returnedVacations) {
		HomeFactory.vacations = returnedVacations;
	});
});

app.factory('HomeFactory', function ($http) {
	return {
		vacations: [],
		getVacations: function () {
			return $http.get('/api/vacation/vacation').then(function (response) {
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