var APP;

// this .load function gets called when all the javascript has been loaded
$(window).load(function() {

	// load app (which has WebGL renderer)
	APP = new App();
	APP.init();

	// preload resources
	RES = new Resources();
	RES.load();

	var onResourcesLoaded = function() {

		var renderGame = function() {
			requestAnimationFrame(renderGame);

			APP.update();
			APP.draw();
		};

		APP.startGame();
		renderGame();
	};

	var waitForFinish = function() {

		// if finished loaded, call the callback
		if ( RES.isLoadingFinished() ) {
			onResourcesLoaded();
		}

		// still loading..
		else {
			requestAnimationFrame(waitForFinish);

			// TODO: draw scene
			APP.draw();

			var percent = RES.getPercentageLoaded();
			var numTrackedItems = RES.getNumTrackedItems();
			LOG("Number of tracked items: " + numTrackedItems);
			LOG("Percent loaded: " + percent);		
		}
	};

	// add event listener to resize
	window.addEventListener('resize', function() {
		APP.onWindowResized();
	});
	
	waitForFinish();
});