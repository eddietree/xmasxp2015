var Diamond = function(model) {
	LOG("Creating Diamond");

	SceneObj.call(this);
	this.add(model);

	var mesh = model.children[0];

	// shader
	this.material =
	  new THREE.ShaderMaterial({
	    vertexShader:   RES.shaders['diamond.vp'],
	    fragmentShader: RES.shaders['diamond.fp'],

	    /*uniforms: { 
	        tExplosion: {
	            type: "t", 
	            value: THREE.ImageUtils.loadTexture( 'explosion.png' )
	        },
	        time: { // float initialized to 0
	            type: "f", 
	            value: 0.0 
	        }
	    },

	    attributes: {
			vertexOpacity: { type: 'f', value: [] }
		},*/

	});

	mesh.material = this.material;
};

Diamond.prototype = Object.create(SceneObj.prototype);
Diamond.prototype.constructor = Diamond;

Diamond.prototype.init = function() {
	
};

Diamond.prototype.start = function() {
};

Diamond.prototype.update = function() {
	this.position.copy(v3(5.0,5.0,0.0));
	//this.position.setY( Math.sin(APP.time) * 1.0 );
	this.rotation.set( 0.0,APP.time * 0.5,0.0, 'XYZ' );

	//this.material.uniforms.time.value = APP.time;
};

Diamond.prototype.draw = function() {
};