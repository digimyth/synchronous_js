$('#button2').click(function() {
	var requestCallback = new MyRequestsCompleted2({
		numRequest: 3
	});
	$.ajax({
		url: '/echo/html/',
		success: function(data) {
			requestCallback.addCallbackToQueue(true, function() {
				alert('Im the first callback');
			});
		}
	});
	$.ajax({
		url: '/echo/html/',
		success: function(data) {
			requestCallback.addCallbackToQueue(true, function() {
				alert('Im the second callback');
			});
		}
	});
	$.ajax({
		url: '/echo/html/',
		success: function(data) {
			requestCallback.addCallbackToQueue(true, function() {
				alert('Im the third callback');
			});
		}
	});
});

var MyRequestsCompleted2 = (function() {
	var numRequestToComplete, 
		requestsCompleted, 
		callBacks, 
		singleCallBack; 

	return function(options) {
		if (!options) options = {};

		numRequestToComplete = options.numRequest || 0;
		requestsCompleted = options.requestsCompleted || 0;
		callBacks = [];
		var fireCallbacks = function () {
			alert("we're all complete");
			for (var i = 0; i < callBacks.length; i++) callBacks[i]();
		};
		if (options.singleCallback) callBacks.push(options.singleCallback);

		

		this.addCallbackToQueue = function(isComplete, callback) {
			if (isComplete) requestsCompleted++;
			if (callback) callBacks.push(callback);
			if (requestsCompleted == numRequestToComplete) fireCallbacks();
		};
		this.requestComplete = function(isComplete) {
			if (isComplete) requestsCompleted++;
			if (requestsCompleted == numRequestToComplete) fireCallbacks();
		};
		this.setCallback = function(callback) {
			callBacks.push(callBack);
		};
	};
})();