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
		folder.add(SETTINGS, 'hypercubeRadius', 0.0, 10.0);
		folder.add(SETTINGS, 'hypercubeInnerCoeff', 0.0, 1.0);
		folder.add(SETTINGS, 'hypercubeMovementSpeed', 0.0, 1.0);
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
		//geoTris.colors.push( color );
		geoTris.vertices.push( v3(0.0, 0.0, 0.0) );
	}

	function getFaceIndex( indexTheta, indexRing ) {
		indexTheta = (numTheta + indexTheta)%numTheta;
		indexRing = (numPerRing + indexRing)%numPerRing;

		return indexTheta * numPerRing + indexRing;
	}

	// init tru faces
	for( var iTheta = 0; iTheta < this.numTheta; iTheta+=1 ) {
		for( iRing = 0; iRing<numPerRing; iRing+=1 ) {
			var index0 = getFaceIndex(iTheta, iRing);
			var index1 = getFaceIndex(iTheta+1, iRing);
			var index2 = getFaceIndex(iTheta+1, iRing+1);
			var index3 = getFaceIndex(iTheta, iRing+1);

			var color0 = new THREE.Color();
			var color1 = new THREE.Color();
			var color2 = new THREE.Color();
			var color3 = new THREE.Color();
			color0.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,0.8));
			color1.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,0.8));
			color2.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,0.8));
			color3.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,0.8));

			var face0 = new THREE.Face3(index0,index1,index2);
			var face1 = new THREE.Face3(index0,index2,index3);
			face0.vertexColors[0] = color0;
			face0.vertexColors[1] = color1;
			face0.vertexColors[2] = color2;
			face1.vertexColors[0] = color0;
			face1.vertexColors[1] = color2;
			face1.vertexColors[2] = color3;

			geoTris.faces.push( face0 );
			geoTris.faces.push( face1 );
		}

		var index0 = getFaceIndex(iTheta, iRing);
		var index1 = getFaceIndex(iTheta, iRing+1);
		var index2 = getFaceIndex(iTheta, iRing+2);
		var index3 = getFaceIndex(iTheta, iRing+3);
		var color0 = new THREE.Color();
		var color1 = new THREE.Color();
		var color2 = new THREE.Color();
		var color3 = new THREE.Color();
		color0.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,1.0));
		color1.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,1.0));
		color2.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,1.0));
		color3.setHSL( randBetween(0.0,1.0), 1.0, randBetween(0.5,1.0));

		var face0 = new THREE.Face3(index0,index1,index2);
		var face1 = new THREE.Face3(index0,index2,index3);
		face0.vertexColors[0] = color0;
		face0.vertexColors[1] = color1;
		face0.vertexColors[2] = color2;
		face1.vertexColors[0] = color0;
		face1.vertexColors[1] = color2;
		face1.vertexColors[2] = color3;

		geoTris.faces.push( face0 );
		geoTris.faces.push( face1 );
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
    //var materialTris = new THREE.MeshBasicMaterial({color:0x000000});
    var materialTris = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

    // material properties
    //material.depthTest = false;
    this.materialTris = materialTris;
    this.materialTris.transparent = true;
    this.materialTris.opacity = 0.5;
    this.materialTris.side = THREE.DoubleSide
    this.materialTris.depthWrite = false;
    //this.materialTris.blending = THREE.MultiplyBlending;
    this.meshTris = new THREE.Mesh(geoTris, materialTris);
    this.meshTris.renderOrder = 1;
    this.add(this.meshTris);

    //this.scale.multiplyScalar(0.3);
    this.position.copy( v3(7.0,6.0,0.0));
    this.rotation.set( Math.PI*0.5, 0.0, 0.0, 'XYZ');

    // mesh lines
    var materialLines = new THREE.LineBasicMaterial({color: 0xffffff });
    this.meshLines = new THREE.LineSegments(geoLines, materialLines);
    //meshLines.renderOrder = 1;
    //meshLines.frustumCulled = false;
    this.add(this.meshLines);
};

Hypercube.prototype.updateVertPositions = function() {
	var globalRadius = SETTINGS.hypercubeRadius;
	var localRadius = globalRadius * SETTINGS.hypercubeInnerCoeff;
	var time = APP.time * SETTINGS.hypercubeMovementSpeed;

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

	// tris
	for( var i = 0; i < edgePos.length; i+=1 ) {
		verticesTris[i].copy(edgePos[i]);
	}

	// lines
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