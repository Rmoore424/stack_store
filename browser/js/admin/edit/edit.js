'use strict';
app.config(function ($stateProvider) {
$stateProvider.state('admin.edit.editUser', {
		url: '/:option/:id',
		controller: 'EditController',
		templateUrl: 'js/admin/edit/editUser.html'
	});

	$stateProvider.state('admin.edit.editVacation', {
		url: '/:option/:id',
		controller: 'EditController',
		templateUrl: 'js/admin/edit/editVacation.html'
	});

	$stateProvider.state('admin.edit.editCategory', {
		url: '/:option/:id',
		controller: 'EditController',
		templateUrl: '/js/admin/edit/editCategory.html'
	});
});

app.controller('EditController', function ($scope, $state, $stateParams, UserFactory, CategoriesFactory, VacationsFactory) {
	var catArr = [];
	CategoriesFactory.getCategories().then(function (categories) {
		$scope.categories = categories;
	});

	$scope.editOne = function (oneToEdit) {
		if ($stateParams.option === "User") {
			UserFactory.updateUser(oneToEdit).then(function (user) {
				$state.go('admin');
			});
		}
		else if ($stateParams.option === "Vacation") {
			oneToEdit.category = catArr;
			VacationsFactory.updateVacation(oneToEdit).then(function (vacation) {
				$state.go('admin');
			});
		}
		else if ($stateParams.option === "Category") {
			CategoriesFactory.updateCategory(oneToEdit).then(function (category) {
				$state.go('admin');
			});
		}
		alert('Successfully Edited');	
	};

	$scope.deleteOne = function (oneToDelete) {
		if ($stateParams.option === "User") {
			UserFactory.deleteUser(oneToDelete).then(function (user) {
				$state.go('admin');
			});
		}
		else if ($stateParams.option === "Vacation") {
			VacationsFactory.deleteVacation(oneToDelete).then(function (vacation) {
				$state.go('admin');
			});
		}
		else if ($stateParams.option === "Category") {
			CategoriesFactory.deleteCategory(oneToDelete).then(function (category) {
				$state.go('admin');
			});
		}
		alert('Successfully Deleted');
	};

	$scope.removeCategory = function(idx, categoryId, vacationId) {
		$scope.vacationCategories.splice(idx, 1);
		VacationsFactory.getVacationAndRemoveCategory(categoryId, vacationId)
	};

	$scope.addCategory = function(catEl) {
		catArr.push(catEl._id);
		$scope.vacationCategories.push(catEl);
	}

});