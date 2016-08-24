
molo.factory('coordinatesFactory', function($geolocation, $rootScope) {

	var coordinatesFactory = {};
	var coordinates;


	coordinatesFactory.getCoords = function(completionHandler) {
		$geolocation.getCurrentPosition().then(function(position) {
	
			$rootScope.$emit('geopositionConfirmed');

            coordinates = {
				'latitude': position.coords.latitude,
				'longitude': position.coords.longitude
			}
			completionHandler(true, coordinates)

         }).catch(function(err) {
         	completionHandler(err)
         })
	}

	return coordinatesFactory;
});