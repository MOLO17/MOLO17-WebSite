molo.controller('mainController', function($scope, $http, weatherFactory, weatherService, coordinatesFactory, coordinatesService, projectConsts) {

	var vm;
	vm = this;
	var linearDistanceMiles;
	var windowWidth;

	var userPositionDecimal;
	vm.userPositionDMS;

	
	function findMoloWeather() {
		weatherFactory.getWeather(function(err, response) {
			if(err) {
				console.log(err)
				return;
			} 
			weatherService.setWeather(response)
			console.log(weatherService.getWeather());
		})
	}
	findMoloWeather();


	function findUserCoords() {
		coordinatesFactory.getCoords(function(err, result) {

			if(result) {
				coordinatesService.setCoords(result.latitude, result.longitude);
				
				vm.userPositionDecimal = coordinatesService.getCoords();
				console.log(vm.userPositionDecimal);

				linearDistanceMiles = Math.ceil(coordinatesService.distance(vm.userPositionDecimal.latitude, 
						vm.userPositionDecimal.longitude) / 1.852);
				console.log('Distance: ' + linearDistanceMiles + ' nautic miles');

				vm.userPositionDMS = {
					'latitude': coordinatesService.decimalToDMS(vm.userPositionDecimal.latitude),
					'longitude': coordinatesService.decimalToDMS(vm.userPositionDecimal.longitude)
				}
				console.log(vm.userPositionDMS)
	
			} else {
				console.log(err)
			}
		})
	}
	findUserCoords();


	//Ship animation
	windowWidth = $(window).width();
	$('.ship_1').animate({right: windowWidth}, 3000, function() {
		$('.ship_1').animate({right: 50}, 3000);
	});


});