var render = function() {
	requestAnimationFrame(render);

	g_core.Update();
	g_core.Render();
};

$(window).load(function() {
	// add event listener to resize
	window.addEventListener('resize', function() {
		g_core.ResizeToFitScreen();
	});

	g_core = new Core();
	g_core.Init();
	render();
});