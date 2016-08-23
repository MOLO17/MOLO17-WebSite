'use strict'
	
molo.controller('mainController', function($scope, $http, $interval, weatherFactory, weatherService, coordinatesFactory, coordinatesService, projectConsts) {

	var vm;
	vm = this;
	vm.linearDistanceMiles;
	vm.weather;

	var dayMilliseconds;
	vm.landing = 10;

	var windowWidth;

	$scope.weather = false;
	$scope.position = false;

	var userPositionDecimal;
	vm.userPositionDMS = {}

	//Used for landing countdown visualization
	dayMilliseconds = 1000 * 60 * 60 * 24;
	$interval(function() { 
		vm.landing -= 1;
	},dayMilliseconds);
	

	function findMoloWeather() {
		weatherFactory.getWeather(function(err, response) {
			if(err) {
				console.log(err)
				return;
			} 
			weatherService.setWeather(response)
			$scope.weather = true;
			console.log(weatherService.getWeather());
			vm.weather = weatherService.getWeather();
		})
	}
	findMoloWeather();


	function findUserCoords() {
		coordinatesFactory.getCoords(function(err, result) {

			if(result) {
				coordinatesService.setCoords(result.latitude, result.longitude);
				
				vm.userPositionDecimal = coordinatesService.getCoords();
				console.log(vm.userPositionDecimal);

				vm.linearDistanceMiles = Math.ceil(coordinatesService.distance(vm.userPositionDecimal.latitude, 
						vm.userPositionDecimal.longitude) / 1.852);
				console.log('Distance: ' + vm.linearDistanceMiles + ' nautic miles');

				vm.userPositionDMS.latitude = coordinatesService.decimalToDMS(vm.userPositionDecimal.latitude),
				vm.userPositionDMS.longitude = coordinatesService.decimalToDMS(vm.userPositionDecimal.longitude)
				console.log(vm.userPositionDMS)

				//Delay
				$interval(function() {
					$scope.position = true;
				},5000)
				
			} else {
				console.log(err)
			}
		})
	}
	findUserCoords();


	//Ship animation
	windowWidth = $(window).width();
	$('.ship_1').animate({right: windowWidth}, 20000, function() {
		$('.ship_1').addClass('.rotateY')
		$('.ship_1').animate({right: 50}, 20000);
	});


});