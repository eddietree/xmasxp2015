var CameraControllerC4D = function() {
	THREE.Object3D.call(this);

	this.phi = Math.PI * 0.5;
	this.theta = 0.0;
	this.radius = 5.0;
	this.posOffset = v2(0.0);

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
};

CameraControllerC4D.prototype.update = function() {
	if ( this.mouseState === "downBtnRotate") {
		this.updateRotation();
	}

	if ( this.mouseState === "downBtnPan") {
		this.updatePan();
	}

	// radius
	var x = this.radius * Math.cos( this.theta ) * Math.sin(this.phi);
	var z = this.radius * Math.sin( this.theta ) * Math.sin(this.phi);
	var y = this.radius * Math.cos(this.phi);

	this.cam.position.copy( v3(x,y,z) );
	this.cam.lookAt( v3(0,0,0) );


	this.mousePosPrev.x = this.mousePos.x;
	this.mousePosPrev.y = this.mousePos.y;
};

CameraControllerC4D.prototype.updatePan = function() {

};

CameraControllerC4D.prototype.updateRotation = function() {

	var mousePosRelX = this.mousePos.x - this.mousePosPrev.x;
	var mousePosRelY = this.mousePos.y - this.mousePosPrev.y;

	this.theta += mousePosRelX*0.015;
	this.phi = clamp( this.phi - mousePosRelY*0.01, -Math.PI*0.5, Math.PI*0.5)
};

CameraControllerC4D.prototype.start = function() {

};