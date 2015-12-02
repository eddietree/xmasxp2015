var APP = {};

var render = function() {
	requestAnimationFrame(render);

	APP.update();
	APP.draw();
};

$(window).load(function() {
	// add event listener to resize
	window.addEventListener('resize', function() {
		APP.resizeToFitScreen();
	});

	RES = new Resources();
	RES.load();

	APP = new App();
	APP.init();
	render();
});