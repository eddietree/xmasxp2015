var CameraController = function() {
	THREE.Object3D.call(this);

	this.rotPhi = 0.0;
	this.rotTheta = 0.0;
	this.radius = 0.0;
	this.posOffset = v2(0.0);
};

CameraController.prototype = Object.create( THREE.Object3D.prototype );
CameraController.prototype.constructor = CameraController;

CameraController.prototype.init = function() {
};


CameraController.prototype.update = function() {

};

CameraController.prototype.start = function() {

};