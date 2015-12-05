var SnowParticles = function(firstName) {
	SceneObj.call(this);
	LOG("Creating SnowParticles");
};

SnowParticles.prototype = Object.create(SceneObj.prototype);
SnowParticles.prototype.constructor = SnowParticles;

SnowParticles.prototype.init = function() {

	var makeGeo = function() {

		var numParticles = 512;
		var spread = v3( 70.0, 30.0, 20.0 );

		var geometry = new THREE.Geometry();
		for( var i = 0; i < numParticles; i+=1 ) { 
			var posX = randBetween(-spread.x, spread.x);
			var posY = randBetween(-spread.y, spread.y);
			var posZ = randBetween(-spread.z, spread.z);
			geometry.vertices.push( v3(posX, posY, posZ) );
		}

	    var tex = RES.textures['particle.png'];
		var material =
			new THREE.ShaderMaterial({
		    	vertexShader:   RES.shaders['snowParticles.vp'],
		    	fragmentShader: RES.shaders['snowParticles.fp'],
		    	uniforms: { 
			        uTime: {type: "f", value: 0.0},
			        uColorSky: {type: "v3", value: v3(SETTINGS.clearColor)},
			        uTex: {type: "t", value: tex},
			    },

			});
	    material.transparent = true;

	    // add line object
	    //var material = new THREE.PointsMaterial({color:0xffffff, map:tex});
	    var points = new THREE.Points(geometry, material);
	    this.material = material;

	   	this.add(points);
	};

	makeGeo.call(this);
};

SnowParticles.prototype.start = function() {
};

SnowParticles.prototype.update = function() {

	var colorSky = new THREE.Color( SETTINGS.clearColor );

	var uniforms = this.material.uniforms;
	uniforms.uTime.value = APP.time;
	uniforms.uColorSky.value = v3(colorSky.r, colorSky.g, colorSky.b);;
};

SnowParticles.prototype.draw = function() {
};