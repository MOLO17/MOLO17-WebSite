
molo.controller('sectionsNightController', function() {

	var vm;
	console.log('sectionsDayController initialized');
	vm = this;

	vm.message = 'night component works!';
});


molo.component('sectionNight', {
	templateUrl: "/sections/night.html",
    controller: "sectionsNightController",
    controllerAs: "vm",
    bindings: {} 

})