var Hypercube = function(firstName) {
	SceneObj.call(this);
	LOG("Creating Hypercube");

	this.numTheta = 4;
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
	var numPerRing = 4;
	var numTheta = this.numTheta;

	var deltaTheta = 2.0 * Math.PI / this.numTheta;

	// initialize spherical data
		for( var iTheta = 0; iTheta < this.numTheta; iTheta+=1 ) {
			var theta = iTheta * deltaTheta;
			var phi =  Math.PI*0.5;

			var sphericalPos = spherical(theta,phi);
			var sphericalDirX = sphericalPos;
			var sphericalDirY = spherical(theta,phi + Math.PI*0.5);

			edgeCenters.push(sphericalPos);
			edgeDirX.push(sphericalDirX);
			edgeDirY.push(sphericalDirY);
		}

	// copy to this
	this.edgeCenters = edgeCenters;
	this.edgeDirX = edgeDirX;
	this.edgeDirY = edgeDirY;

	var geoLines = new THREE.Geometry();
	var geoTris = new THREE.Geometry();

	// init vertes
	for( var i = 0; i < this.numTheta*numPerRing; i+=1 ) {

		for( iRing = 0; iRing<numPerRing; iRing+=1 ) {
			geoLines.vertices.push( v3(0.0, 0.0, 0.0) );
		}

		this.edgePos.push(v3(0.0));
		geoTris.vertices.push( v3(0.0, 0.0, 0.0) );
	}

	function getFaceIndex( indexTheta, indexRing ) {
		indexTheta = (numTheta+indexTheta)%numTheta;
		indexRing = (numPerRings+indexRing)%numPerRing;
	}

	// init faces
	for( var iTheta = 0; iTheta < this.numTheta; iTheta+=1 ) {
		for( iRing = 0; iRing<numPerRing; iRing+=1 ) {
			var index0 = 0;
			var index1 = 1;
			var index2 = 2;
			var index3 = 3;

			geoTris.faces.push( new THREE.Face3(index0,index1,index2) );
			geoTris.faces.push( new THREE.Face3(index0,index2,index3) );
		}
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
    var materialTris = new THREE.MeshBasicMaterial({color:0x000000});

    // material properties
    //material.depthTest = false;
    //material.transparent = true;
    //material.blending = THREE.AdditiveBlending;
    this.materialTris = materialTris;
    this.materialTris.transparent = true;
    this.materialTris.opacity = 0.5;
    this.meshTris = new THREE.Mesh(geoTris, materialTris);
    this.add(this.meshTris);

    // mesh lines
    var materialLines = new THREE.LineBasicMaterial({color: 0xffffff });
    this.meshLines = new THREE.LineSegments(geoLines, materialLines);
    //meshLines.renderOrder = 1;
    //meshLines.frustumCulled = false;
    this.add(this.meshLines);
};

Hypercube.prototype.updateVertPositions = function() {
	var globalRadius = 8.0;
	var localRadius = globalRadius * 0.7;
	var time = APP.time * 0.2;

	var numEdgesPerCenter = 4;
	var deltaAngleRing = 2.0 * Math.PI / numEdgesPerCenter;

	for( var i = 0; i < this.edgeCenters.length; i+=1 ) {

		var edgeCenter = this.edgeCenters[i].clone().multiplyScalar(globalRadius);
		var edgeDirX = this.edgeDirX[i];
		var edgeDirY = this.edgeDirY[i];

		for ( var iEdge = 0; iEdge < numEdgesPerCenter; iEdge+=1) {

			var angle = time + iEdge * deltaAngleRing;
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
};

Hypercube.prototype.sendToGPU = function() {

	var verticesLines =  this.meshLines.geometry.vertices;
	var verticesTris =  this.meshTris.geometry.vertices;
	var edgePos = this.edgePos;

	function getIndex( edgeIndex, iRing ) {
		return edgeIndex * 4 + iRing;
	}

	var vertIndexCurr = 0;
	var numRings = 4;
	var numTheta = this.numTheta;

	for( var i = 0; i < edgePos.length; i+=1 ) {
		verticesTris[i].copy(edgePos[i]);
	}

	for( var iTheta = 0; iTheta < numTheta; iTheta+=1 ) {
		
		var edgeIndexCurr = iTheta;

		var edgeIndex0 = (edgeIndexCurr+1) % numTheta;
		var edgeIndex1 = (numTheta + iTheta-1) % numTheta;
		var edgeIndex2 = iTheta;
		var edgeIndex3 = edgeIndexCurr; // this should be the neighbor

		for (var iRing=0; iRing<numRings; iRing+=1 ) {

			var ringIndexCore = getIndex( edgeIndexCurr, iRing);
			var neighborIndex0 = getIndex( edgeIndex0, iRing);
			var neighborIndex1 = getIndex( edgeIndex1, iRing);
			var neighborIndex2 = getIndex( edgeIndexCurr, (iRing+1)%numRings);

			verticesLines[vertIndexCurr] = edgePos[ringIndexCore]; vertIndexCurr+=1;
			verticesLines[vertIndexCurr] = edgePos[neighborIndex0]; vertIndexCurr+=1;
			verticesLines[vertIndexCurr] = edgePos[ringIndexCore]; vertIndexCurr+=1;
			verticesLines[vertIndexCurr] = edgePos[neighborIndex1]; vertIndexCurr+=1;
			verticesLines[vertIndexCurr] = edgePos[ringIndexCore]; vertIndexCurr+=1;
			verticesLines[vertIndexCurr] = edgePos[neighborIndex2]; vertIndexCurr+=1;
		}
	}

	this.meshLines.geometry.verticesNeedUpdate = true;
	this.meshTris.geometry.verticesNeedUpdate = true;
};

Hypercube.prototype.update = function() {
	this.updateVertPositions();
	this.sendToGPU();

	var uniforms = this.materialTris.uniforms;
	//uniforms.uTime.value = APP.time;
	//uniforms.uHypercubeAlpha.value = SETTINGS.HypercubeAlpha;
	//uniforms.uHypercubeRadius.value = SETTINGS.HypercubeRadius;
};

Hypercube.prototype.draw = function() {
};