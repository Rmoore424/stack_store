//promote other User accounts to also having Admin status

//Change the password of any user

'use strict';

app.config(function ($stateProvider) {
	//do we need the controller below?
	$stateProvider.state('admin', {
		url: '/admin/user',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/admin.html'
	});

	$stateProvider.state('admin.editUser', {
		url: '/:id/editUser',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/editUser.html'
	});

	$stateProvider.state('admin.deleteUser', {
		url: '/:id/deleteUser',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/deleteUser.html'
	});

	$stateProvider.state('admin.editVacation', {
		url: '/:id/editVacation',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/editVacation.html'
	});
});

app.controller('AdminCtrl', function ($scope, $state, $stateParams, UserFactory, VacationsFactory){
	$scope.editUser = function (user) {
		UserFactory.getUser(user).then(function (user) {
			$scope.user = user;
			console.log($scope.user);
			// $rootScope.$broadcast('user', { user: user });
			//console.log('editUser', $stateParams);
			//how do we make the state below pull in the $scope.user data? /:user
			$state.go('admin.editUser', { id: user._id });
		});
	};

	$scope.saveUserEdits = function (user) {
		UserFactory.saveUser(user).then(function (user) {	
			$state.go('admin');
		});
	};

	$scope.findUserToDelete = function (user) {
		console.log('this is happening');
		UserFactory.getUser(user).then(function (user) {
			$scope.userToDelete = user;
			console.log("$scope",$scope.userToDelete);
			// console.log("user", user);
			$state.go('admin.deleteUser', { id: user._id});
		});
	};

	$scope.deleteUser = function (user) {
		console.log('this is doing something');
		UserFactory.deleteUser(user).then(function () {
			$state.go('admin.deleteUser');
		});
	};

	$scope.editVacation = function (vacation) {
		VacationsFactory.getVacation(vacation).then(function (vacation) {
			$scope.vacation = vacation;
			$state.go('admin.editVacation', { id: vacation._id});
		});
	};
});