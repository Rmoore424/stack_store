'use strict';
app.factory('MathFactory', function () {
	return {
		getTotalPrice: function (items) {
	    	var total = 0;
		    for(var i = 0; i < items.length; i++){
		        var item = items[i];
		        if (item) {
		        	total += (item.item.price * item.quantity);
		        }
		    }
			return total;
		}
	}
});