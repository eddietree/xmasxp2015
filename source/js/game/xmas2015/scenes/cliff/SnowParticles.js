var SnowParticles = function(firstName) {
	SceneObj.call(this);
	LOG("Creating SnowParticles");
};

SnowParticles.prototype = Object.create(SceneObj.prototype);
SnowParticles.prototype.constructor = SnowParticles;

SnowParticles.prototype.init = function() {

	var makeGeo = function() {

		var numParticles = 256;
		var spread = v3( 70.0, 30.0, 15.0 );

		var geometry = new THREE.Geometry();
		for( var i = 0; i < numParticles; i+=1 ) { 
			var posX = randBetween(-spread.x, spread.x);
			var posY = randBetween(-spread.y, spread.y);
			var posZ = randBetween(-spread.z, spread.z);
			geometry.vertices.push( v3(posX, posY, posZ) );
		}

	    // add line object
	    var material = new THREE.PointsMaterial({color:0xffffff});
	    var points = new THREE.Points(geometry, material);

	   	this.add(points);
	}

	makeGeo.call(this);
};

SnowParticles.prototype.start = function() {
};

SnowParticles.prototype.update = function() {

};

SnowParticles.prototype.draw = function() {
};