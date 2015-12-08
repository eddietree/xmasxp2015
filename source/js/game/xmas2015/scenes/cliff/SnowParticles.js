var SnowParticles = function(firstName) {
	SceneObj.call(this);
	LOG("Creating SnowParticles");
};

SnowParticles.prototype = Object.create(SceneObj.prototype);
SnowParticles.prototype.constructor = SnowParticles;

SnowParticles.prototype.init = function() {

	var makeGeo = function() {

		var numParticles = 3000;
		var spread = v3(SETTINGS.snowParticleBounds.x, SETTINGS.snowParticleBounds.y, SETTINGS.snowParticleBounds.z);

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
			        uColorSnow: {type: "v3", value: v3(SETTINGS.snowParticleColor)},
			        uColorSky: {type: "v3", value: v3(SETTINGS.clearColor)},
			        uBounds: {type: "v3", value: spread},
			        uWindDir: {type: "v3", value: v3(SETTINGS.snowParticleWindDir.x, SETTINGS.snowParticleWindDir.y, SETTINGS.snowParticleWindDir.z)},
			        uTex: {type: "t", value: tex},
			        uParticleRadius: {type: "f", value:SETTINGS.snowParticleDiameter},
			    },

			});
	    material.transparent = true;
	    material.depthWrite = false;
	    //material.depthTest = false;

	    // add line object
	    //var material = new THREE.PointsMaterial({color:0xffffff, map:tex});
	    var points = new THREE.Points(geometry, material);
	    this.material = material;
	    this.colorSky = new THREE.Color( SETTINGS.clearColor );
	    this.colorSnow = new THREE.Color( SETTINGS.clearColor );

	   	this.add(points);
	};

	makeGeo.call(this);
};

SnowParticles.prototype.start = function() {
};

SnowParticles.prototype.update = function() {

	this.colorSky.setHex( SETTINGS.clearColor );
	this.colorSnow.setHex( SETTINGS.snowParticleColor );

	var uniforms = this.material.uniforms;
	uniforms.uTime.value = APP.time * SETTINGS.snowParticleWindSpeed;
	uniforms.uColorSky.value.set( this.colorSky.r, this.colorSky.g, this.colorSky.b);
	uniforms.uColorSnow.value.set( this.colorSnow.r, this.colorSnow.g, this.colorSnow.b);
	uniforms.uParticleRadius.value = SETTINGS.snowParticleDiameter;
	uniforms.uWindDir.value = v3(SETTINGS.snowParticleWindDir.x, SETTINGS.snowParticleWindDir.y, SETTINGS.snowParticleWindDir.z);
};

SnowParticles.prototype.draw = function() {
};