var CameraControllerC4D = function() {
	THREE.Object3D.call(this);

	this.phi = SETTINGS.cameraC4dPhi;
	this.theta = SETTINGS.cameraC4dTheta;
	this.posLookAt = v3(SETTINGS.cameraC4dPosLookAt.x, SETTINGS.cameraC4dPosLookAt.y, SETTINGS.cameraC4dPosLookAt.z);

	this.mouseState = "idle";

	this.cam = APP.camera;
};

CameraControllerC4D.prototype = Object.create( THREE.Object3D.prototype );
CameraControllerC4D.prototype.constructor = CameraControllerC4D;

CameraControllerC4D.prototype.init = function() {
	this.initSettings();
	this.initControls();
};

CameraControllerC4D.prototype.initControls = function() {
	var that = this;

	window.addEventListener("mousedown", function(e) {
		if ( !e.altKey ) return;

		var button = e.button;

		if ( button === 0 ) {
			that.mouseState = "downBtnRotate";
		}
		if ( button === 1 ) {
			that.mouseState = "downBtnPan";
		}
	});

	window.addEventListener("mouseup", function(e) {
		var button = e.button;
		that.mouseState = "idle";
	});

	window.addEventListener("mousemove", function(e) {
		
		if ( that.mouseState != "idle" ) {
		}
	});

	window.addEventListener("wheel", function(e) {
		if ( !e.altKey ) return;
		SETTINGS.cameraC4dRadius = clamp( 1.0, 100.0, SETTINGS.cameraC4dRadius + e.deltaY*0.015 );
	});
};

CameraControllerC4D.prototype.initSettings = function() {

	if ( SETTINGS.debug ) {

		this.debugStr = {posLookAt:"(0,0,0)"};

		var folder = APP.gui.addFolder("Camera C4D");
		folder.add( SETTINGS, 'cameraC4dRadius' ).listen();
		folder.add( this, 'theta' ).listen();
		folder.add( this, 'phi' ).listen();
		folder.add( this.debugStr, 'posLookAt' ).listen();

		var geometry = new THREE.SphereGeometry( 2, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
		var sphere = new THREE.Mesh( geometry, material );
		sphere.position.copy( this.posLookAt );
		sphere.scale.multiplyScalar(0.1);

		this.lookAtSphere = sphere;
		APP.debugObjs.add(sphere);
	}
};

CameraControllerC4D.prototype.update = function() {
	if ( SETTINGS.debug ) {
		this.debugStr.posLookAt = "{x:" + Math.round(100*this.posLookAt.x)/100 + ", y:"+ Math.round(100*this.posLookAt.y)/100 + ", z:"+ Math.round(100*this.posLookAt.z)/100 + "}";
	
		if ( this.mouseState === "downBtnRotate") {
			this.updateRotation();
		}

		if ( this.mouseState === "downBtnPan") {
			this.updatePan();
		}

		if ( this.lookAtSphere ) {
			this.lookAtSphere.position.copy( this.posLookAt );
		}
	}

	this.updateAutomatic();

	// radius
	var sphericalPos = spherical( this.theta, this.phi, SETTINGS.cameraC4dRadius );
	var x = this.posLookAt.x + sphericalPos.x;
	var y = this.posLookAt.y + sphericalPos.y;
	var z = this.posLookAt.z + sphericalPos.z;

	this.cam.position.copy( v3(x,y,z) );
	this.cam.lookAt( this.posLookAt );
};

CameraControllerC4D.prototype.updateAutomatic = function() {
	var mouseMaxRange = 30.0;
	var mouseMoveCoeff = 0.0003;
	var mousePosRelX = -clamp(-mouseMaxRange,mouseMaxRange,APP.mouseRel.x)*mouseMoveCoeff;
	var mousePosRelY = -clamp(-mouseMaxRange,mouseMaxRange,APP.mouseRel.y)*mouseMoveCoeff;

	var thetaGoal = clamp( SETTINGS.cameraC4dTheta-SETTINGS.cameraC4dThetaRange, SETTINGS.cameraC4dTheta+SETTINGS.cameraC4dThetaRange, this.theta+mousePosRelX );
	var phiGoal = clamp( SETTINGS.cameraC4dPhi-SETTINGS.cameraC4dPhiRange, SETTINGS.cameraC4dPhi+SETTINGS.cameraC4dPhiRange, this.phi - mousePosRelY );

	this.theta = lerp( this.theta, thetaGoal, 1.0 );
	this.phi = lerp( this.phi, phiGoal, 1.0 );

	if ( Math.abs(mousePosRelX)+Math.abs(mousePosRelY) < 1 ) {
		var bounceBackLerp = 0.015;
		this.theta = lerp(this.theta, SETTINGS.cameraC4dTheta, bounceBackLerp );
		this.phi = lerp(this.phi, SETTINGS.cameraC4dPhi, bounceBackLerp );
	}
};

CameraControllerC4D.prototype.updatePan = function() {
	var mousePosRelX = APP.mouseRel.x;
	var mousePosRelY = APP.mouseRel.y;

	var camQuat = this.cam.quaternion;
	var camUp = v3(0.0,1.0,0.0).applyQuaternion(camQuat);
	var camRight = v3(-1.0,0.0,0.0).applyQuaternion(camQuat);

	var pan = v2(mousePosRelX * SETTINGS.cameraC4dRadius * 0.03, mousePosRelY * SETTINGS.cameraC4dRadius * 0.03);
	var deltaUp = camUp.multiplyScalar(pan.y);
	var deltaRight = camRight.multiplyScalar(pan.x);
	var posChange = deltaUp.add(deltaRight);

	this.cam.position.add(posChange);
	this.posLookAt.add(posChange);
};

CameraControllerC4D.prototype.updateRotation = function() {

	var mousePosRelX = APP.mouseRel.x;
	var mousePosRelY = APP.mouseRel.y;

	this.theta += mousePosRelX*0.01;
	this.phi = clamp( this.phi - mousePosRelY*0.01, -Math.PI*0.5, Math.PI*0.5);
};

CameraControllerC4D.prototype.start = function() {

};