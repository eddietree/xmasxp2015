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
			        uMoveDelta: {type: "f", value: 1.0},
			        uColorSnow: {type: "v3", value: v3(SETTINGS.snowColor)},
			        uColorSky: {type: "v3", value: v3(SETTINGS.clearColor)},
			    },
			});
	});

	this.meshesSnow = meshesSnow;
	this.colorSky = new THREE.Color( SETTINGS.clearColor );
	this.colorSnow = new THREE.Color( SETTINGS.clearColor );

	if ( SETTINGS.debug ) {
		var folder = APP.gui.addFolder("Snow Objects");
		folder.add(SETTINGS, 'snowSpeed');
		folder.add(SETTINGS, 'snowHeightCoeff', 0.0, 10.0);
	}
};

SnowObjects.prototype.start = function() {
};

SnowObjects.prototype.update = function() {

	var time = APP.time* SETTINGS.snowSpeed;

	var colorSky = new THREE.Color( SETTINGS.clearColor );
	colorSky = v3(colorSky.r, colorSky.g, colorSky.b);//.multiplyScalar(0.5);
	
	this.colorSnow.setHex(SETTINGS.snowColor);
	var that = this;

	this.meshesSnow.forEach( function(mesh) {

		var colorSkyCurr = colorSky;

		// height
		var snowHeightCoeff = SETTINGS.snowHeightCoeff;
		if ( mesh.parent.name === "CliffTop" ) {
			snowHeightCoeff = 0.12;
		}
		else if ( mesh.parent.name.contains("TreeSnow") ) {
			snowHeightCoeff = 0.02;	
			colorSkyCurr = v3(1.0,1.0,1.0).lerp( colorSky, 0.45);
		}

		var mat = mesh.material;
		mat.uniforms.uTime.value = time;
		mat.uniforms.uColorSky.value = colorSkyCurr;
		mat.uniforms.uColorSnow.value = v3(that.colorSnow.r, that.colorSnow.g, that.colorSnow.b);
		mat.uniforms.uMoveDelta.value = snowHeightCoeff;
	});
};

SnowObjects.prototype.draw = function() {
};