
molo.factory('weatherFactory', function($http, projectConsts) {

	var weatherFactory = {};
	var errorMessage;
	var data;

	errorMessage = 'Qualcosa è andato storto..';

	weatherFactory.getWeather = function(completionHandler) {

		$http.get(projectConsts.weatherAPIUrl)
			.then(function(response) {

				if(response.data && response.data.weather && response.data.weather.length > 0 && response.data.main.temp) {
					var data = {
						'description': response.data.weather[0].description,
						'temperature': Math.round(response.data.main.temp)
					}

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