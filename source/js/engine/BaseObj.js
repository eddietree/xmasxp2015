var BaseObj = function(firstName) {
	this.firstName = firstName;
	this.init();
};

BaseObj.prototype = Object.create( THREE.Object3D.prototype );
BaseObj.prototype.constructor = BaseObj;

BaseObj.prototype = {
	init: function() {
	},

	update: function() {
	},

	draw: function() {
	},
};