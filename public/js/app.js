
var molo = angular.module('MoloWebsite', ['ngGeolocation', 'ngCookies', 'pascalprecht.translate']);


molo.run(function(coordinatesService) {


	function loadView() {

		var hour = new Date().getHours()
		var minutes = new Date().getMinutes()
		var time = [hour, '.', minutes];

		time = time.join()
		time = time.replace(/,/g, "");
		time = parseFloat(time);
		//console.log(hour)
		//console.log(minutes)
		//console.log(time)

		if(time > 6 && time <= 9) {
			coordinatesService.setMoment('morning')
			return console.log('morning view loaded');
		}

		if(time > 9 && time <= 18) {
			coordinatesService.setMoment('day')
			return console.log('day view loaded');
		}

		if(time > 18 && time <= 20) {
			coordinatesService.setMoment('afternoon')
			return console.log('afternoon view loaded');
		}

		if(time > 20 && time <= 22) {
			coordinatesService.setMoment('evening')
			return console.log('evening view loaded');
		}

		//For night loading
		coordinatesService.setMoment('night')
		console.log('night view loaded');
	}
	loadView();

})


molo.config(function($translateProvider) {
    
    $translateProvider.preferredLanguage('it');
	$translateProvider.fallbackLanguage('en');

    $translateProvider.translations('en', {
    	'str1': 'Elastic Web Solutions',
    	'str2': 'Mobile-Oriented Apps',
    	'str3': 'Cloud Infrastructures',
    	'github': 'Fork this project on'
  	});

  	$translateProvider.translations('it', {
    	'str1': 'Soluzioni Web Elastiche',
    	'str2': 'Applicativi Mobile-Oriented',
    	'str3': 'Infrastrutture Cloud',
    	'github': 'Contribuisci al progetto su'
  	})
});