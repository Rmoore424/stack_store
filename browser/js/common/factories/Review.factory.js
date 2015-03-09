'use strict';
app.factory('ReviewFactory', function($http){
    return{
        getReviews: function (id) {
            return $http.get('/api/review/' + id ).then(function (response) {
                return response.data;
            });
        },
        getVacationReviews: function(vacationId){
            return $http.get('')
        },
        makeReview: function(newReview){
            return $http.post('/api/review', newReview).then(function(){
                console.log("New review successfully added!");
            });
        },
        deleteReview: function(revId){
            return $http.delete('/api/review', {params: {_id: revId} }).then(function(){
                console.log("Review successfully deleted.")
            });
        }
    };
});