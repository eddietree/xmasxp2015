var SceneTestBox = function(firstName) {
	Scene.call(this);
};

SceneTestBox.prototype = Object.create(Scene.prototype);
SceneTestBox.prototype.constructor = SceneTestBox;

SceneTestBox.prototype.init = function() {
	Scene.prototype.init.call(this);

	//this.addSceneObj('box', new TestBox());
	this.addSceneObj('crash', new Crash());

	var ambient = new THREE.AmbientLight( 0x222211 );
	this.add( ambient );
};

SceneTestBox.prototype.update = function() {
	Scene.prototype.update.call(this);
};