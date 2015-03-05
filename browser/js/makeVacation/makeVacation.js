'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('makeVacation', {
        url: '/makeVacation',
        controller: 'MakeVacationController',
        templateUrl: 'js/makeVacation/makeVacation.html'
    });
});

app.controller('MakeVacationController', function ($scope, $compile, MakeVacationFactory, MakeCategoryFactory) {

    var catArr = [];

    var setUpCategories = function (){
        MakeCategoryFactory.getCategories().then(function (returnedCategories){
             $scope.categories = returnedCategories;
        });
    };

    $scope.addCategory = function (){
        var categoryId = $scope.catEl._id;
        if(catArr.indexOf(categoryId) == -1)
            catArr.push(categoryId);
        else{
            alert("Category is already present!");
            return;
        }

        var categoryTemp ='<p id="'+categoryId+'">'+$scope.catEl.name+' <a ng-click="deleteCategory()" class="btn btn-danger">x</a></p>';
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

    $scope.submitVacation = function(newVacation){
        newVacation.category = catArr;
        MakeVacationFactory.addProduct(newVacation).then(function(){
	    	$scope.newVacation = {};
            $('#catDisplay').children().remove();
            setUpCategories();
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