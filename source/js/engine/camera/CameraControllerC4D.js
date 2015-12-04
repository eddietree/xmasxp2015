var CameraControllerC4D = function() {
	THREE.Object3D.call(this);

	this.phi = SETTINGS.cameraC4dPhi;
	this.theta = SETTINGS.cameraC4dTheta;
	this.radius = SETTINGS.cameraC4dRadius;
	this.posLookAt = v3(SETTINGS.cameraC4dPosLookAt.x, SETTINGS.cameraC4dPosLookAt.y, SETTINGS.cameraC4dPosLookAt.z);

	this.mouseState = "idle";
	this.mousePosPrev = {x:0,y:0};
	this.mousePos = {x:0,y:0};

	this.cam = APP.camera;
};

CameraControllerC4D.prototype = Object.create( THREE.Object3D.prototype );
CameraControllerC4D.prototype.constructor = CameraControllerC4D;

CameraControllerC4D.prototype.init = function() {

	var that = this;

	window.addEventListener("mousedown", function(e) {
		var button = e.button;

		that.mousePos = {x:e.x,y:e.y};
		that.mousePosPrev = {x:e.x,y:e.y};

		if ( button === 0 ) {
			that.mouseState = "downBtnRotate";
		}
		if ( button === 1 ) {
			that.mouseState = "downBtnPan";
		}
	});

	window.addEventListener("mouseup", function(e) {
		var button = e.button;
		that.mousePosPrev = {x:0,y:0};
		that.mouseState = "idle";
	});

	window.addEventListener("mousemove", function(e) {
		
		if ( that.mouseState != "idle" ) {
			that.mousePosPrev.x = that.mousePos.x;
			that.mousePosPrev.y = that.mousePos.y;
			that.mousePos.x = e.x;
			that.mousePos.y = e.y;
		}
	});

	window.addEventListener("wheel", function(e) {
		that.radius = clamp( 1.0, 100.0, that.radius + e.deltaY*0.015 );
	});

	this.initSettings();
};

CameraControllerC4D.prototype.initSettings = function() {

	if ( SETTINGS.debug ) {

		this.debugStr = {posLookAt:"(0,0,0)"};

		var folder = APP.gui.addFolder("Camera C4D");
		folder.add( this, 'radius' ).listen();
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
	}
	if ( this.mouseState === "downBtnRotate") {
		this.updateRotation();
	}

	if ( this.mouseState === "downBtnPan") {
		this.updatePan();
	}

	if ( this.lookAtSphere ) {
		this.lookAtSphere.position.copy( this.posLookAt );
	}

	// radius
	var x = this.posLookAt.x + this.radius * Math.cos( this.theta ) * Math.sin(this.phi);
	var z = this.posLookAt.z + this.radius * Math.sin( this.theta ) * Math.sin(this.phi);
	var y = this.posLookAt.y + this.radius * Math.cos(this.phi);

	this.cam.position.copy( v3(x,y,z) );
	this.cam.lookAt( this.posLookAt );

	this.mousePosPrev.x = this.mousePos.x;
	this.mousePosPrev.y = this.mousePos.y;
};

CameraControllerC4D.prototype.updatePan = function() {
	var mousePosRelX = this.mousePos.x - this.mousePosPrev.x;
	var mousePosRelY = this.mousePos.y - this.mousePosPrev.y;

	var camQuat = this.cam.quaternion;
	var camUp = v3(0.0,1.0,0.0).applyQuaternion(camQuat);
	var camRight = v3(-1.0,0.0,0.0).applyQuaternion(camQuat);

	var pan = v2(mousePosRelX * this.radius * 0.03, mousePosRelY * this.radius * 0.03);
	var deltaUp = camUp.multiplyScalar(pan.y);
	var deltaRight = camRight.multiplyScalar(pan.x);
	var posChange = deltaUp.add(deltaRight);

	this.cam.position.add(posChange);
	this.posLookAt.add(posChange);
};

CameraControllerC4D.prototype.updateRotation = function() {

	var mousePosRelX = this.mousePos.x - this.mousePosPrev.x;
	var mousePosRelY = this.mousePos.y - this.mousePosPrev.y;

	this.theta += mousePosRelX*0.025;
	this.phi = clamp( this.phi - mousePosRelY*0.02, -Math.PI*0.5, Math.PI*0.5)
};

CameraControllerC4D.prototype.start = function() {

};