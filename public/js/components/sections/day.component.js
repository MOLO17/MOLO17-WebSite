
molo.controller('sectionsDayController', function() {

	var vm;
	console.log('sectionsDayController initialized');
	vm = this;

	vm.message = 'day component works!';
});


molo.component('sectionDay', {
	templateUrl: "/sections/day.html",
    controller: "sectionsDayController",
    controllerAs: "vm",
    bindings: {} 

})