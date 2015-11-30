var Game = function() {
};

Game.prototype.init = function() {
	this.sceneManager = new SceneManager();
	this.sceneManager.addScene('SceneTestBox', new SceneTestBox());
	g_core.scene.add(this.sceneManager);

	var origin = new THREE.Vector3( 0, 0, 0 );

	var arrowX = new THREE.ArrowHelper( v3(1,0,0), origin, 1, 0xff0000 );
	var arrowY = new THREE.ArrowHelper( v3(0,1,0), origin, 1, 0x00ff00 );
	var arrowZ = new THREE.ArrowHelper( v3(0,0,1), origin, 1, 0x00ff00 );
	this.sceneManager.add( arrowX );
	this.sceneManager.add( arrowY );
	this.sceneManager.add( arrowZ );
};

Game.prototype.start = function() {
	this.sceneManager.changeSceneTo('SceneTestBox');
};

Game.prototype.update = function() {
	this.sceneManager.update();
};

Game.prototype.draw = function() {
};