
var molo = angular.module('MoloWebsite', 

	['ngGeolocation', 'ngCookies', 'pascalprecht.translate', 'ngSanitize']);


molo.run(function(coordinatesService) {


	function loadView() {

		var hour = new Date().getHours()
		var minutes = new Date().getMinutes()
		var time = [hour, minutes];

		time = time.join('.')
		time = parseFloat(time);
		//console.log(hour)
		//console.log(minutes)
		//console.log(time)
		//time = 23

		if(time > 6 && time <= 9) {
			coordinatesService.setMoment('morning')
			//console.log('morning view loaded');
			return 
		}

		if(time > 9 && time <= 18) {
			coordinatesService.setMoment('day')
			//console.log('day view loaded');
			return 
		}

		if(time > 18 && time <= 20) {
			coordinatesService.setMoment('afternoon')
			//console.log('afternoon view loaded');
			return 
		}

		if(time > 20 && time <= 22) {
			coordinatesService.setMoment('evening')
			//console.log('evening view loaded');
			return 
		}

		//For night loading
		coordinatesService.setMoment('night')
		//console.log('night view loaded');
	}
	loadView();

});