'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('makeCategory', {
        url: '/makeCategory',
        controller: 'MakeCategoryController',
        templateUrl: 'js/makeCategory/makeCategory.html'
    });
});

app.controller('MakeCategoryController', function ($scope, MakeCategoryFactory) {

    var displayCategories = function(){
        MakeCategoryFactory.getCategories().then(function (returnedCategories){
            $scope.categories = returnedCategories;
        });
    };
    
    $scope.submitCategory = function(newCategory){
        MakeCategoryFactory.addCategory(newCategory).then(function(){
            $scope.newCategory = {};
        });
        displayCategories();
    };

    displayCategories();

});

app.factory('MakeCategoryFactory', function($http) {
    return {
        addCategory: function(newCategory) {
            return $http.post('/api/category/makeCategory', newCategory).then(function() {
                console.log("New category successfully added!");
            });
        },
        getCategories: function(){
            return $http.get('/api/category/categories').then(function (response){
                return response.data;
            });
        }
    };
});
