
molo.controller('sectionsDayController', function() {

	var vm;
	console.log('sectionsDayController initialized');
	vm = this;

	vm.message = 'day component works!';


	var windowWidth = $(window).width();
	$('.ship_1').animate({right: windowWidth}, 3000, function() {
		$('.ship_1').animate({right: 50}, 3000);
	});

});


molo.component('sectionDay', {
	templateUrl: "/sections/day.html",
    controller: "sectionsDayController",
    controllerAs: "vm",
    bindings: {} 

})