'use strict';
app.factory('ReviewFactory', function($http){
    return{
        getReviews: function (id) {
            return $http.get('/api/review/' + id ).then(function (response) {
                return response.data;
            });
        },
        getVacationReviews: function(vacationId){
            // return $http.get('');
        },
        createReview: function(vacationId, userId, rating, newReview) {
            return $http.post('/api/review', {review: newReview, user: userId, rating: rating, vacation: vacationId}).then(function(response){
                return response.data;
            });
        },
        deleteReview: function(revId){
            return $http.delete('/api/review/' + revId).then(function(){
                console.log("Review successfully deleted.");
            });
        }
    };
});