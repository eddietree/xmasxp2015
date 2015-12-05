var Human = function(firstName) {
	SceneObj.call(this);
	LOG("Creating Human");
};

Human.prototype = Object.create(SceneObj.prototype);
Human.prototype.constructor = Human;

Human.prototype.init = function() {

	var colladaScene = RES.models['cliff.dae'];
	var meshesBody = getMeshesUsingMaterial( colladaScene, "Body");
	LOG( meshesBody.length + " meshes found with 'Body' material");

	meshesBody.forEach( function(mesh) {
		//mesh.material = new THREE.MeshBasicMaterial({color:0xffffbb});
		/*mesh.material =
			new THREE.ShaderMaterial({
		    	vertexShader:   RES.shaders['snow.vp'],
		    	fragmentShader: RES.shaders['snow.fp'],
		    	uniforms: { 
			        uTime: {type: "f", value: 0.0},
			        uColorSky: {type: "v3", value: v3(SETTINGS.clearColor)},
			    },
			});*/
	});

	this.meshesBody = meshesBody;
};

Human.prototype.start = function() {
};

Human.prototype.update = function() {

};

Human.prototype.draw = function() {
};