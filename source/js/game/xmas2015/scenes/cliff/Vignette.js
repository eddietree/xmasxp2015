var Vignette = function(firstName) {
	SceneObj.call(this);
	LOG("Creating Vignette");
};

Vignette.prototype = Object.create(SceneObj.prototype);
Vignette.prototype.constructor = Vignette;

Vignette.prototype.init = function() {
	this.initGeo();
};

Vignette.prototype.initGeo = function() {
	var geometry = new THREE.Geometry();
	geometry.vertices.push( v3( 0.0, 0.0, 0.0 ) );
	geometry.vertices.push( v3( 1.0, 0.0, 0.0 ) );
	geometry.vertices.push( v3( 1.0, 1.0, 0.0 ) );
	geometry.vertices.push( v3( 0.0, 1.0, 0.0 ) );

	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

	var material = 
		new THREE.ShaderMaterial({
	    	vertexShader:   RES.shaders['vignette.vp'],
	    	fragmentShader: RES.shaders['vignette.fp'],
	    	uniforms: { 
		        //uColorSky: {type: "v3", value: v3(SETTINGS.clearColor)},
		    },
		});

    // add line object
    //var material = new THREE.MeshBasicMaterial({color:0xffffff});
    material.depthTest = false;
    material.transparent = true;
    //material.opacity = 0.25;
    var mesh  = new THREE.Mesh(geometry, material);
    mesh.renderOrder = 1;
    mesh.frustumCulled = false;

    this.add(mesh);
};

Vignette.prototype.start = function() {

};

Vignette.prototype.update = function() {
};

Vignette.prototype.draw = function() {
};