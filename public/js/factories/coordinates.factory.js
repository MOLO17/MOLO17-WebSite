
molo.factory('coordinatesFactory', function($geolocation) {

	var coordinatesFactory = {};
	var coordinates;


	coordinatesFactory.getCoords = function(completionHandler) {
		$geolocation.getCurrentPosition().then(function(position) {

            coordinates = {
				'latitude': position.coords.latitude,
				'longitude': position.coords.longitude
			}

			completionHandler(true, coordinates)
         })
	}

	return coordinatesFactory;
});