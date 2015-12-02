var Game = function() {
};

Game.prototype.init = function() {
	this.sceneManager = new SceneManager();
	this.sceneManager.addScene('SceneTestBox', new SceneTestBox());
	APP.scene.add(this.sceneManager);

	var origin = new THREE.Vector3( 0, 0, 0 );

	var arrowX = new THREE.ArrowHelper( v3(1,0,0), origin, 1, 0xff0000 );
	var arrowY = new THREE.ArrowHelper( v3(0,1,0), origin, 1, 0x00ff00 );
	var arrowZ = new THREE.ArrowHelper( v3(0,0,1), origin, 1, 0x00ff00 );
	this.sceneManager.add( arrowX );
	this.sceneManager.add( arrowY );
	this.sceneManager.add( arrowZ );

	//this.resources = new Resources();
	//this.resources.load();
};

Game.prototype.start = function() {
	this.sceneManager.changeSceneTo('SceneTestBox');

	APP.camera.position.x = -3.285;
	APP.camera.position.y = 4.75;
	APP.camera.position.z = 27;
};

Game.prototype.update = function() {
	this.sceneManager.update();
};

Game.prototype.draw = function() {
};

var FizzyText = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
  this.displayOutline = false;
  this.explode = function() {  };
  // Define render logic ...
};

window.onload = function() {
  var text = new FizzyText();
  var gui = new dat.GUI();
  gui.add(text, 'message');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');
  gui.add(text, 'explode');
};