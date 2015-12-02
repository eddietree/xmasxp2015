var SceneObj = function(firstName) {
	THREE.Object3D.call(this);
	this.firstName = firstName;
};

SceneObj.prototype = Object.create( THREE.Object3D.prototype );
SceneObj.prototype.constructor = SceneObj;

// override-able
SceneObj.prototype.start = function() {
};


function GetObj(name) {
	return APP.game.sceneManager.currScene.sceneObjs[name];
}