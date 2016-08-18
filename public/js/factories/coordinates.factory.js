
molo.factory('coordinatesFactory', function() {

	var coordinatesFactory = {};

	coordinatesFactory.getCoords = function(completionHandler) {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				completionHandler(true, position)
			})
		}
	};

	return coordinatesFactory;
});