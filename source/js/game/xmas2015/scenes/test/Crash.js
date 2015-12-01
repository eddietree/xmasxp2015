var Crash = function(firstName) {
	SceneObj.call(this);

	this.meshes = {};
	LOG("Creating Crash");
};

Crash.prototype = Object.create(SceneObj.prototype);
Crash.prototype.constructor = Crash;

Crash.prototype.init = function() {

	var that = this;

	/*var loader = new THREE.OBJMTLLoader();
	loader.load(

		// resource URL
		'resource/obj/crash.obj',
		'resource/obj/crash.mtl',

		// Function when resource is loaded
		function ( object ) {
			console.log(object);
			that.add( object );
		},

		// Function called when downloads progress
		function ( xhr ) {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},

		// Function called when downloads error
		function ( xhr ) {
			console.log( 'An error happened' );
		}
	);*/

	
	var loader = new THREE.OBJLoader();

	// load a resource
	loader.load(

		// resource URL
		'resource/obj/cliff.obj',

		// Function when resource is loaded
		function ( object ) {
			LOG(object);
			that.add( object );

			//object.scale.multiplyScalar(1.0);

			for( var i = 0; i < object.children.length; i+=1 ) {
				var child = object.children[i];
				//child.material = new THREE.MeshNormalMaterial( {});
				child.material = new THREE.MeshPhongMaterial( {color:0xffffff} );
			}
		}
	);
};

Crash.prototype.start = function() {
};

Crash.prototype.update = function() {
	for( var i = 0; i < this.children.length; i+=1 ) {
		var child = this.children[i];
		//child.rotation.z += 0.01;
	}
};

Crash.prototype.draw = function() {
};