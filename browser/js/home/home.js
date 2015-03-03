'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, HomeFactory) {
	HomeFactory.getVacations().then(function (returnedVacations) {
		$scope.vacations = returnedVacations;
	});
});

app.factory('HomeFactory', function ($http) {
	return {
		getVacations: function () {
			return $http.get('/api/vacation/vacation').then(function (response) {
				return response.data;
			});
		}
	};
});