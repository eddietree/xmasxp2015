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
		//folder.add(SETTINGS, 'SunShaftAlpha', 0.0, 1.0);
		//folder.add(SETTINGS, 'SunShaftRadius', 0.0, 1.0);
	}
};

SunShaft.prototype.initGeo = function() {
	var geometry = new THREE.Geometry();
	geometry.vertices.push( v3( 0.0, 0.0, 0.0 ) );
	geometry.vertices.push( v3( 1.0, 0.0, 0.0 ) );
	geometry.vertices.push( v3( 1.0, 1.0, 0.0 ) );
	geometry.vertices.push( v3( 0.0, 1.0, 0.0 ) );

	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

	var material = 
		new THREE.ShaderMaterial({
	    	vertexShader:   RES.shaders['sunShaft.vp'],
	    	fragmentShader: RES.shaders['sunShaft.fp'],
	    	uniforms: { 
				//uSunShaftAlpha: {type: "f", value: SETTINGS.SunShaftAlpha},
				//uSunShaftRadius: {type: "f", value: SETTINGS.SunShaftRadius},
		    },
		});

    // add line object
    var material = new THREE.MeshBasicMaterial({color:0xffffff});
    //material.depthTest = false;
    //material.transparent = true;
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
	//uniforms.uSunShaftAlpha.value = SETTINGS.SunShaftAlpha;
	//uniforms.uSunShaftRadius.value = SETTINGS.SunShaftRadius;
};

SunShaft.prototype.draw = function() {
};