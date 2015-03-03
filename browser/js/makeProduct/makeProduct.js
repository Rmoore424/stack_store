'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('makeProduct', {
        url: '/makeProduct',
        controller: 'MakeProductController',
        templateUrl: 'js/makeProduct/makeProduct.html'
    });
});

app.controller('MakeProductController', function ($scope, MakeProductFactory) {
    $scope.newProduct = {
        category: []
    };

    $scope.submitProduct = function(newProduct){
        MakeProductFactory.addProduct(newProduct).then(function(){
            $scope.newProduct = {
                category: []
            };
        });
    };
});



app.factory('MakeProductFactory', function($http) {
    return {
        addProduct: function(newProduct) {
            return $http.post('/api/makeProduct/makeProduct', newProduct).then(function() {
                console.log("New product successfully added!");
            });
        }
    };
});
