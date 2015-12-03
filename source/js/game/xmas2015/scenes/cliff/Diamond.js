var Diamond = function(model) {
	SceneObj.call(this);
	this.add(model);

	LOG("Creating Diamond");
};

Diamond.prototype = Object.create(SceneObj.prototype);
Diamond.prototype.constructor = Diamond;

Diamond.prototype.init = function() {
	
};

Diamond.prototype.start = function() {
};

Diamond.prototype.update = function() {
	this.position.setY( Math.sin(APP.time) * 1.0 );
};

Diamond.prototype.draw = function() {
};