'use strict'
	
molo.controller('mainController', function($scope, $http, $timeout, $interval, $rootScope, $cookies, $translate, weatherFactory, weatherService, coordinatesFactory, coordinatesService, projectConsts) {

	var vm;
	vm = this;
	vm.linearDistanceMiles;
	vm.weather;
	vm.errorMessage;
	vm.requestMessage = 'Da dove arrivi, mariaio?';


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
	// dayMilliseconds = 1000 * 60 * 60 * 24;
	// $interval(function() { 
	// 	vm.landing -= 1;
	// },dayMilliseconds);

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
			//console.log(weatherService.getWeather());
			vm.weather = weatherService.getWeather();
		})
	}

	
	function findUserCoords() {
		coordinatesFactory.getCoords(function(err, result) {

			if(result) {
				findMoloWeather();
				coordinatesService.setCoords(result.latitude, result.longitude);
				
				vm.userPositionDecimal = coordinatesService.getCoords();
				//console.log(vm.userPositionDecimal);

				vm.linearDistanceMiles = Math.ceil(coordinatesService.distance(vm.userPositionDecimal.latitude, 
						vm.userPositionDecimal.longitude) * 0.54);
				//console.log('Distance: ' + vm.linearDistanceMiles + ' nautic miles');

				vm.userPositionDMS.latitude = coordinatesService.decimalToDMS(vm.userPositionDecimal.latitude),
				vm.userPositionDMS.longitude = coordinatesService.decimalToDMS(vm.userPositionDecimal.longitude)
				//console.log(vm.userPositionDMS)

				$scope.showCompass = true;
				vm.requestMessage = 'Caricamento ..';

				//Delay foo compass visualization
				$timeout(function() {
					$scope.showCompass = !$scope.showCompass
					$scope.showText = true;
				}, 2500)
				
			} else {
				console.log(err)
				vm.errorMessage = err.message;
				$scope.showCompass = false;
				$scope.showErrMessage = true;
			}
		})
	}
	//findUserCoords();
	
	
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
		
		var _timing = Math.floor(((Math.random() * 5) + 25) * 1000);
		setTimeout(randomElementWithAnimation.bind(null,element),_timing)

	}

	function randomElementWithAnimation(element) {

		if(!element || !element.length) return;
		
		var _timing = Math.floor((Math.random() * 3 + 1) * 1000);

		var _minPosition = 100
		_minPosition += element.height()

		var $el = element

		$el.animate({opacity:0},_timing,function() {

			var $_el = $(this)

			$_el.removeClass("animate-transition")
			$_el.css({"-webkit-transform":"scale("+"1"+")","-moz-transform":"scale("+"1"+")","transform":"scale("+"1"+")"})
			$_el.addClass("animate-transition")

			var _marginLeft = $(window).width() - $_el.width()
			var _marginTop = $('.wave.wave-1').offset().top

			var _lightHouseTop = $(".lighthouse").offset().top
			var _lightHouseHeight = $(".lighthouse").height()
			
			var _lightHouseLeft = $(".lighthouse").offset().left
			var _lightHouseWidth = $(".lighthouse").width()

			var _x = 0;
			var _y = 0;

			var _conditionCheck = false

			// do {
				_y = Math.floor((Math.random() * (_marginTop - (2*_minPosition))) + _minPosition )
				_x = Math.floor((Math.random() * (_marginLeft - (2*_minPosition))) + _minPosition )

				// var fConditionCheck = (((_x+$_el.width()) >= _lightHouseLeft)&&(_x <= (_lightHouseLeft+_lightHouseWidth)))
				// var sConditionCheck = (((_y+$_el.height()) >= _lightHouseTop)&&(_y <= (_lightHouseTop+_lightHouseHeight)))

				// _conditionCheck = (((!fConditionCheck && !sConditionCheck)||(fConditionCheck^sConditionCheck))?true:false)

			// } while(!_conditionCheck);

			$_el.css({left:_x,top:_y,display:'block',opacity:0})
			chageElementSize($_el,_timing);
		})
	}

	function generateRandomSeagulls() {

		var _seagulls = [".seagull.seagull_1",".seagull.seagull_2",".seagull.seagull_3",".cloud_1",".cloud_2" /*, ".alien"*/];

		for(var i=0;i<_seagulls.length;i++)
			setTimeout(randomElementWithAnimation.bind(null,$(""+_seagulls[i])),((Math.random()*(Math.random() * 3)+1)*1000))
	};

	generateRandomSeagulls();

//-------------------------------------------------------------------------

	//Ships animation logic

	//Animate the boat with infinite movement
	function moveBoat(boat) {

		var windowWidth = $(window).width();

		boat.animate({right: windowWidth + boat.width()}, 30000, "linear", function() {
			boat.toggleClass('backwards')
			boat.animate({right: - boat.width() - 100}, 30000, "linear", function() {
				boat.toggleClass('backwards')
				moveBoat(boat);
			});
		});
	}


	//Sets the boat to animate depending on day moment
	function whichBoat() {

		//moment is a string that rappresents the part of the day when the page is visited. This value can be retrived for the parent controller (indexController) instead of call another time the service
		var moment = $scope.$parent.moment
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


//----------------------------------------------------------------------


	window.console && console.log("%c\n   *******        *****            ***   ****    ******     ************* \n ***********     ******           ****  ****    *******     ************* \n*************  ********          ****  *****    *******     ************  \n****     **************         ****  *****        ****            ****   \n***      ********  ****        *****  ****         ****           *****   \n***      ******    ****       *****  ****          ****          *****    \n***      ****      ****       ****  ****           ****         *****     \n***      ****      ****      ****  ****            ****         ****      \n***      ****      ****     ****  *****            ****        ****       \n***      ****      ****    ****  *****             ****       ****        \n***      ****      ****   *****  ****              ****      *****        \n***      ****      ****  *****  ****               ****     *****         \n***       ***      ****  ****   ***                 ***     ****          \n                                                                          \n", "font-family: Menlo, monospace");
	
	console.log("We're hiring! If you reach this point send a cv to cv@molo17.com")

});