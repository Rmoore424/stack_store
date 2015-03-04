//promote other User accounts to also having Admin status

//Change the password of any user

'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('admin', {
		url: '/admin',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/admin.html'
	});

	$stateProvider.state('admin.editUser', {
		url: '/:id/editUser',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/editUser.html'
	});
});

app.controller('AdminCtrl', function($scope, $state, $stateParams, $rootScope, AdminFactory) {
	$scope.user;

	$scope.editUser = function (user) {
		AdminFactory.getUser(user).then(function (user) {
			$scope.user = user;
			// $rootScope.$broadcast('user', { user: user });
			//console.log('editUser', $stateParams);
			//how do we make the state below pull in the $scope.user data? /:user
			$state.go('admin.editUser', { id: user._id });
		});
	};

	// $scope.$on('user', function(user) {
	// 			console.log("hey", user);
	// 		});

	$scope.saveUserEdits = function (user) {
		AdminFactory.saveUser(user).then(function (user) {
			
			$state.go('admin');
		});
	};
});

app.factory('AdminFactory', function($http) {
	return {
		getUser: function(email) {

			return $http.get('/api/admin/admin', { params: { email: email } }).then(function (response) {
				return response.data;
			});
		},
		saveUser: function(user) {
			console.log(user);
			return $http.put('/api/admin/admin/save', user).then(function (response) {
				console.log('saveUser', response);
				return response.data;
			});
		}
	};
});