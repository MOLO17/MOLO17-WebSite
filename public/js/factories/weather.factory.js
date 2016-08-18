
molo.factory('weatherFactory', function($http, projectConsts) {

	var weatherFactory = {};
	var errorMessage;

	errorMessage = 'Qualcosa è andato storto..';

	weatherFactory.getWeather = function(completionHandler) {

		$http.get(projectConsts.weatherAPIUrl)
			.then(function(response) {

				if(response.data && response.data.weather && response.data.weather.length > 0) {
					var data = response.data.weather[0].description;
					completionHandler(null, data);
				} else {
					completionHandler(errorMessage);
				}
			})
			.catch(function(err) {
				completionHandler(err);
			})

	}

	return weatherFactory;
})