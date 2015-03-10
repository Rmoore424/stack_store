'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/myAccount',
        controller: 'EditUserCtrl',
        templateUrl: 'js/my-account/my-account.html'
    });
});

app.controller('EditUserCtrl', function ($scope, AuthService, UserFactory) {
	AuthService.getLoggedInUser().then(function (responseObj) {
		console.log(responseObj);
		//$scope.toEdit = responseObj.user;
	});

	$scope.editOne = function (oneToEdit) {
		UserFactory.updateUser(oneToEdit).then(function (user) {
			$state.go('myAccount');
			$scope.toEdit = user;
			alert('Successfully Edited');
		});
	};
});

