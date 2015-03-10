'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/myAccount',
        controller: 'EditUserCtrl',
        templateUrl: 'js/my-account/my-account.html'
    });
});

app.controller('EditUserCtrl', function ($scope, $state, $cookieStore, AuthService, UserFactory, UserStatusFactory) {

	AuthService.getLoggedInUser().then(function (responseObj) {
		$scope.user = responseObj.user;
	});

	$scope.editOne = function (userToEdit) {
		UserFactory.updateUser(userToEdit).then(function (user) {
			$state.go('myAccount');
			$scope.user = user;
			alert('Successfully Edited');
		});
	};

	$scope.deleteOne = function (userToDelete) {
			UserFactory.deleteUser(userToDelete).then(function (user) {
				$state.go('signup');
				AuthService.logout();
				UserStatusFactory.isLoggedIn = false;
        		UserStatusFactory.isAdmin = false;
        		$cookieStore.remove('cart');
			});
		alert('Successfully Deleted');
	};
});

