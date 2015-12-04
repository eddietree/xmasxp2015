var SceneCliff = function(firstName) {
	Scene.call(this);
};

SceneCliff.prototype = Object.create(Scene.prototype);
SceneCliff.prototype.constructor = SceneCliff;

SceneCliff.prototype.init = function() {
	Scene.prototype.init.call(this);
	this.parseSceneCollada();
	
	//this.addSceneObj('TestBox', new TestBox());
	this.addSceneObj('SnowParticles', new SnowParticles());

	// ambient light
	this.ambientLight = new THREE.AmbientLight( SETTINGS.ambientLightColor );
	this.add( this.ambientLight );
	LOG(this.ambientLight);

	APP.renderer.setClearColor( SETTINGS.clearColor, 1);
	if ( SETTINGS.fogEnabled) APP.scene.fog = new THREE.FogExp2( SETTINGS.clearColor, 0.03 );

	this.initGui();
};

SceneCliff.prototype.initGui = function() {
	var folder = APP.gui.addFolder("Environment");

	folder.addColor(SETTINGS, 'ambientLightColor');
	folder.addColor(SETTINGS, 'clearColor');

	if ( APP.scene.fog ) {
		folder.add(SETTINGS, 'fogDensity', 0.01, 0.1);
	}
};

SceneCliff.prototype.onLoadObject = function(object) {

	String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

	var name = object.name;

	if ( name.contains("Diamond") ) {
		this.addSceneObj('Diamond', new Diamond(object));
	}

	else if ( name.contains("Light") ) {

		var light = object.children[0];
		light.intensity = 5;
		light.distance = 35;

		var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: light.color} );
		var sphere = new THREE.Mesh( geometry, material );
		sphere.position.copy( object.position );
		sphere.scale.multiplyScalar(0.1);
		APP.debugObjs.add(sphere);

		// point light helper
		var pointLightHelper = new THREE.PointLightHelper( light, light.distance );
		APP.debugObjs.add( pointLightHelper );
	}

	else if ( name.contains("Cliff") ) {
	}

	else if ( name.contains("TreeTop") ) {
	}
	else {
	}
};

SceneCliff.prototype.parseSceneCollada = function() {
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
	this.colladaScene = colladaScene;

	// remove the "ignore" tag
	for( var i = 0; i < colladaScene.children.length; i+=1 ) {
		if ( colladaScene.children[i].name === "Ignore") {
			colladaScene.remove(colladaScene.children[i]);
			break;
		}
	}

	this.add(colladaScene);
	traverseObj(colladaScene);
};

SceneCliff.prototype.update = function() {

	if ( SETTINGS.debug ) {
		APP.renderer.setClearColor( SETTINGS.clearColor, 1);
		this.ambientLight.color.setHex( SETTINGS.ambientLightColor );
		if ( APP.scene.fog ) { APP.scene.fog.density = SETTINGS.fogDensity; }
	}

	Scene.prototype.update.call(this);
};