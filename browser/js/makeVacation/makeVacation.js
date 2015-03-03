'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('makeVacation', {
        url: '/makeVacation',
        controller: 'MakeVacationController',
        templateUrl: 'js/makeVacation/makeVacation.html'
    });
});

app.controller('MakeVacationController', function ($scope, MakeVacationFactory) {
    $scope.newVacation = {
        category: []
    };

    $scope.submitVacation = function(newVacation){
	    MakeVacationFactory.addProduct(newVacation).then(function(){
	    	$scope.newVacation = {
	    		category: []
	    	};
	    });
    };
});



app.factory('MakeVacationFactory', function($http) {
    return {
        addProduct: function(newVacation) {
            return $http.post('/api/vacation/makeVacation', newVacation).then(function() {
                console.log("New product successfully added!");
            });
        }
    };
});
