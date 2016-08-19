
molo.controller('indexController', function($scope) {


	function loadView() {

		var hour = new Date().getHours();

		if(hour >= 6 && hour <= 11) {
			$scope.moment = 'morning';
			console.log('morning view loaded');
			return
		}

		if(hour >= 12 && hour <= 18) {
			$scope.moment = 'afternoon';
			console.log('afternoon view loaded');
			return
		}

		if(hour >= 19 && hour <= 21) {
			$scope.moment = 'evening';
			console.log('evening view loaded');
			return
		}

		//For night view loading
		$scope.moment = 'night';
		console.log('night view loaded');

	}
	loadView();


});