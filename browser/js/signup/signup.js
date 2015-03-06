'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupController',
		templateUrl: 'js/signup/signup.html'
	});
});


app.controller('SignupController', function ($scope, SignupFactory) {
	$scope.signup = function (user) {
		UserFactory.signupUser(user).then(function (responseObj) {
			console.log(responseObj);
		});
	};
});