'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $state, $kookies, HomeViewFactory, VacationsFactory, CartFactory) {
	$scope.homeView = HomeViewFactory;

    VacationsFactory.getVacations().then(function (vacations) {
        HomeViewFactory.vacations = vacations;
    });

    $scope.showCurrentVacation = function(vacation) {
		$state.go('vacation', { id: vacation._id });
	};	

    $scope.vacImages = [
        "http://www.bankingsense.com/wp-content/uploads/2014/07/vacations.jpg",
        "http://img4.wikia.nocookie.net/__cb20140520211519/middleearthshadowofmordor7723/images/5/50/Yre1o.jpg",
        "https://wallwidehd.com/wp-content/uploads/Jupiter-Surface-Painting-Wallpaper.jpg"
    ];

    //maybe goes on main controller so VacationPgCtrl can access it too
 //    $scope.add = function(product) {
 //        CartFactory.addToCart(product);
	// };

});