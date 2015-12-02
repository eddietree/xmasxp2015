var Crash = function(firstName) {
	SceneObj.call(this);

	this.meshes = {};
	LOG("Creating Crash");
};

Crash.prototype = Object.create(SceneObj.prototype);
Crash.prototype.constructor = Crash;

Crash.prototype.init = function() {

	var that = this;

	function onAddObject( object ) {
		//LOG(" ON ADD ");
		//LOG(object);

		if ( object.type == "Mesh" ) {
			LOG("MESH");
		}
		else if (object.type == "PointLight" ) {}
	};

	function traverseFamily( object ) {
		//LOG(" TRAVERSE ADD ");
		onAddObject(object);

		for( var i = 0; i < object.children.length; i+=1 ) {
			traverseFamily(object.children[i]);
		}
	}

	var loader = new THREE.ColladaLoader();

	loader.load(
		// resource URL
		'resource/obj/cliff.dae',
		// Function when resource is loaded
		function ( collada ) {
			LOG("SCENE BEGIN");
			LOG(collada.scene);
			LOG("SCENE END");

			traverseFamily(collada.scene );
			that.add( collada.scene );
		},
		// Function called when download progresses
		function ( xhr ) {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
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