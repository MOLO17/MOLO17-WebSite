
molo.controller('sectionsDayController', function($scope, $http) {

	vm = this;
	var vm;
	var linearDistance;
	var moloWeatherAPIUrl;

	vm.moloPosition = {'lat': 46.2423675, 'lon': 13.1363982}
	vm.userPosition = {};
	moloWeatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?q=zoppola&units=metric&APPID=085f3d2126fc28d1c4b6f0b6d131111e';


	//Ship animation
	var windowWidth = $(window).width();
	$('.ship_1').animate({right: windowWidth}, 3000, function() {
		$('.ship_1').animate({right: 50}, 3000);
	});


	//return distance from 2 coordinates
	function distance(lat2, lon2) {
		var lat1 = vm.moloPosition.lat;
		var lon1 = vm.moloPosition.lon;

  		var p = 0.017453292519943295;
		var c = Math.cos;
  		var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;

  		return 12742 * Math.asin(Math.sqrt(a));
	}


	//Geolocation logic
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
      		$scope.$apply(function(){
      			vm.userPosition = {'lat': position.coords.latitude, 'lon': position.coords.longitude}
      			console.log(vm.userPosition)
      			linearDistance = Math.ceil(distance(vm.userPosition.lat, vm.userPosition.lon))
      			console.log('Distanza: ' + linearDistance + ' km')
       		 	//$scope.position = position;
      		})
    	})
	}


	//Get molo_17 weather
	function getMoloWeather(APIurl) {

		$http.get(APIurl)
			.then(function(response) {
				var weather = response.data.weather[0].description;
				console.log(weather);
			})
			.catch(function(err) {
				console.log(err)
			})
	}

	getMoloWeather(moloWeatherAPIUrl)

});


molo.component('sectionDay', {
	templateUrl: "/sections/day.html",
    controller: "sectionsDayController",
    controllerAs: "vm",
    bindings: {} 

})