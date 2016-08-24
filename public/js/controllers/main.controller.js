'use strict'
	
molo.controller('mainController', function($scope, $http, $timeout, $interval, $rootScope, weatherFactory, weatherService, coordinatesFactory, coordinatesService, projectConsts) {

	var vm;
	vm = this;
	vm.linearDistanceMiles;
	vm.weather;
	vm.errorMessage;

	var dayMilliseconds;
	vm.landing = 10;

	var windowWidth;

	$scope.showErrMessage = false;
	$scope.showCompass = false;
	$scope.showText = false;

	$rootScope.$on('geopositionConfirmed', function() {
		$scope.showInfo = true;
	})


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
			console.log(weatherService.getWeather());
			vm.weather = weatherService.getWeather();
		})
	}
	

	function findUserCoords() {
		coordinatesFactory.getCoords(function(err, result) {

			if(result) {
				findMoloWeather();
				coordinatesService.setCoords(result.latitude, result.longitude);
				
				vm.userPositionDecimal = coordinatesService.getCoords();
				console.log(vm.userPositionDecimal);

				vm.linearDistanceMiles = Math.ceil(coordinatesService.distance(vm.userPositionDecimal.latitude, 
						vm.userPositionDecimal.longitude) * 0.54);
				console.log('Distance: ' + vm.linearDistanceMiles + ' nautic miles');

				vm.userPositionDMS.latitude = coordinatesService.decimalToDMS(vm.userPositionDecimal.latitude),
				vm.userPositionDMS.longitude = coordinatesService.decimalToDMS(vm.userPositionDecimal.longitude)
				console.log(vm.userPositionDMS)

				$scope.showCompass = true;
				//Delay foo compass visualization
				$timeout(function() {
					$scope.showCompass = !$scope.showCompass
					$scope.showText = true;
				},20000)
				
			} else {
				console.log(err)
				$scope.showInfo = true;
				$scope.showCompass = true;
				
				$timeout(function() {
					$scope.showCompass = false;
					vm.errorMessage = err.message;
					$scope.showErrMessage = true;
				},1500)
			}
		})
	}
	findUserCoords();

	//FARE random

	

	function moveDiv() {

		var random1 = Math.floor((Math.random() * 6 + 1) * 1000);
		var random2 = Math.floor((Math.random() * 6 + 1) * 1000);
		var random3 = Math.floor((Math.random() * 6 + 1) * 1000);
		//console.log(random)

	    var $span = $(".seagull.seagull_1");
	    var $span2 = $(".seagull.seagull_2");
	    var $span3 = $(".seagull.seagull_3");

	    var $highestWave = $('.wave.wave-1');

	    $span.fadeOut(random1, function() {
	        var maxLeft = $(window).width() - $span.width();
	        var maxTop = $highestWave.offset().top
	        var leftPos = Math.floor(Math.random() * (maxLeft + 1))
	        var topPos = Math.floor(Math.random() * (maxTop + 1))
	     
	        $span.css({ left: leftPos, top: topPos }).fadeIn(random1);
	    });

	    $span2.fadeOut(random2, function() {
	        var maxLeft = $(window).width() - $span2.width();
	        var maxTop = $highestWave.offset().top
	        var leftPos = Math.floor(Math.random() * (maxLeft + 1))
	        var topPos = Math.floor(Math.random() * (maxTop + 1))
	     
	        $span2.css({ left: leftPos, top: topPos }).fadeIn(random2);
	    });

	    $span3.fadeOut(random3, function() {
	        var maxLeft = $(window).width() - $span3.width();
	        var maxTop = $highestWave.offset().top;
	        var leftPos = Math.floor(Math.random() * (maxLeft + 1))
	        var topPos = Math.floor(Math.random() * (maxTop + 1))
	     
	        $span3.css({ left: leftPos, top: topPos }).fadeIn(random3);
	    });
	};

	moveDiv();
	setInterval(moveDiv, 5000);


	//Ship animation
	/*windowWidth = $(window).width();
	$('.sailboat').animate({right: windowWidth}, 30000, function() {
		$('.sailboat').addClass('.rotateY')
		$('.sailboat').animate({right: 50}, 30000);
	});*/

});