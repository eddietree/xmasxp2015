var SceneCliff = function(firstName) {
	Scene.call(this);
};

SceneCliff.prototype = Object.create(Scene.prototype);
SceneCliff.prototype.constructor = SceneCliff;

SceneCliff.prototype.init = function() {
	Scene.prototype.init.call(this);
	this.parseSceneCollada();
	
	//this.addSceneObj('TestBox', new TestBox());
	this.addSceneObj('LightDark', new LightDark());
	this.addSceneObj('SnowParticles', new SnowParticles());
	this.addSceneObj('SnowObjects', new SnowObjects());
	this.addSceneObj('Vignette', new Vignette());
	this.addSceneObj('SunShaft', new SunShaft());
	this.addSceneObj('Human', new Human());
	this.addSceneObj('Ribbons', new Ribbons());
	this.addSceneObj('Hypercube', new Hypercube());

	// ambient light
	this.ambientLight = new THREE.AmbientLight( SETTINGS.ambientLightColor );
	this.add( this.ambientLight );

	APP.renderer.setClearColor( SETTINGS.clearColor, 1);
	if ( SETTINGS.fogEnabled) APP.scene.fog = new THREE.FogExp2( SETTINGS.clearColor, 0.03 );

	this.initGui();
};

SceneCliff.prototype.initGui = function() {
	var folder = APP.gui.addFolder("Environment");

	folder.addColor(SETTINGS, 'ambientLightColor').listen();
	folder.addColor(SETTINGS, 'clearColor').listen();
	folder.addColor(SETTINGS, 'snowColor').listen();
	folder.addColor(SETTINGS, 'snowParticleColor').listen();

	if ( APP.scene.fog ) {
		folder.add(SETTINGS, 'fogDensity', 0.01, 0.1).listen();
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
		light.intensity = 2;
		light.distance = 27;

		if (this.mainLight == null) {
			this.mainLight = light;
		}

		var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: light.color} );
		var sphere = new THREE.Mesh( geometry, material );
		sphere.position.copy( object.position );
		sphere.scale.multiplyScalar(0.1);
		APP.debugObjs.add(sphere);

		// point light helper
		//var pointLightHelper = new THREE.PointLightHelper( light, light.distance );
		//APP.debugObjs.add( pointLightHelper );
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

	// remove the "ignore" tag
	for( var i = 0; i < colladaScene.children.length; i+=1 ) {
		if ( colladaScene.children[i].name === "Ignore") {
			colladaScene.remove(colladaScene.children[i]);
			break;
		}
	}

	this.add(colladaScene);
	traverseObj(colladaScene);

	if ( SETTINGS.debug ) {
		LOG("Collada File:");
		LOG(colladaScene);
	}

	var results = getMeshesUsingMaterial( colladaScene, "Snow");
};

SceneCliff.prototype.update = function() {

	APP.renderer.setClearColor( SETTINGS.clearColor, 1);
	this.ambientLight.color.setHex( SETTINGS.ambientLightColor );

	if ( APP.scene.fog ) { 
		APP.scene.fog.density = SETTINGS.fogDensity; 
		APP.scene.fog.color.setHex(SETTINGS.clearColor);
	}

	this.updateObjs();
	Scene.prototype.update.call(this);
};

SceneCliff.prototype.updateObjs = function() {


	if ( this.mainLight ) {
		this.mainLight.intensity = SETTINGS.mainLightIntensity;
		this.mainLight.distance = SETTINGS.mainLightDistance;
	}
};