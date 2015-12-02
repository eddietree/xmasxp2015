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

	APP = new Core();
	APP.init();
	render();
});