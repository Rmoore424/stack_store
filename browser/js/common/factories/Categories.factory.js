"use strict";
app.factory('CategoriesFactory', function ($http) {
	return {
		createCategory: function(newCategory) {
            return $http.post('/api/categories', newCategory).then(function() {
                console.log("New category successfully added!");
            });
        },
        getOneCategory: function (name) {
            return $http.get('/api/categories/' + name).then(function (response) {
                return response.data;
            })
        },
        getCategories: function () {
            return $http.get('/api/categories').then(function (response){
                return response.data;
            });
        },
        updateCategory: function (category) {
        	return $http.put("/api/categories", category).then(function (response) {
        		return response.data;
        	});
        },
        deleteCategory: function (category) {
        	return $http.delete('/api/categories/' + category._id).then(function (response) {
        		return response.data;
        	});
        }
	};
});