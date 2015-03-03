'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, HomeFactory) {
	HomeFactory.getProducts().then(function (products) {
		$scope.products = products;
	});
});

app.factory('HomeFactory', function ($http) {
	return {
		getProducts: function () {
			return $http.get('/api/products/products').then(function (response) {
				return response.data;
			});
		}
	};
});