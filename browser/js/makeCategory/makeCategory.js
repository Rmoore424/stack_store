'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('makeCategory', {
        url: '/makeCategory',
        controller: 'MakeCategoryController',
        templateUrl: 'js/makeCategory/makeCategory.html'
    });
});

app.controller('MakeCategoryController', function ($scope, CategoriesFactory) {

    var displayCategories = function(){
        CategoriesFactory.getCategories().then(function (returnedCategories){
            $scope.categories = returnedCategories;
        });
    };
    
    $scope.submitCategory = function(newCategory){
        CategoriesFactory.createCategory(newCategory).then(function(){
            $scope.newCategory = {};
        });
        displayCategories();
    };

    displayCategories();

});
