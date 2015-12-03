var SceneTestBox = function(firstName) {
	Scene.call(this);
};

SceneTestBox.prototype = Object.create(Scene.prototype);
SceneTestBox.prototype.constructor = SceneTestBox;

SceneTestBox.prototype.init = function() {
	Scene.prototype.init.call(this);
	this.parseSceneCollada();
	
	//this.addSceneObj('TestBox', new TestBox());
	this.addSceneObj('Crash', new Crash());

	var ambient = new THREE.AmbientLight( 0x222211 );
	this.add( ambient );
};

SceneTestBox.prototype.onLoadObject = function(object) {
	var name = object.name;

	if ( name == "Diamond" ) {
		this.add(object);
	}

	else if ( name == "Light" ) {
		LOG(object);
		this.add(object);
	}

	else if ( name == "Cliff" ) {
		this.add(object);
	}

	else if ( name == "TreeTop" ) {
		this.add(object);
	}
	else {
		//this.add(object);
	}
};

SceneTestBox.prototype.parseSceneCollada = function() {
	var that = this;

	function traverseObj( object ) {

		// anything in ignore shall not be on
		if ( object.name == "Ignore") {
			return;
		}
		that.onLoadObject(object);

		for( var i = object.children.length-1; i >= 0; i-=1 ) {
			traverseObj(object.children[i]);
		}
	}

	var colladaScene = RES.models['resource/obj/cliff.dae'];
	traverseObj(colladaScene);
};

SceneTestBox.prototype.update = function() {
	Scene.prototype.update.call(this);
};