var SceneTestBox = function(firstName) {
	Scene.call(this);
};

SceneTestBox.prototype = Object.create(Scene.prototype);
SceneTestBox.prototype.constructor = SceneTestBox;

SceneTestBox.prototype.init = function() {
	// tood: call parent init
	this.addSceneObj('box', new TestBox());
};

SceneTestBox.prototype.update = function() {
	// tood: call parent update
};