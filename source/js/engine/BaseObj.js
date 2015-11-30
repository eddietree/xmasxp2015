var BaseObj = function(firstName) {
	THREE.Object3D.call(this);
	this.firstName = firstName;
};

BaseObj.prototype = Object.create( THREE.Object3D.prototype );
BaseObj.prototype.constructor = BaseObj;

BaseObj.prototype.test = function() {
	
}