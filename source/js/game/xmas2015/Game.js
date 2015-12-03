var Game = function() {
};

Game.prototype.init = function() {
	this.initGui();

	this.sceneManager = new SceneManager();
	this.sceneManager.addScene('SceneTestBox', new SceneTestBox());
	APP.scene.add(this.sceneManager);

	if ( SETTINGS.debug ) {
		this.initDebugGfx();
	}
};

Game.prototype.initDebugGfx = function() {
	this.debugObjects = new THREE.Object3D;

	// arrows
	var origin = new THREE.Vector3( 0, 0, 0 );
	var arrowX = new THREE.ArrowHelper( v3(1,0,0), origin, 1, 0xff0000 );
	var arrowY = new THREE.ArrowHelper( v3(0,1,0), origin, 1, 0x00ff00 );
	var arrowZ = new THREE.ArrowHelper( v3(0,0,1), origin, 1, 0x00ff00 );
	this.debugObjects.add( arrowX );
	this.debugObjects.add( arrowY );
	this.debugObjects.add( arrowZ );

	// lines
	var geometry = new THREE.Geometry();

	var numLinesPerSide = 100;
	var step = 10;
	for( var x = -numLinesPerSide; x <= numLinesPerSide; x+=step)
	{
    	geometry.vertices.push( v3(x, 0, -numLinesPerSide) );
    	geometry.vertices.push( v3(x, 0, +numLinesPerSide) );
    	geometry.vertices.push( v3(-numLinesPerSide, 0, x) );
    	geometry.vertices.push( v3(+numLinesPerSide, 0, x) );
    }

    var lineMaterial = new THREE.LineBasicMaterial({color:0xffffff});
    var line = new THREE.LineSegments(geometry, lineMaterial);
   	this.debugObjects.add(line);

   	APP.scene.add(this.debugObjects);
};

Game.prototype.initGui = function() {
	APP.gui.add(SETTINGS, 'showDebugObjects');
};

Game.prototype.start = function() {
	this.sceneManager.changeSceneTo('SceneTestBox');

	APP.camera.position.x = -3.285;
	APP.camera.position.y = 4.75;
	APP.camera.position.z = 27;
};

Game.prototype.update = function() {

	if ( SETTINGS.debug ) {
		this.debugObjects.visible = SETTINGS.showDebugObjects;
	}
	
	this.sceneManager.update();
};

Game.prototype.draw = function() {
	this.sceneManager.draw();
};