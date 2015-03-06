'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $state, HomeViewFactory, VacationsFactory) {
	$scope.homeView = HomeViewFactory;

    VacationsFactory.getVacations().then(function (vacations) {
        HomeViewFactory.vacations = vacations;
    });
});
