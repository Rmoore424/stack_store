'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/myAccount',
        controller: 'EditUserCtrl',
        templateUrl: 'js/my-account/my-account.html'
    });

    $stateProvider.state('myAccount.orders', {
    	templateUrl: '/js/admin/orders.html'
    });
});

app.controller('EditUserCtrl', function ($scope, $state, $cookieStore, AuthService, UserFactory, UserStatusFactory, OrderFactory) {

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

	$scope.showMyOrders = function (user) {
		OrderFactory.getUserOrders(user._id).then(function (orders) {
			$scope.orders = orders;
			$state.go('myAccount.orders');
		});
	};
//function works, but no real reason to delete yourself from the site --RICH
	// $scope.deleteOne = function (userToDelete) {
	// 		UserFactory.deleteUser(userToDelete).then(function (user) {
	// 			$state.go('signup');
	// 			AuthService.logout();
	// 			UserStatusFactory.isLoggedIn = false;
 //        		UserStatusFactory.isAdmin = false;
 //        		$cookieStore.remove('cart');
	// 		});
	// 	alert('Successfully Deleted');
	// };
});

