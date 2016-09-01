
molo.controller('footerController', function($scope) {

	var vm;
	var amazonText;
	var herokuText;
	var zyxelText;
	var watchguardText;
	vm = this;
	
	vm.string1 = 'Soluzioni Web Elastiche';
	vm.string2 = 'Applicativi Mobile-Oriented';
	vm.string3 = 'Infrastrutture Cloud';
	vm.github = 'Contribuisci al progetto su';

	vm.partnerText;
	amazonText = 'Piattaforma di servizi cloud in grado di offrire con sicurezza e scalabilità storage di database, distribuzione di contenuti e funzionalità.'; 
	herokuText = 'Piattaforma di programmazione che permette alle aziende di creare, rilasciare, monitorare e scalare applicazioni, Heroku è il modo più veloce per passare dall’idea al progetto.';
	zyxelText = 'Produttore di apparati per il networking, il wireless, la security e i sistemi di accesso ad internet in grado di migliorare la connettività delle applicazioni multimediali.';
	watchguardText = 'Con sede a Seattle, WatchGuard ha implementato in tutto il mondo quasi un milione di appliance integrate e multifunzione per la gestione delle minacce, sia nelle piccole e medie imprese, sia nelle grandi aziende distribuite.';


	//On mouseover, this function is triggered and changes dinamicalli the text below the images
	$scope.changeText = function(sponsor) {

		if(sponsor === 'amazon')
			return vm.partnerText = amazonText;

		if(sponsor === 'heroku')
			return vm.partnerText = herokuText;

		if(sponsor === 'zyxel')
			return vm.partnerText = zyxelText;

		if(sponsor === 'watchguard')
			return vm.partnerText = watchguardText;		
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