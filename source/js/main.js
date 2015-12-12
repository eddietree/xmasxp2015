var APP;
var RES;
var SETTINGS;

// this .load function gets called when all the javascript has been loaded
$(window).load(function() {

	SETTINGS = new Settings();

	// load app (which has WebGL renderer)
	APP = new App();
	APP.init();

	// preload resources
	RES = new Resources();
	RES.load();

	// create hypercube
	var hypercube = new Hypercube(false);
	hypercube.init();
	hypercube.position.copy( v3(0.0, 0.5, 1.0) );
	APP.scene.add(hypercube);

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
		if ( !(SETTINGS.debugForceLoading && SETTINGS.debug) && RES.isLoadingFinished() ) {
			onResourcesLoaded();

			APP.scene.remove(hypercube);
			hypercube = null;
		}

		// still loading..
		else {
			requestAnimationFrame(waitForFinish);

			// TODO: draw scene
			hypercube.update();
			APP.update();
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