
molo.controller('sectionsAfternoonController', function() {

	var vm;
	console.log('sectionsAfternoonController initialized');
	vm = this;

	vm.message = 'afternoon component works!';
});


molo.component('sectionAfternoon', {
	templateUrl: "/sections/afternoon.html",
    controller: "sectionsAfternoonController",
    controllerAs: "vm",
    bindings: {} 

})