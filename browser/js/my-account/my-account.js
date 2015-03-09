'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/myAccount',
        templateUrl: 'js/my-account/my-account.html',
        controller: 'EditUserCtrl',
    });
});

app.controller('EditUserCtrl', function ($scope, AuthService, UserFactory) {
	AuthService.getLoggedInUser().then(function (responseObj) {
		$scope.toEdit = responseObj.user;
	});

	$scope.editOne = function (oneToEdit) {
		UserFactory.updateUser(oneToEdit).then(function (user) {
			$state.go('myAccount');
			$scope.toEdit = user;
			alert('Successfully Edited');
		});
	};
});

