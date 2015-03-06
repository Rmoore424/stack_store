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
        CategoriesFactory.getCategories().then(function (returnedCategories){
            $scope.categories = returnedCategories;
        });
    };
    
    $scope.submitCategory = function(newCategory){
        CategoriesFactory.addCategory(newCategory).then(function(){
            $scope.newCategory = {};
        });
        displayCategories();
    };

    displayCategories();

});
