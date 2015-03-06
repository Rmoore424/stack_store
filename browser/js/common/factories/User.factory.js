app.factory('UserFactory', function($http) {
	return {
		getUser: function(email) {
			return $http.get('/api/user', { params: { email: email } }).then(function (response) {
				return response.data;
			});
		},
		updateUser: function(user) {
			return $http.put('/api/user', user).then(function (response) {
				return response.data;
			});
		},
		deleteUser: function(user) {
			return $http.delete('/api/user', { params: { _id: user._id } }).then(function (response) {
				return response.data;
			});
		},
		signupUser: function (user) {
			return $http.post('/api/user', user).then(function (response) {
				return response.data;
			});
		}
	};
});

//I think this function is obsolete from oauth branch -RICH
// setUser: function () {
//              var self = this;
//              AuthService.getLoggedInUser().then(function (user) {
//                 if (user) {
//                     self.loggedIn = true;
//                 }
//              });
//         } 