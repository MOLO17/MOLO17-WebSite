
molo.controller('footerController', function($scope) {

	var vm;
	vm = this;
	
	vm.string1 = 'Soluzioni Web Elastiche';
	vm.string2 = 'Applicativi Mobile-Oriented';
	vm.string3 = 'Infrastrutture Cloud';
	vm.github = 'Contribuisci al progetto su';



//-------------------------------------PAGES LOGIC----------------------------------------------------

	$scope.amazon = true;
	$scope.heroku = false;
	$scope.zyxel = false;
	$scope.watchguard = false;

	$scope.currentSponsorIndex = 0;


	//On mouseover, this function is triggered and changes dinamically the text below the images
	$scope.changeText = function(sponsor) {

		if(sponsor === 'amazon') {
			$scope.amazon = true;
			$scope.heroku = false;
			$scope.zyxel = false;
			$scope.watchguard = false;
			$scope.currentSponsorIndex = 0;
			return
		}
			

		if(sponsor === 'heroku') {
			$scope.amazon = false;
			$scope.heroku = true;
			$scope.zyxel = false;
			$scope.watchguard = false;
			$scope.currentSponsorIndex = 1;
			return
		}
			

		if(sponsor === 'zyxel') {
			$scope.amazon = false;
			$scope.heroku = false;
			$scope.zyxel = true;
			$scope.watchguard = false;
			$scope.currentSponsorIndex = 2;
			return
		}
			

		if(sponsor === 'watchguard') {
			$scope.amazon = false;
			$scope.heroku = false;
			$scope.zyxel = false;
			$scope.watchguard = true;
			$scope.currentSponsorIndex = 3;
			return
		}
					
	}


	// function translations() {

	// 	var language = navigator.language || navigator.userLanguage;
		
	// 	if(language === 'en-US') {
	// 		$translate.use('en')
	// 	} else {
	// 		$translate.use('it')
	// 	}

	// };
	// translations();

});