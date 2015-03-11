//promote other User accounts to also having Admin status

//Change the password of any user

'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('admin', {
		url: '/admin',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/admin.html'
	});

	$stateProvider.state('admin.edit', {
		url: '/edit',
		templateUrl: 'js/admin/findOneToEdit.html'
	});

	$stateProvider.state('admin.orders', {
		url: '/orders',
		templateUrl: 'js/admin/orders.html'
	})
});

app.controller('AdminCtrl', function ($scope, $state, $stateParams, UserFactory, VacationsFactory, CategoriesFactory, OrderFactory, MathFactory){

	$scope.currentOption = $scope.adminOptions[0];
	$scope.adminOptions = [
		{'name': "User",     'label': "User's Email Address"},
		{'name': "Vacation", 'label': "Vacation Name"},
		{'name': "Category", 'label': "Category Name"}
	];

	$scope.adminSearch = function (option) {
		$scope.currentOption = option;
		$state.go('admin.edit');
	};

	$scope.adminCreate = function (option) {
		$scope.currentOption = option;
		$state.go('admin.create' + option.name);
	};

	var resolveFind = function (returnedValue) {
		if (returnedValue) {
			$scope.toEdit = returnedValue;
			if (returnedValue.category) {
				$scope.vacationCategories = returnedValue.category;
			}
			var childView = ".edit" + $scope.currentOption.name;
			$state.go('admin.edit' + childView, {option: $scope.currentOption.name, id: $scope.toEdit._id});
		}
		else {
			alert('Does Not Exist');
		}
	};

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

	$scope.showOrders = function () {
		OrderFactory.getOrders().then(function (orders) {
			$scope.orders = orders;
			$scope.orders.forEach(function (order) {
				order.total = MathFactory.getTotalPrice(order.items);
			});
			$state.go('admin.orders');
		});
	};

	$scope.editStatus = function (orderId, orderStatus) {
		OrderFactory.updateOrderStatus(orderId, orderStatus).then(function (order) {
			alert('Order Status Updated');
		});
	};
});