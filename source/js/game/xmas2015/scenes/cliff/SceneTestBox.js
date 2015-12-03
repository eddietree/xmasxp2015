var SceneTestBox = function(firstName) {
	Scene.call(this);
};

SceneTestBox.prototype = Object.create(Scene.prototype);
SceneTestBox.prototype.constructor = SceneTestBox;

SceneTestBox.prototype.init = function() {
	Scene.prototype.init.call(this);
	this.parseSceneCollada();
	
	//this.addSceneObj('TestBox', new TestBox());
	this.addSceneObj('SnowParticles', new SnowParticles());

	// ambient light
	this.ambientLight = new THREE.AmbientLight( 0x222211 );
	this.add( this.ambientLight );
	LOG(this.ambientLight);

	this.initGui();
};

SceneTestBox.prototype.initGui = function() {
	APP.gui.addColor(SETTINGS, 'ambientLightColor')
	APP.gui.addColor(SETTINGS, 'clearColor');
};

SceneTestBox.prototype.onLoadObject = function(object) {

	String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

	var name = object.name;

	if ( name.contains("Diamond") ) {
		//this.add(object);
		this.addSceneObj('Diamond', new Diamond(object));
	}

	else if ( name.contains("Light") ) {
		LOG(object);
		this.add(object);

		var light = object.children[0];
		light.intensity = 5;
		light.distance = 35;

		var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		var sphere = new THREE.Mesh( geometry, material );
		sphere.position.copy( object.position );
		sphere.scale.multiplyScalar(0.1);
		this.add(sphere);
	}

	else if ( name.contains("Cliff") ) {
		this.add(object);
	}

	else if ( name.contains("TreeTop") ) {
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

	var colladaScene = RES.models['cliff.dae'];
	traverseObj(colladaScene);
};

SceneTestBox.prototype.update = function() {
	APP.renderer.setClearColor( SETTINGS.clearColor, 1);
	this.ambientLight.color.setHex( SETTINGS.ambientLightColor );
	Scene.prototype.update.call(this);
};