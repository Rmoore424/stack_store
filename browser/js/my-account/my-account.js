'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/myAccount',
        controller: 'EditUserCtrl',
        templateUrl: 'js/my-account/my-account.html'
    });
});

app.controller('EditUserCtrl', function ($scope, $state, $kookies, AuthService, UserFactory, UserStatusFactory) {

	AuthService.getLoggedInUser().then(function (responseObj) {
		$scope.toEdit = responseObj.user;
	});

	$scope.editOne = function (userToEdit) {
		UserFactory.updateUser(userToEdit).then(function (user) {
			$state.go('myAccount');
			$scope.toEdit = user;
			alert('Successfully Edited');
		});
	};

	$scope.deleteOne = function (userToDelete) {
			UserFactory.deleteUser(userToDelete).then(function (user) {
				$state.go('signup');
				AuthService.logout();
				UserStatusFactory.isLoggedIn = false;
        		UserStatusFactory.isAdmin = false;
        		$kookies.remove('cart');
        		$kookies.remove('user');
			});
		alert('Successfully Deleted');
	};
});

