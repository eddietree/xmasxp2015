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
	var edgeDirX = [];
	var edgeDirY = [];
	var cubeRadius = 8;

	var numTheta = 4;
	var numPhi = 2;
	var deltaTheta = 2.0 * Math.PI / numTheta;
	var deltaPhi = Math.PI / numPhi;


	for( var iPhi = 0; iPhi < numPhi; iPhi+=1 ) {
		for( var iTheta = 0; iTheta < numTheta; iTheta+=1 ) {

			var theta = iTheta * deltaTheta;
			var phi =  deltaPhi*0.5 + iPhi * deltaPhi;

			var sphericalPos = spherical(theta,phi);
			var sphericalDirX = sphericalPos;
			var sphericalDirY = spherical(theta,phi + Math.PI*0.5);

			edgeCenters.push(sphericalPos.multiplyScalar(cubeRadius));
			edgeDirX.push(sphericalDirX);
			edgeDirY.push(sphericalDirY);
		}
	}

	LOG(edgeCenters);

	var geometry = new THREE.Geometry();

	for( var i =0; i < edgeCenters.length-1; i+=1 ) {
		geometry.vertices.push( edgeCenters[i] );
		geometry.vertices.push( edgeCenters[i+1] );
	}
	//LOG(geometry.vertices);

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