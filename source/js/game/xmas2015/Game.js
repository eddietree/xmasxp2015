var Game = function() {
};

Game.prototype.init = function() {
	this.sceneManager = new SceneManager();
	this.sceneManager.addScene('SceneCliff', new SceneCliff());
	APP.scene.add(this.sceneManager);

	if ( SETTINGS.debug ) {
		this.initGui();
		this.initDebugGfx();
	}

	this.camController = new CameraControllerC4D();
	this.camController.init();

	/*	
	controls = new THREE.OrbitControls( APP.camera, APP.renderer.domElement );
	//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
	controls.enableDamping = true;
	controls.dampingFactor = 0.8;
	controls.enableZoom = true;*/
};

Game.prototype.initDebugGfx = function() {

	// arrows
	var origin = new THREE.Vector3( 0, 0, 0 );
	var arrowX = new THREE.ArrowHelper( v3(1,0,0), origin, 1, 0xff0000 );
	var arrowY = new THREE.ArrowHelper( v3(0,1,0), origin, 1, 0x00ff00 );
	var arrowZ = new THREE.ArrowHelper( v3(0,0,1), origin, 1, 0x00ff00 );
	APP.debugObjs.add( arrowX );
	APP.debugObjs.add( arrowY );
	APP.debugObjs.add( arrowZ );

	// lines
	var geometry = new THREE.Geometry();

	var numLinesPerSide = 100;
	var step = 5;
	for( var x = -numLinesPerSide; x <= numLinesPerSide; x+=step)
	{
    	geometry.vertices.push( v3(x, 0, -numLinesPerSide) );
    	geometry.vertices.push( v3(x, 0, +numLinesPerSide) );
    	geometry.vertices.push( v3(-numLinesPerSide, 0, x) );
    	geometry.vertices.push( v3(+numLinesPerSide, 0, x) );
    }

    // add line object
    var lineMaterial = new THREE.LineBasicMaterial({color:0xffffff});
    lineMaterial.transparent = true;
    lineMaterial.opacity = 0.25;
    var line = new THREE.LineSegments(geometry, lineMaterial);
   	APP.debugObjs.add(line);

};

Game.prototype.initGui = function() {
	APP.gui.add(SETTINGS, 'showDebugObjects');

	this.debugStr = {cameraPos:"(0,0,0)"};

	var folderCam = APP.gui.addFolder('Camera');
	folderCam.add(SETTINGS, 'cameraFOV', 0.0, 180.0);
	folderCam.add(this.debugStr, 'cameraPos').listen();
};

Game.prototype.start = function() {

	APP.camera.fov = SETTINGS.cameraFOV;
	APP.camera.updateProjectionMatrix();
	APP.camera.position.x = SETTINGS.cameraStartPos.x;
	APP.camera.position.y = SETTINGS.cameraStartPos.y;
	APP.camera.position.z = SETTINGS.cameraStartPos.z;

	this.sceneManager.changeSceneTo('SceneCliff');
};

Game.prototype.update = function() {
	if ( SETTINGS.debug ) {
		APP.debugObjs.visible = SETTINGS.showDebugObjects;
		this.debugStr.cameraPos = "{x:" + Math.round(100*APP.camera.position.x)/100 + ", y:"+ Math.round(100*APP.camera.position.y)/100 + ", z:"+ Math.round(100*APP.camera.position.z)/100 + "}";
	}
	// did FOV change?
	if ( APP.camera.fov != SETTINGS.cameraFOV ) {
		APP.camera.fov = SETTINGS.cameraFOV;
		APP.camera.updateProjectionMatrix();
	}

	if ( this.camController ) {
		this.camController.update();
	}
	
	this.sceneManager.update();
};

Game.prototype.draw = function() {
	this.sceneManager.draw();
};