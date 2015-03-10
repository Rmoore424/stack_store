'use strict';
app.factory('UserStatusFactory', function () {
	return {
		isLoggedIn: false,
		isAdmin: false
	}
});