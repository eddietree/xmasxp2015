var Hypercube = function(firstName) {
	SceneObj.call(this);
	LOG("Creating Hypercube");
};

Hypercube.prototype = Object.create(SceneObj.prototype);
Hypercube.prototype.constructor = Hypercube;

Hypercube.prototype.init = function() {
	this.initGeo();

	if ( SETTINGS.debug ) {
		var folder = APP.gui.addFolder("Hypercube");
		//folder.add(SETTINGS, 'debug');
		//folder.add(SETTINGS, 'HypercubeRadius', 0.0, 1.0);
	}
};

Hypercube.prototype.initGeo = function() {

	var edgeCenters = [];
	var cubeRadius = 8;

	for( var i = 0; i < 4; i+=1 ) {
			
	}

	var geometry = new THREE.Geometry();
	geometry.vertices.push( v3(0.0) );
	geometry.vertices.push( v3(10.0, 10.0, -10.0) );

	/*var material = 
		new THREE.ShaderMaterial({
	    	vertexShader:   RES.shaders['Hypercube.vp'],
	    	fragmentShader: RES.shaders['Hypercube.fp'],
	    	uniforms: { 
	    		uTime: {type: "f", value: 0.0},
	    		uTex: {type: "t", value: tex},
				//uHypercubeAlpha: {type: "f", value: SETTINGS.HypercubeAlpha},
				//uHypercubeRadius: {type: "f", value: SETTINGS.HypercubeRadius},
		    },
		});*/

    // add line object
    var material = new THREE.MeshBasicMaterial({color:0x000000});

    var material = new THREE.LineBasicMaterial({
		color: 0x0000ff
	});

    // material properties
    //material.depthTest = false;
    //material.transparent = true;
    //material.blending = THREE.AdditiveBlending;
    //material.opacity = 0.25;

    // mesh
    var mesh  = new THREE.Line(geometry, material);
    //mesh.renderOrder = 1;
    //mesh.frustumCulled = false;

    this.material = material;
    this.add(mesh);
};

Hypercube.prototype.start = function() {

};

Hypercube.prototype.update = function() {

	var uniforms = this.material.uniforms;
	//uniforms.uTime.value = APP.time;
	//uniforms.uHypercubeAlpha.value = SETTINGS.HypercubeAlpha;
	//uniforms.uHypercubeRadius.value = SETTINGS.HypercubeRadius;
};

Hypercube.prototype.draw = function() {
};