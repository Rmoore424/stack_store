'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $rootScope, HomeFactory) {

	$scope.vacations = HomeFactory;

	VacationsFactory.getVacations().then(function (returnedVacations) {
		HomeFactory.vacations = returnedVacations;
	});
});