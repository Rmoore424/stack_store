//promote other User accounts to also having Admin status

//Change the password of any user

'use strict';

app.config(function ($stateProvider) {
	//do we need the controller below?
	$stateProvider.state('admin', {
		url: '/admin',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/admin.html'
	});

	$stateProvider.state('admin.edit', {
		url: '/edit',
		templateUrl: 'js/admin/findOneToEdit.html'
	});

	$stateProvider.state('admin.edit.editUser', {
		url: '/:id',
		templateUrl: 'js/admin/editUser.html'
	});

	$stateProvider.state('admin.edit.editVacation', {
		url: '/:id',
		templateUrl: 'js/admin/editVacation.html'
	});

	$stateProvider.state('admin.edit.editCategory', {
		url: '/:id',
		templateUrl: '/js/admin/editCategory.html'
	});

	$stateProvider.state('admin.create', {
		url: '/create',
		templateUrl: 'js/admin/createOne.html'
	});
});

app.controller('AdminCtrl', function ($scope, $state, $stateParams, UserFactory, VacationsFactory, CategoriesFactory){

	$scope.currentOption = $scope.adminOptions[0];
	$scope.adminOptions = [
		{'name': "User",     'label': "User's Email Address"},
		{'name': "Vacation", 'label': "Vacation Name"},
		{'name': "Category", 'label': "Category Name"}
	];

	// $scope.deleteOptions = [
	// 	{'name': 'User',     'action': 'Delete'},
	// 	{'name': 'Vacation', 'action': 'Delete'},
	// 	{'name': 'Category', 'action': 'Delete'}
	// ];

	// $scope.createOptions = [
	// 	{'name': 'User', 	 'action': 'Create'},
	// 	{'name': 'Vacation', 'action': 'Create'},
	// 	{'name': 'Category', 'action': 'Create'}
	// ];

	$scope.adminSearch = function (option) {
		$scope.currentOption = option;
		$state.go('admin.edit');
	};

	$scope.adminCreate = function (option) {
		$state.go('admin.create');
	}

	var resolveFind = function (returnedValue) {
		if (returnedValue) {
			$scope.toEdit = returnedValue;
			var childView = ".edit" + $scope.currentOption.name
			$state.go('admin.edit' + childView, {id: returnedValue._id});
		}
		else {
			alert('Does Not Exist');
		}
	}

	$scope.findOne = function (searchParam) {
		if ($scope.currentOption.name === "User") {
			UserFactory.getUser(searchParam).then(resolveFind);
		}
		else if ($scope.currentOption.name === "Vacation") {
			VacationsFactory.getOneVacation(searchParam).then(resolveFind);
		}
		else if ($scope.currentOption.name === "Category") {
			CategoriesFactory.getOneCategory(searchParam).then(resolveFind);
		}
	};

	$scope.editOne = function (oneToEdit) {
		if ($scope.currentOption.name === "User") {
			UserFactory.updateUser(oneToEdit).then(function (user) {
				$state.go('admin');
			});
		}
		else if ($scope.currentOption.name === "Vacation") {
			VacationsFactory.updateVacation(oneToEdit).then(function (vacation) {
				$state.go('admin');
			});
		}
		else if ($scope.currentOption.name === "Category") {
			CategoriesFactory.updateCategory(oneToEdit).then(function (category) {
				$state.go('admin');
			});
		}
		alert('Successfully Edited');	
	};

	$scope.deleteOne = function (oneToDelete) {
		if ($scope.currentOption.name === "User") {
			UserFactory.deleteUser(oneToDelete).then(function (user) {
				$state.go('admin');
			});
		}
		else if ($scope.currentOption.name === "Vacation") {
			VacationsFactory.deleteVacation(oneToDelete).then(function (vacation) {
				$state.go('admin');
			});
		}
		else if ($scope.currentOption.name === "Category") {
			CategoriesFactory.deleteCategory(oneToDelete).then(function (category) {
				$state.go('admin');
			});
		}
		alert('Successfully Deleted')
	};
});