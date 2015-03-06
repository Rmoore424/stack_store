'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $window, HomeFactory) {

	VacationsFactory.getVacations().then(function (returnedVacations) {
		$scope.vacations = returnedVacations;
	});
});
