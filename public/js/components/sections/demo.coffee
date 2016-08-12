molo.controller 'sectionsDemoController',($interval) ->
	
	console.log "Component initialized"

	vm = this
	vm.counter = 0

	$interval () ->
		vm.counter++;
	,1000
	return


molo.component 'sectionsDemo',{
	templateUrl: "/sections/demo.html"
	controller: "sectionsDemoController"
	controllerAs: "vm"
	bindings:{
	}
}