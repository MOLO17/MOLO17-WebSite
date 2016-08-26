
molo.factory('coordinatesFactory', function($geolocation, $rootScope, $timeout, $cookies) {

	var coordinatesFactory = {};
	var coordinates;


	coordinatesFactory.getCoords = function(completionHandler) {

		if(!$cookies.get('geoposition')) {

			$timeout(function() {

				$geolocation.getCurrentPosition()

					.then(function(position) {
					
						$cookies.put('geoposition', 'position');

			            coordinates = {
							'latitude': position.coords.latitude,
							'longitude': position.coords.longitude
						}

						completionHandler(true, coordinates)
					})

					.catch(function(err) {
						completionHandler(err)
						$cookies.put('geoposition', 'no_position');
						console.log(err)
					})

			}, 3000);


		} else if($cookies.get('geoposition')) {

			$geolocation.getCurrentPosition()

				.then(function(position) {
				
					$cookies.put('geoposition', 'position');

		            coordinates = {
						'latitude': position.coords.latitude,
						'longitude': position.coords.longitude
					}

					completionHandler(true, coordinates)
				})

				.catch(function(err) {
					completionHandler(err)
					$cookies.put('geoposition', 'no_position');
					console.log(err)
				})
		}
	}

	return coordinatesFactory;
});