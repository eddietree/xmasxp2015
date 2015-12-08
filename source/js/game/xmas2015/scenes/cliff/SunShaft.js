var SunShaft = function(firstName) {
	SceneObj.call(this);
	LOG("Creating SunShaft");
};

SunShaft.prototype = Object.create(SceneObj.prototype);
SunShaft.prototype.constructor = SunShaft;

SunShaft.prototype.init = function() {
	this.initGeo();

	if ( SETTINGS.debug ) {
		var folder = APP.gui.addFolder("SunShaft");
		//folder.add(SETTINGS, 'debug');
		//folder.add(SETTINGS, 'SunShaftRadius', 0.0, 1.0);
	}
};

SunShaft.prototype.initGeo = function() {
	var geometry = new THREE.Geometry();

	var numShafts = 2;
	var posPivot = v3(0.0);
	for( var i = 0; i < numShafts; i+=1 ) {

		var posZ = randBetween(-1.0, 1.0);

		geometry.vertices.push( v3( 0.0, 0.0, posZ ) );
		geometry.vertices.push( v3( 1.0, 0.0, posZ ) );
		geometry.vertices.push( v3( 1.0, 1.0, posZ ) );
		geometry.vertices.push( v3( 0.0, 1.0, posZ ) );

		var faceIndexOffset = i * 4;
		var index0 = faceIndexOffset + 0;
		var index1 = faceIndexOffset + 1;
		var index2 = faceIndexOffset + 2;
		var index3 = faceIndexOffset + 3;

		var dataNormal = v3( randBetween(0.0,1.0), randBetween(0.0,1.0), randBetween(0.0,1.0) );

		geometry.faces.push( new THREE.Face3( index0, index1, index2, dataNormal ) );
		geometry.faces.push( new THREE.Face3( index0, index2, index3, dataNormal ) );
	}

	var tex = RES.textures['perlin.png'];
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping;

	var material = 
		new THREE.ShaderMaterial({
	    	vertexShader:   RES.shaders['sunShaft.vp'],
	    	fragmentShader: RES.shaders['sunShaft.fp'],
	    	uniforms: { 
	    		uTime: {type: "f", value: 0.0},
	    		uShaftAlpha: {type: "f", value: SETTINGS.sunshaftAlpha},
	    		uTex: {type: "t", value: tex},
				//uSunShaftAlpha: {type: "f", value: SETTINGS.SunShaftAlpha},
				//uSunShaftRadius: {type: "f", value: SETTINGS.SunShaftRadius},
		    },
		});

    // add line object
    //var material = new THREE.MeshBasicMaterial({color:0xffffff});
    material.depthTest = false;
    material.transparent = true;
    material.blending = THREE.AdditiveBlending;
    //material.opacity = 0.25;
    var mesh  = new THREE.Mesh(geometry, material);
    //mesh.renderOrder = 1;
    //mesh.frustumCulled = false;
    this.material = material;

    this.add(mesh);
};

SunShaft.prototype.start = function() {

};

SunShaft.prototype.update = function() {

	var uniforms = this.material.uniforms;
	uniforms.uTime.value = APP.time;
	uniforms.uShaftAlpha.value = SETTINGS.sunshaftAlpha;
	//uniforms.uSunShaftAlpha.value = SETTINGS.SunShaftAlpha;
	//uniforms.uSunShaftRadius.value = SETTINGS.SunShaftRadius;
};

SunShaft.prototype.draw = function() {
};