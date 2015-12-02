var Scene = function() {
	this.sceneObjs = {};
	THREE.Object3D.call(this);
};

Scene.prototype = Object.create( THREE.Object3D.prototype );
Scene.prototype.constructor = Scene;

Scene.prototype.init = function() {
};

Scene.prototype.addSceneObj = function(name, obj) {
	this.sceneObjs[name] = obj;
	this.add(obj);

	obj.name = name;
	obj.init();
};

Scene.prototype.update = function() {
	for (var key in this.sceneObjs) {
		var obj = this.sceneObjs[key];
		obj.update();
	}
};

Scene.prototype.start = function() {
	for (var key in this.sceneObjs) {
		var obj = this.sceneObjs[key];
		obj.start();
	}
};