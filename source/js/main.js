var render = function() {
	requestAnimationFrame(render);

	g_app.Update();
	g_app.Render();
};

$(window).load(function() {
	// add event listener to resize
	window.addEventListener('resize', function() {
		g_app.ResizeToFitScreen();
	});

	g_app = new App();
	g_app.Init();
	render();
});