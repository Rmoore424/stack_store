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
		url: '/:user/editUser',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/editUser.html'
	});
});

app.controller('AdminCtrl', function($scope, $state, $stateParams, AdminFactory) {
	$scope.editUser = function (email) {
		AdminFactory.getUser(email).then(function (user) {
			var user = $stateParams.user.email;
			//how do we make the state below pull in the $scope.user data? /:user
			$state.go('admin.editUser', { user: user});
		});
	};
});

app.factory('AdminFactory', function($http) {
	return {
		getUser: function(email) {
			$http.get('/admin', { params: { email: email } }
			);
		}
	};
});