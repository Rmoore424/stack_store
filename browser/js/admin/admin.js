//promote other User accounts to also having Admin status

//Change the password of any user

'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('admin', {
		url: '/admin',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/admin.html'
	});
});

app.controller('AdminCtrl', function($scope, $state, AdminFactory) {
	$scope.editUser = function (email) {
		adminFactory.getUser(email).then(function (user) {
			$state.go('editUser')
		})
	}
})

app.factory('AdminFactory', function($http) {
	return {
		getUser: function(email) {
			$http.get('/admin', { params: { email: email }}
			});
		}
	};
});