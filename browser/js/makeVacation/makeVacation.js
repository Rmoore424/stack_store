'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('makeVacation', {
        url: '/makeVacation',
        controller: 'MakeVacationController',
        templateUrl: 'js/makeVacation/makeVacation.html'
    });
});

app.controller('MakeVacationController', function ($scope, MakeVacationFactory, MakeCategoryFactory) {
    $scope.newVacation = {
        category: []
    };

    var setUpCategories = function (){
        MakeCategoryFactory.getCategories().then(function (returnedCategories){
             $scope.categories = returnedCategories;
         });
    };

    //will need to push category objectId in but option box will only display category.name

    $scope.submitVacation = function(newVacation){
	    MakeVacationFactory.addProduct(newVacation).then(function(){
	    	$scope.newVacation = {
	    		category: []
	    	};
	    });
    };

    setUpCategories();
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
