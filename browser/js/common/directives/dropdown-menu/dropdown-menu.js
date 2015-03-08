'use strict';
app.directive('dropdown', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			click: '&',
			title: '='
		},
		templateUrl: 'js/common/directives/dropdown-menu/dropdown-menu.html'
	};
});