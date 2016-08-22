	
molo.controller("indexController", function ($scope, $interval, coordinatesService) {
	
	
	$scope.moment = coordinatesService.getMoment();
    //$scope.moment = "morning";
});