var APP = {};



$(window).load(function() {

	APP = new App();
	APP.init();

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

		if ( RES.isLoadingFinished() ) {
			onResourcesLoaded();
		}
		else {
			requestAnimationFrame(waitForFinish);
			
			var percent = RES.getPercentageLoaded();
			var numTrackedItems = RES.getNumTrackedItems();
			LOG("Number of tracked items: " + numTrackedItems);
			LOG("Percent loaded: " + percent);		
		}
	};

	// add event listener to resize
	window.addEventListener('resize', function() {
		APP.resizeToFitScreen();
	});
	
	waitForFinish();
	//onResourcesLoaded();
});