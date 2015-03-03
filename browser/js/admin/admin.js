//promote other User accounts to also having Admin status

//Change the password of any user

'use strict';

app.controller('adminCtrl', function($scope, adminFactory) {
	$scope.editUser = function (email) {
		adminFactory.getUser(email).then()
	}
})

app.factory('adminFactory', function($http) {
	return {
		getUser: function(email) {
			$http.get('/admin/editUser', { params: { email: email }}
			});
		}
	};
});