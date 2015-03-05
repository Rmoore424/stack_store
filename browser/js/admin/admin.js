//promote other User accounts to also having Admin status

//Change the password of any user

'use strict';

app.config(function ($stateProvider) {
	//do we need the controller below?
	$stateProvider.state('admin', {
		url: '/admin/user',
		controller: 'UserCtrl',
		templateUrl: 'js/admin/admin.html'
	});

	$stateProvider.state('admin.editUser', {
		url: '/:id/editUser',
		controller: 'UserCtrl',
		templateUrl: 'js/admin/editUser.html'
	});

	$stateProvider.state('admin.deleteUser', {
		url: '/:id/deleteUser',
		controller: 'DeleteUserCtrl',
		templateUrl: 'js/admin/deleteUser.html'
	});

	$stateProvider.state('admin.editVacation', {
		url: '/:id/editVacation',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/editVacation.html'
	});
});

app.controller('AdminCtrl', function(){

});

app.controller('UserCtrl', function($scope, $state, $stateParams, UserFactory) {
	$scope.user;
	$scope.hello = true;

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
});

app.controller('DeleteUserCtrl', function( $scope, $state, $stateParams, DeleteUserFactory) {
	$scope.userToDelete;

	$scope.findUserToDelete = function (user) {
		console.log('this is happening');
		DeleteUserFactory.findUserToDelete(user).then(function (user) {
			$scope.userToDelete = user;
			console.log("$scope",$scope.userToDelete);
			// console.log("user", user);
			$state.go('admin.deleteUser', { id: user._id});
		});
	};

	$scope.deleteUser = function (user) {
		console.log('this is doing something');
		DeleteUserFactory.deleteUser(user).then(function () {
			$state.go('admin.deleteUser');
		});
	};
});

app.factory('DeleteUserFactory', function($http) {
	return {
		findUserToDelete: function(email) {
			return $http.get('/api/admin/admin/user', { params: { email: email } }).then(function (response) {
				console.log(response.data);
				return response.data;
			});
		},
		deleteUser: function(user) {
			console.log("deleting!", user);
			return $http.delete('/api/admin/admin/deleteUser', user).then(function (response) {
				console.log("almost done deleting");
				return response.data;
			});
		}
	};
});

app.controller('VacationCtrl', function($scope, $state, $stateParams, VacationFactory) {
	$scope.user;

	$scope.editVacation = function (vacation) {
		VacationFactory.getVacation(vacation).then(function (vacation) {
			$scope.vacation = vacation;
			$state.go('admin.editVacation', { id: vacation._id});
		});
	};
});

app.factory('UserFactory', function($http) {
	return {
		getUser: function(email) {
			return $http.get('/api/admin/admin/user', { params: { email: email } }).then(function (response) {
				return response.data;
			});
		},
		saveUser: function(user) {
			console.log("saveUser", user);
			return $http.put('/api/admin/admin/save', user).then(function (response) {
				console.log('saveUser and show response', response);
				return response.data;
			});
		},
	};
});


app.factory('VacationFactory', function($http) {
	return {
		// getVacation: function()
	};
});