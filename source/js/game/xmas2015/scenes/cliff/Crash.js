var Crash = function(firstName) {
	SceneObj.call(this);

	LOG("Creating Crash");
};

Crash.prototype = Object.create(SceneObj.prototype);
Crash.prototype.constructor = Crash;

Crash.prototype.init = function() {
	//var scene = RES.models['resource/obj/cliff.dae'];
	//this.add(scene);
};

Crash.prototype.start = function() {
};

Crash.prototype.update = function() {
	for( var i = 0; i < this.children.length; i+=1 ) {
		var child = this.children[i];
	}
};

Crash.prototype.draw = function() {
};