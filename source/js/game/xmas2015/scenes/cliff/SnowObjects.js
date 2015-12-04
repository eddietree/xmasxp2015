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
		    	uniforms: { 
			        uTime: {type: "f", value: 0.0},
			        uColorSky: {type: "v3", value: v3(SETTINGS.clearColor)},
			    },
			});
	});

	this.meshesSnow = meshesSnow;
};

SnowObjects.prototype.start = function() {
};

SnowObjects.prototype.update = function() {

	var time = APP.time;
	var colorSky = new THREE.Color( SETTINGS.clearColor );
	colorSky = v3(colorSky.r, colorSky.g, colorSky.b);

	this.meshesSnow.forEach( function(mesh) {
		var mat = mesh.material;
		mat.uniforms.uTime.value = time;
		mat.uniforms.uColorSky.value = colorSky;
	});
};

SnowObjects.prototype.draw = function() {
};