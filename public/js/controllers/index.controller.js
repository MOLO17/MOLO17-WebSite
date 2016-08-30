	
molo.controller("indexController", function ($scope, $interval, coordinatesService) {
	
	$scope.moment = coordinatesService.getMoment();
    //$scope.moment = "night";

    var language = navigator.language || navigator.userLanguage;

});