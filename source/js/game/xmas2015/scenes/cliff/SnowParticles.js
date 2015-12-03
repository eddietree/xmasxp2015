var SnowParticles = function(firstName) {
	SceneObj.call(this);

	LOG("Creating SnowParticles");
};

SnowParticles.prototype = Object.create(SceneObj.prototype);
SnowParticles.prototype.constructor = SnowParticles;

SnowParticles.prototype.init = function() {
	//var scene = RES.models['resource/obj/cliff.dae'];
	//this.add(scene);
};

SnowParticles.prototype.start = function() {
};

SnowParticles.prototype.update = function() {
	for( var i = 0; i < this.children.length; i+=1 ) {
		var child = this.children[i];
	}
};

SnowParticles.prototype.draw = function() {
};