var Hypercube = function(firstName) {
	SceneObj.call(this);
	LOG("Creating Hypercube");

	this.numTheta = 4;
	this.numPhi = 2;

	this.edgePos = [];
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

	var deltaTheta = 2.0 * Math.PI / this.numTheta;
	var deltaPhi = Math.PI / this.numPhi;

	// initialize spherical data
	for( var iPhi = 0; iPhi < this.numPhi; iPhi+=1 ) {
		for( var iTheta = 0; iTheta < this.numTheta; iTheta+=1 ) {
			var theta = iTheta * deltaTheta;
			var phi =  deltaPhi*0.5 + iPhi * deltaPhi;

			var sphericalPos = spherical(theta,phi);
			var sphericalDirX = sphericalPos;
			var sphericalDirY = spherical(theta,phi + Math.PI*0.5);

			edgeCenters.push(sphericalPos);
			edgeDirX.push(sphericalDirX);
			edgeDirY.push(sphericalDirY);
		}
	}

	// copy to this
	this.edgeCenters = edgeCenters;
	this.edgeDirX = edgeDirX;
	this.edgeDirY = edgeDirY;

	var geometry = new THREE.Geometry();

	for( var i = 0; i < this.numTheta*this.numPhi*4; i+=1 ) {

		for( j = 0; j<4; j+=1 ) {
			geometry.vertices.push( v3(0.0, 0.0, 0.0) );
		}

		this.edgePos.push(v3(0.0));
	}

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
    var material = new THREE.LineBasicMaterial({color: 0x000000 });

    // material properties
    //material.depthTest = false;
    //material.transparent = true;
    //material.blending = THREE.AdditiveBlending;
    //material.opacity = 0.25;

    // mesh
    var mesh  = new THREE.LineSegments(geometry, material);
    //mesh.renderOrder = 1;
    //mesh.frustumCulled = false;

    this.mesh = mesh;
    this.material = material;
    this.add(mesh);
};

Hypercube.prototype.updateVertPositions = function() {
	var localRadius = 1.5;
	var numEdgesPerCenter = 4;

	for( var i = 0; i < this.edgeCenters.length; i+=1 ) {

		var edgeCenter = this.edgeCenters[i].clone().multiplyScalar(8);
		var edgeDirX = this.edgeDirX[i];
		var edgeDirY = this.edgeDirY[i];

		for ( var iEdge = 0; iEdge < numEdgesPerCenter; iEdge+=1) {

			var coeff = 1.0;
			//if ( i > 4 )  coeff = -1.0;

			var angle = APP.time*coeff + iEdge * 2.0 * Math.PI / numEdgesPerCenter;
			var localDirX = Math.cos(angle);
			var localDirY = Math.sin(angle);
			
			var posDirX = edgeDirX.clone();
			var posDirY = edgeDirY.clone();
			posDirX.multiplyScalar(localDirX*localRadius);
			posDirY.multiplyScalar(localDirY*localRadius);

			var posFinal = posDirX.clone();
			posFinal.add(posDirY);
			posFinal.add(edgeCenter);

			this.edgePos[i*numEdgesPerCenter + iEdge].copy(posFinal);
		}
	}

	var geometry = this.mesh.geometry;
	var vertices = geometry.vertices;

	function getIndex( edgeIndex, iRing ) {
		return edgeIndex * 4 + iRing;
	}

	var vertIndexCurr = 0;

	for( var iPhi = 0; iPhi < this.numPhi; iPhi+=1 ) {
		for( var iTheta = 0; iTheta < this.numTheta; iTheta+=1 ) {
			
			var edgeIndexCurr = iPhi*this.numTheta + iTheta;

			var edgeIndex0 = iPhi*this.numTheta + (edgeIndexCurr+1) % this.numTheta;
			var edgeIndex1 = iPhi*this.numTheta + (this.numTheta + iTheta-1) % this.numTheta;
			var edgeIndex2 = ((iPhi+1)%this.numPhi)*this.numTheta + iTheta;
			var edgeIndex3 = edgeIndexCurr; // this should be the neighbor

			for (var iRing=0; iRing<4; iRing+=1 ) {

				var ringIndexCore = getIndex( edgeIndexCurr, iRing);
				var neighborIndex0 = getIndex( edgeIndex0, iRing);
				var neighborIndex1 = getIndex( edgeIndex1, iRing);
				var neighborIndex2 = getIndex( edgeIndex2, iRing);
				var neighborIndex3 = getIndex( edgeIndexCurr, (iRing+1)%4);

				vertices[vertIndexCurr] = this.edgePos[ringIndexCore]; vertIndexCurr+=1;
				vertices[vertIndexCurr] = this.edgePos[neighborIndex0]; vertIndexCurr+=1;
				vertices[vertIndexCurr] = this.edgePos[ringIndexCore]; vertIndexCurr+=1;
				vertices[vertIndexCurr] = this.edgePos[neighborIndex1]; vertIndexCurr+=1;
				vertices[vertIndexCurr] = this.edgePos[ringIndexCore]; vertIndexCurr+=1;
				vertices[vertIndexCurr] = this.edgePos[neighborIndex2]; vertIndexCurr+=1;
				vertices[vertIndexCurr] = this.edgePos[ringIndexCore]; vertIndexCurr+=1;
				vertices[vertIndexCurr] = this.edgePos[neighborIndex3]; vertIndexCurr+=1;
			}
		}
	}

	/*for( var i = 0; i < this.edgeCenters.length; i+=1 ) {
		for ( var iEdge = 0; iEdge < numEdgesPerCenter; iEdge+=1) {

			var index = i*numEdgesPerCenter + iEdge;
			vertices[index].copy(this.edgePos[index]);
		}
	}*/

	var geometry = this.mesh.geometry;
	geometry.verticesNeedUpdate = true;
};

Hypercube.prototype.start = function() {

};

Hypercube.prototype.update = function() {
	this.updateVertPositions();

	var uniforms = this.material.uniforms;
	//uniforms.uTime.value = APP.time;
	//uniforms.uHypercubeAlpha.value = SETTINGS.HypercubeAlpha;
	//uniforms.uHypercubeRadius.value = SETTINGS.HypercubeRadius;
};

Hypercube.prototype.draw = function() {
};