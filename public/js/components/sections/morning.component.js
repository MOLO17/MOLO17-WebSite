
molo.controller('sectionsMorningController', function() {

	var vm;
	console.log('sectionsMorningController initialized');
	vm = this;

	vm.message = 'morning component works!';
});


molo.component('sectionMorning', {
	templateUrl: "/sections/morning.html",
    controller: "sectionsMorningController",
    controllerAs: "vm",
    bindings: {} 

})