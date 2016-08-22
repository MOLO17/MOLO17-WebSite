'use strict';

var molo = angular.module('MoloWebsite', []);


molo.run(function(coordinatesService) {

	function loadView() {

		var hour = new Date().getHours();

		if(hour >= 6 && hour <= 11) {
			coordinatesService.setMoment('morning')
			return console.log('morning view loaded');
		}

		if(hour >= 12 && hour <= 18) {
			//$scope.moment = 'afternoon'
			coordinatesService.setMoment('afternoon')
			return console.log('afternoon view loaded');
		}

		if(hour >= 19 && hour <= 21) {
			//$scope.moment = 'evening';
			coordinatesService.setMoment('evening')
			return console.log('evening view loaded');
		}

		//For night loading
		//$scope.moment = 'night';
		coordinatesService.setMoment('night')
		console.log('night view loaded');
	}
	loadView();

})