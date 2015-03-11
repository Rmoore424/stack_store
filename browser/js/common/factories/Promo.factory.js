'use strict';
app.factory('PromoFactory', function () {
	return {
		promoCheck: function(code) {
			console.log("called promoCheck");
			var promos = ["spring", "beach", "outerspace", "backintime"];
			var cleanCode = code.toLowerCase().trim();
			if (promos.indexOf(cleanCode) != -1) {
				return true;
			}
		}
	};
});