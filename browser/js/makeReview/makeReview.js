'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('makeReview', {
        url: '/makeReview',
        controller: 'ReviewController',
        templateUrl: 'js/makeReview/makeReview.html'
    });
});

app.controller('ReviewController', function ($scope, ReviewFactory, VacationsFactory){

    console.log($scope.reviews);

    var setUpReviews = function (){
        ReviewFactory.getReviews().then(function (returnedReviews){
            $scope.reviews = returnedReviews;
        });
    };

    var setUpVacations = function (){
        VacationsFactory.getVacations().then(function (returnedVacations){
            $scope.vacations = returnedVacations;
        });
    };

    $scope.submitReview = function(newReview){
        $scope.newReview.date = new Date();
        $scope.newReview.product = $scope.vacationRef;
        ReviewFactory.makeReview(newReview).then(function(){
            $scope.newReview = {};
        });
        setUpReviews();
    };

    $scope.deleteReview = function(){
        var getRevId = $(event.target).parent().attr('id');
        $('a').parent().remove('#'+getRevId);
        ReviewFactory.deleteReview(getRevId).then( function(){
            setUpReviews();
        });
    };

    // $scope.editReview = function(){

    // }

    setUpVacations();
    setUpReviews();
});

