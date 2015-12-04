var SnowObjects = function(firstName) {
	SceneObj.call(this);
	LOG("Creating SnowObjects");
};

SnowObjects.prototype = Object.create(SceneObj.prototype);
SnowObjects.prototype.constructor = SnowObjects;

SnowObjects.prototype.init = function() {

	var colladaScene = RES.models['cliff.dae'];
	var meshesSnow = getMeshesUsingMaterial( colladaScene, "Snow");
	LOG( meshesSnow.length + " meshes found with 'Snow' material");

	meshesSnow.forEach( function(mesh) {
		mesh.material =
			new THREE.ShaderMaterial({
		    	vertexShader:   RES.shaders['snow.vp'],
		    	fragmentShader: RES.shaders['snow.fp'],
			});
	});

	this.meshesSnow = meshesSnow;
};

SnowObjects.prototype.start = function() {
};

SnowObjects.prototype.update = function() {
	this.meshesSnow.forEach( function(mesh) {
		var mat = mesh.material;
	});
};

SnowObjects.prototype.draw = function() {
};