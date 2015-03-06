"use strict";
app.factory('CategoriesFactory', function ($http) {
	return {
		createCategory: function(newCategory) {
            return $http.post('/api/categories', newCategory).then(function() {
                console.log("New category successfully added!");
            });
        },
        getCategories: function () {
            return $http.get('/api/categories').then(function (response){
                return response.data;
            });
        },
        updateCategory: function (category) {
        	return $http.put("/api/categories").then(function (response) {
        		return response.data;
        	});
        },
        deleteCategory: function (category) {
        	return $http.delete('/api/categories').then(function (response) {
        		return response.data;
        	});
        }
	};
});

//Might want to add a getOneCategory function if needed -RICH