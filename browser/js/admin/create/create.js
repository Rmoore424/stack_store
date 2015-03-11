'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('admin.createCategory', {
		url: '/create/category',
		controller: 'CreateController',
		templateUrl: 'js/admin/create/createCategory.html'
	});

	$stateProvider.state('admin.createUser', {
		url: '/create/user',
		controller: 'CreateController',
		templateUrl: '/js/admin/create/createUser.html'
	});

	$stateProvider.state('admin.createVacation', {
		url: '/create/vacation',
		controller: 'CreateController',
		templateUrl: '/js/admin/create/createVacation.html'
	});
});

app.controller('CreateController', function ($scope, $compile, CategoriesFactory, VacationsFactory, UserFactory) {
	var catArr = [];

	$scope.addCategory = function (){
        var categoryId = $scope.catEl._id;
        if(catArr.indexOf(categoryId) == -1)
            catArr.push(categoryId);
        else{
            alert("Category is already present!");
            return;
        }
        var categoryTemp ='<p id="'+categoryId+'">'+$scope.catEl.name+' <a ng-click="deleteCategory()" style="float: right" class="btn btn-danger">x</a></p>';
        var catComp = $compile(categoryTemp)($scope);
        $('#catDisplay').append(catComp);
    };

    $scope.deleteCategory = function(){
        var idGet = $(event.target).parent().attr('id');
        catArr = catArr.filter(function (data){
            return data !== idGet;
        });
        $('a').parent().remove("#" + idGet);
    };

	var displayCategories = function(){
        CategoriesFactory.getCategories().then(function (returnedCategories){
            $scope.categories = returnedCategories;
        });
    };
    
    $scope.submitCategory = function(newCategory){
        CategoriesFactory.createCategory(newCategory).then(function(){
            alert("Category Added");
            $scope.newCategory = {};
        });
        displayCategories();
    };

    $scope.submitVacation = function(newVacation) {
        newVacation.category = catArr;
        VacationsFactory.createVacation(newVacation).then(function (vacation) {
            alert("Vacation Added");
            $scope.newVacation = {};
        });
    };

    $scope.submitUser = function(newUser) {
        UserFactory.createUser(newUser).then(function (user) {
            alert("User Added");
            $scope.user = {}       
        });
    };
});