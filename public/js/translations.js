
molo.config(function($translateProvider) {
    
    $translateProvider.preferredLanguage('it');
	$translateProvider.fallbackLanguage('en');

    $translateProvider.translations('en', {
    	'string1': 'Elastic Web Solutions',
    	'string2': 'Mobile-Oriented Apps',
    	'string3': 'Cloud Infrastructures',
    	'github': 'Fork this project on'
  	});

  	$translateProvider.translations('it', {
    	'string1': 'Soluzioni Web Elastiche',
    	'string2': 'Applicativi Mobile-Oriented',
    	'string3': 'Infrastrutture Cloud',
    	'github': 'Contribuisci al progetto su'
  	})

  	$translateProvider.useSanitizeValueStrategy('sanitize');
})