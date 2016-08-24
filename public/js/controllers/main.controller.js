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

			$scope.showInfo = true;

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
				}, 40000)
				
			} else {
				console.log(err)
				vm.errorMessage = err.message;
				$scope.showErrMessage = true;
			}
		})
	}
	findUserCoords();

	
//------------------------------------ANIMATIONS LOGIC-------------------------------
	

	function chageElementSize(element,timing) {

		if(!timing) timing = 900
		else timing -= 100

		var spaceAvailable = $('.wave.wave-1').offset().top;
		var _y = element.offset().top;
		var scaleFactor = parseFloat(((_y * 2) / spaceAvailable).toFixed(2));

		scaleFactor = Math.abs(scaleFactor - 2);
		var _width = element.width() * scaleFactor;
		var _height = element.height() * scaleFactor;
		element.animate({opacity:1},timing);
		element.css({"-webkit-transform":"scale("+scaleFactor+")","-moz-transform":"scale("+scaleFactor+")","transform":"scale("+scaleFactor+")"})
	}


	function generateRandomSeagulls() {

		var random1 = Math.floor((Math.random() * 6 + 1) * 1000);
		var random2 = Math.floor((Math.random() * 6 + 1) * 1000);
		var random3 = Math.floor((Math.random() * 6 + 1) * 1000);

	    var $seagull_1 = $(".seagull.seagull_1");
	    var $seagull_2 = $(".seagull.seagull_2");
	    var $seagull_3 = $(".seagull.seagull_3");
	    var $highestWave = $('.wave.wave-1');

	    var minPosition = 100

	    $seagull_1.animate({opacity:0},random1, function() {

	    	$seagull_1.removeClass("animate-transition")
	    	$seagull_1.css({"-webkit-transform":"scale("+"1"+")","-moz-transform":"scale("+"1"+")","transform":"scale("+"1"+")"})
	    	$seagull_1.addClass("animate-transition")

	        var maxLeft = $(window).width() - $seagull_1.width();
	        var maxTop = $highestWave.offset().top
	        var leftPos = Math.floor((Math.random() * (maxLeft - minPosition)) + minPosition )
	        var topPos = Math.floor((Math.random() * (maxTop - minPosition)) + minPosition )


	  		$seagull_1.css({ left: leftPos, top: topPos, display:'inline-block', opacity:0 })
	  		chageElementSize($seagull_1,random1);
	    });

	    $seagull_2.animate({opacity:0},random2, function() {

			$seagull_2.removeClass("animate-transition")
	    	$seagull_2.css({"-webkit-transform":"scale("+"1"+")","-moz-transform":"scale("+"1"+")","transform":"scale("+"1"+")"})
  			$seagull_2.addClass("animate-transition")

	        var maxLeft = $(window).width() - $seagull_2.width();
	        var maxTop = $highestWave.offset().top
	       	var leftPos = Math.floor((Math.random() * (maxLeft - minPosition)) + minPosition )
	        var topPos = Math.floor((Math.random() * (maxTop - minPosition)) + minPosition )
	     	
	     	
	        $seagull_2.css({ left: leftPos, top: topPos, display:'inline-block', opacity:0 })
	        chageElementSize($seagull_2,random2);
	    });

	    $seagull_3.animate({opacity:0},random3, function() {
			
			$seagull_3.removeClass("animate-transition")
	    	$seagull_3.css({"-webkit-transform":"scale("+"1"+")","-moz-transform":"scale("+"1"+")","transform":"scale("+"1"+")"})
  			$seagull_3.addClass("animate-transition")

	        var maxLeft = $(window).width() - $seagull_3.width();
	        var maxTop = $highestWave.offset().top;
	        var leftPos = Math.floor((Math.random() * (maxLeft - minPosition)) + minPosition )
	        var topPos = Math.floor((Math.random() * (maxTop - minPosition)) + minPosition )
	     	
	     	
	        $seagull_3.css({ left: leftPos, top: topPos, display:'inline-block', opacity:0 })
	        chageElementSize($seagull_3,random3);
	    });
	};

	generateRandomSeagulls();
	setInterval(generateRandomSeagulls, 13000);



	//Ship animation
	windowWidth = $(window).width();
	$('.sailboat').animate({right: windowWidth}, 30000, function() {
		$('.sailboat').addClass('.rotateY')
		$('.sailboat').animate({right: 50}, 30000);
	});

});