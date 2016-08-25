'use strict'
	
molo.controller('mainController', function($scope, $http, $timeout, $interval, $rootScope, $cookies, weatherFactory, weatherService, coordinatesFactory, coordinatesService, projectConsts) {

	var vm;
	vm = this;
	vm.linearDistanceMiles;
	vm.weather;
	vm.errorMessage;
	vm.requestMessage = 'Dacci la tua posizione';

	var dayMilliseconds;
	vm.landing = 10;

	var windowWidth;

	$scope.showErrMessage = false;
	$scope.showCompass = true;
	$scope.showText = false;
	$scope.showInfo = true;

	var userPositionDecimal;
	vm.userPositionDMS = {}

	//Used for landing countdown visualization
	dayMilliseconds = 1000 * 60 * 60 * 24;
	$interval(function() { 
		vm.landing -= 1;
	},dayMilliseconds);

/*
	function countdown() {
		//var landingDay = 
		var now = new Date().toDateString();
		console.log(now)
	}
	countdown()
*/	

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

			
			//$scope.showInfo = true;

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
				vm.requestMessage = 'Caricamento ..';
				$('.company_logo').animate({left: 50}, 1500, "linear")

				if($cookies.get('geoposition')) {
					console.log($cookies.get('geoposition'))
					console.log('posizione agganciata')
				} else {
					console.log('posizione NON agganciata')
					$cookies.get('geoposition')
				}

				//Delay foo compass visualization
				$timeout(function() {
					$scope.showCompass = !$scope.showCompass
					$scope.showText = true;
				}, 2500)
				
			} else {
				console.log(err)
				vm.errorMessage = err.message;
				$scope.showCompass = true;
				$scope.showErrMessage = true;
			}
		})
	}
	findUserCoords();

	
//------------------------------------ANIMATIONS LOGIC-------------------------------
	
	//Seagulls animation logic

	function chageElementSize(element, timing) {

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
	        var maxTop = $highestWave.offset().top + 50;
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
	        var maxTop = $highestWave.offset().top + 50;
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
	        var maxTop = $highestWave.offset().top + 50;
	        var leftPos = Math.floor((Math.random() * (maxLeft - minPosition)) + minPosition )
	        var topPos = Math.floor((Math.random() * (maxTop - minPosition)) + minPosition )
	     	
	     	
	        $seagull_3.css({ left: leftPos, top: topPos, display:'inline-block', opacity:0 })
	        chageElementSize($seagull_3,random3);
	    });
	};

	generateRandomSeagulls();
	setInterval(generateRandomSeagulls, 13000);

//-------------------------------------------------------------------------

	//Ships animation logic

	//Animate the boat with infinite movement
	function moveBoat(boat) {

		var windowWidth = $(window).width();

		boat.animate({right: windowWidth + boat.width()}, 30000, "linear", function() {
			boat.toggleClass('backwards')
			boat.animate({right: - boat.width()}, 30000, "linear", function() {
				boat.toggleClass('backwards')
				moveBoat(boat);
			});
		});
	}


	//Sets the boat to animate depending on day moment
	function whichBoat() {

		//var moment = coordinatesService.getMoment();
		var moment = 'evening';
		var boat;

		if(moment === 'morning')
			return moveBoat($('.merchant'));
		
		if(moment === 'day')
			return moveBoat($('.sailboat'));

		if(moment === 'afternoon')
			return moveBoat($('.merchant'));

		if(moment === 'evening')
			return moveBoat($('.speed-boat'));

		if(moment === 'night')
			return moveBoat($('.cruise-ship'));
	}

	whichBoat();

});