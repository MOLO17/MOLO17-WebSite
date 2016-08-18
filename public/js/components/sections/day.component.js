
molo.controller('sectionsDayController', function($scope, $http, weatherFactory, weatherService, coordinatesFactory, coordinatesService, projectConsts) {

	vm = this;
	var vm;
	var linearDistance;
	var windowWidth;


	vm.moloPositionDecimal = {
		'lat': projectConsts.molo_17Coords.latitude,
	 	'lon': projectConsts.molo_17Coords.longitude
	}

	vm.userPositionDecimal = {};
	vm.userPositionDMS = {}


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

				vm.userPositionDecimal = coordinatesService.getCoords();
				console.log(vm.userPositionDecimal);

				linearDistance = Math.ceil(distance(vm.userPositionDecimal.latitude, vm.userPositionDecimal.longitude));
				console.log('Distanza: ' + linearDistance + ' km');

				vm.userPositionDMS = {
					'lat': decimalToDMS(vm.userPositionDecimal.latitude),
					'lon': decimalToDMS(vm.userPositionDecimal.longitude)
				}

				console.log(vm.userPositionDMS)
	
			} else {
				console.log(err)
			}
		})
	}
	findUserCoords();


	//Convert decomal coords to degress, minutes and seconds
	function decimalToDMS (decimalCoord) {
		
		var grades = Math.floor (decimalCoord);
		var minfloat = (decimalCoord - grades) * 60;
		var minutes = Math.floor(minfloat);
		var secfloat = (minfloat - minutes) * 60;
		var seconds = Math.round(secfloat);
		
		if (seconds === 60) {
	 		minutes++;
	 		seconds = 0;
		}

		if (minutes === 60) {
			grades++;
			minutes = 0;
		}

		return ("" + grades + ":" + minutes + ":" + seconds);
	}


	//Distance from 2 coordinates
	function distance(lat2, lon2) {
		var lat1 = vm.moloPositionDecimal.lat;
		var lon1 = vm.moloPositionDecimal.lon;

  		var p = 0.017453292519943295;
		var c = Math.cos;
  		var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;

  		return 12742 * Math.asin(Math.sqrt(a));
	}


	//Ship animation
	windowWidth = $(window).width();
	$('.ship_1').animate({right: windowWidth}, 3000, function() {
		$('.ship_1').animate({right: 50}, 3000);
	});

});


molo.component('sectionDay', {
	templateUrl: "/sections/day.html",
    controller: "sectionsDayController",
    controllerAs: "vm",
    bindings: {} 

})