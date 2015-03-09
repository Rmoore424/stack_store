"use strict";
app.factory("VacationsFactory", function ($http) {
	return {
		getVacations: function () {
			return $http.get('/api/vacations').then(function (response) {
				return response.data;
			});
		},
		getOneVacation: function (id) {
			return $http.get('/api/vacations/' + id).then(function (response) {
				return response.data;
			});
		},
		getOneVacationByName: function(name) {
			return $http.get('/api/vacations/' + name).then(function (response) {
				return response.data;
			});
		},
		getVacationsByCategory: function (category) {
			return $http.get('/api/vacations/category/' + category._id).then(function (response) {
				return response.data;
			});
		},
		createVacation: function (vacation) {
			return $http.post('/api/vacations', vacation).then(function (response) {
				return response.data;
			});
		},
		deleteVacation: function (vacation) {
			return $http.delete('/api/vacations/' + vacation._id).then(function (response) {
				return response.data;
			});
		},
		updateVacation: function (vacation) {
			return $http.put('/api/vacations', vacation).then(function (response) {
				return response.data;
			});
		}
	};
});

//may want to pass id as argument for delete and update 
//instead of whole vacation object -RICH