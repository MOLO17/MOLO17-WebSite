
molo.controller('sectionsEveningController', function() {

	var vm;
	console.log('sectionsEveningController initialized');
	vm = this;

	vm.message = 'evening component works!';
});


molo.component('sectionEvening', {
	templateUrl: "/sections/evening.html",
    controller: "sectionsEveningController",
    controllerAs: "vm",
    bindings: {} 

})