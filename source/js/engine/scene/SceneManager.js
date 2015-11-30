var SceneManager = function(firstName) {
	THREE.Object3D.call(this);
	this.scenes = {};
};

SceneManager.prototype = Object.create(THREE.Object3D.prototype);
SceneManager.prototype.constructor = SceneManager;

SceneManager.prototype.addScene = function(name, scene) {
	scene.name = name;
	scene.init();

	this.scenes[name] = scene;
};

SceneManager.prototype.changeSceneTo = function(name) {
	LOG("Changing scene to: " + name );

	if ( this.currScene !== null) {
		g_core.scene.remove(this.currScene);
	}

	var scene = this.scenes[name];
	ASSERT(scene !== null);

	this.currScene = scene;
	this.currScene.start();

	g_core.scene.add(scene);
};

SceneManager.prototype.update = function() {
	if ( this.currScene !== null) {
		this.currScene.update();
	}
};
