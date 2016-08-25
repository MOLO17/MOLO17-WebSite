
var molo = angular.module('MoloWebsite', ['ngGeolocation', 'ngCookies']);


molo.run(function(coordinatesService) {


	function loadView() {

		var hour = new Date().getHours();


		if(hour >= 6 && hour <= 8) {
			coordinatesService.setMoment('morning')
			return console.log('morning view loaded');
		}

		if(hour >= 9 && hour <= 17) {
			coordinatesService.setMoment('day')
			return console.log('day view loaded');
		}

		if(hour >= 18 && hour <= 19) {
			coordinatesService.setMoment('afternoon')
			return console.log('afternoon view loaded');
		}

		if(hour >= 20 && hour <= 22) {
			coordinatesService.setMoment('evening')
			return console.log('evening view loaded');
		}

		//For night loading
		coordinatesService.setMoment('night')
		console.log('night view loaded');
	}
	loadView();

})