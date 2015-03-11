'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, $state, HomeViewFactory, VacationsFactory, CartFactory) {
	$scope.homeView = HomeViewFactory;

    VacationsFactory.getVacations().then(function (vacations) {
        HomeViewFactory.vacations = vacations;
    });

    $scope.showCurrentVacation = function(vacation) {
		$state.go('vacation', { id: vacation._id , name: vacation.name});
	};	

    $scope.vacImages = [
        {url: "http://www.bankingsense.com/wp-content/uploads/2014/07/vacations.jpg", text: "Want Tropical Stackations?"},
        {url: "http://vignette3.wikia.nocookie.net/shadow-of-mordor/images/5/50/Yre1o.jpg/revision/latest?cb=20141222202027&path-prefix=es", text: "A Stackation to Middle Earth?"},
        {url: "https://wallwidehd.com/wp-content/uploads/Jupiter-Surface-Painting-Wallpaper.jpg", text: "Maybe a Stackation in space!"}
        
    ];

    //maybe goes on main controller so VacationPgCtrl can access it too
 //    $scope.add = function(product) {
 //        CartFactory.addToCart(product);
	// };

});
