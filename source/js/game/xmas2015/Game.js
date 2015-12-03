var Game = function() {
};

Game.prototype.init = function() {
	this.initGui();

	this.sceneManager = new SceneManager();
	this.sceneManager.addScene('SceneTestBox', new SceneTestBox());
	APP.scene.add(this.sceneManager);

	if ( SETTINGS.debug ) {
		var origin = new THREE.Vector3( 0, 0, 0 );
		var arrowX = new THREE.ArrowHelper( v3(1,0,0), origin, 1, 0xff0000 );
		var arrowY = new THREE.ArrowHelper( v3(0,1,0), origin, 1, 0x00ff00 );
		var arrowZ = new THREE.ArrowHelper( v3(0,0,1), origin, 1, 0x00ff00 );
		this.sceneManager.add( arrowX );
		this.sceneManager.add( arrowY );
		this.sceneManager.add( arrowZ );
	}
};

Game.prototype.initGui = function() {
	APP.gui.addColor(SETTINGS, 'clearColor');
};

Game.prototype.start = function() {
	this.sceneManager.changeSceneTo('SceneTestBox');

	APP.camera.position.x = -3.285;
	APP.camera.position.y = 4.75;
	APP.camera.position.z = 27;
};

Game.prototype.update = function() {
	APP.renderer.setClearColor( SETTINGS.clearColor, 1);
	this.sceneManager.update();
};

Game.prototype.draw = function() {
	this.sceneManager.draw();
};