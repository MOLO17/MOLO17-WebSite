
molo.controller('sectionsDayController', function($scope, $http, weatherFactory, weatherService, coordinatesFactory, coordinatesService, projectConsts) {

	vm = this;
	var vm;
	var linearDistance;
	var windowWidth;

	vm.moloPosition = {
		'lat': projectConsts.molo_17Coords.latitude,
	 	'lon': projectConsts.molo_17Coords.longitude
	}

	console.log()

	vm.userPosition = {};


	//Ship animation
	windowWidth = $(window).width();
	$('.ship_1').animate({right: windowWidth}, 3000, function() {
		$('.ship_1').animate({right: 50}, 3000);
	});


	function findMoloWeather() {
		weatherFactory.getWeather(function(err, response) {

			if(err) {
				console.log(err)
			} else {
				weatherService.setWeather(response)
				console.log(weatherService.getWeather());
				
			}
		})
	}

	findMoloWeather();


	function findUserCoords() {
		coordinatesFactory.getCoords(function(err, result) {

			if(result) {
				coordinatesService.setCoords(result.coords.latitude, result.coords.longitude);
				//console.log(coordinatesService.getCoords());
				vm.userPosition = coordinatesService.getCoords();
				console.log(vm.userPosition);
			} else {
				console.log(err)
			}
		})
	}

	findUserCoords();


	//Distance from 2 coordinates
	function distance(lat2, lon2) {
		var lat1 = vm.moloPosition.lat;
		var lon1 = vm.moloPosition.lon;

  		var p = 0.017453292519943295;
		var c = Math.cos;
  		var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;

  		return 12742 * Math.asin(Math.sqrt(a));
	}

	linearDistance = distance(vm.userPosition.latitude, vm.userPosition.longitude);
	console.log("Distanza: " + linearDistance);

});


molo.component('sectionDay', {
	templateUrl: "/sections/day.html",
    controller: "sectionsDayController",
    controllerAs: "vm",
    bindings: {} 

})