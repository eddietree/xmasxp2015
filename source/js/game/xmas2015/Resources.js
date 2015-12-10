var Resources = function() {

	// textures!
	this.defTextures = {
		'perlin.png' : {},
		'particle.png' : {},
	};

	// dae files
	this.defModels = {
		'cliff.dae' : {},
	};

	this.defJSON = [
		'Settings.json',
	];

	this.defAudio = {
		'lull' : { urls:['resource/audio/lull.ogg'], filesize: 1085000, volume:1.0, loop:true },
		'vex' : { urls:['resource/audio/vex.ogg'], filesize: 914000, volume:1.0, loop:true },
		'ping' : { urls:['resource/audio/ping.ogg'], filesize: 7000, volume:1.0, loop:false },
		'charging' : { urls:['resource/audio/charging.ogg'], filesize: 81000, volume:0.2, loop:true },
	};

	this.defShaders = [
		'basic.vp', 'basic.fp',
		'diamond.vp', 'diamond.fp',
		'snow.vp', 'snow.fp',
		'snowParticles.vp', 'snowParticles.fp',
		'vignette.vp', 'vignette.fp',
		'sunShaft.vp', 'sunShaft.fp',
		'ribbons.vp', 'ribbons.fp',
	];

	this.shaders = {};
	this.models = {};
	this.textures = {};
	this.audio = {};
	this.json = {};

	this.loadingTrackedItems = [];
};

Resources.prototype.load = function() {
	this.loadJSON();
	this.loadTextures();
	this.loadModels();
	this.loadAudio();
	this.loadShaders();
};

Resources.prototype.getPercentageLoaded = function() {
	var loadedBytes = 0;
	var totalSizeBytes = 0;

	for( var i = 0; i < this.loadingTrackedItems.length; i+=1 ) {
		var item = this.loadingTrackedItems[i];

		loadedBytes += item.loadedBytes;
		totalSizeBytes += item.totalSizeBytes;
	}

	if ( totalSizeBytes === 0 )
		return 0.0;
	
	return loadedBytes / totalSizeBytes;
};

Resources.prototype.getNumTrackedItems = function() {
	return this.loadingTrackedItems.length;
};

Resources.prototype.isLoadingFinished = function() {
	if (this.loadingTrackedItems.length === 0) {
		return true;
	}

	var loadedBytes = 0;
	var totalSizeBytes = 0;

	for( var i = 0; i < this.loadingTrackedItems.length; i+=1 ) {
		var item = this.loadingTrackedItems[i];

		loadedBytes += item.loadedBytes;
		totalSizeBytes += item.totalSizeBytes;
	}

	if ( totalSizeBytes === 0 )
		return false;

	return loadedBytes == totalSizeBytes;
};

Resources.prototype.loadTextures = function() {

	LOG("Loading Textures");

	var defs = this.defTextures;
	var that = this;
	
	for( var key in defs ) {
		var val = defs[key];
		var filename = key;
		this.loadTexture(key);
	}
};

Resources.prototype.loadTexture = function( filename ) {

	var that = this;
	var filepath = 'resource/tex/' + filename;

	//LOG(filename);

	var loadingTrackedData = {loadedBytes:0, totalSizeBytes: 1<<14};
	this.loadingTrackedItems[this.loadingTrackedItems.length] = loadingTrackedData;

	var loader = new THREE.TextureLoader();
	loader.load(

		filepath, // resource URL

		// Function when resource is loaded
		function ( res ) {
			LOG("Loaded Texture file: " + filepath );
			//LOG(res);
			loadingTrackedData.loadedBytes = loadingTrackedData.totalSizeBytes;
			that.textures[filename] = res;
		},

		// Function called when download progresses
		function ( xhr ) {
			loadingTrackedData.loadedBytes = xhr.loaded;
			loadingTrackedData.totalSizeBytes = xhr.total;
			LOG( (xhr.loaded / xhr.total * 100) + '% loaded: ' + filename );
		},

		// Function called when download progresses
		function ( xhr ) {
			LOG("ERROR loading Texture file: " + filepath );
			//console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		}
	);
};

Resources.prototype.loadModels = function() {
	LOG("Loading models");

	var defs = this.defModels;
	var that = this;
	
	for( var key in defs ) {
		var val = defs[key];
		var filename = key;
		this.loadModel(filename);
	}
};

Resources.prototype.loadModel = function( filename ) {

	var that = this;
	var filepath = 'resource/obj/' + filename;

	var loadingTrackedData = {loadedBytes:0, totalSizeBytes: 1<<14};
	this.loadingTrackedItems[this.loadingTrackedItems.length] = loadingTrackedData;

	var loader = new THREE.ColladaLoader();
	loader.load(

		filepath, // resource URL

		// Function when resource is loaded
		function ( res ) {
			LOG("Loaded Collada file: " + filepath );
			//LOG(res.scene);

			loadingTrackedData.loadedBytes = loadingTrackedData.totalSizeBytes;
			that.models[filename] = res.scene;
		},

		// Function called when download progresses
		function ( xhr ) {
			loadingTrackedData.loadedBytes = xhr.loaded;
			loadingTrackedData.totalSizeBytes = xhr.total;

			LOG( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},

		// Function called when download progresses
		function ( xhr ) {
			LOG("ERROR loading Collada file: " + filepath );
			LOG( (xhr.loaded / xhr.total * 100) + '% loaded' );
		}
	);
};

Resources.prototype.loadJSON = function() {
	
	var defs = this.defJSON;
	var that = this;
	
	defs.forEach(function(filename) {
		//var val = defs[key];
		//var filename = key;
		var filepath = 'resource/json/' + filename;

		var loadingTrackedData = {loadedBytes:0, totalSizeBytes: 512};
		that.loadingTrackedItems[that.loadingTrackedItems.length] = loadingTrackedData;

		$.getJSON(filepath, function(json) {
			loadingTrackedData.loadedBytes = loadingTrackedData.totalSizeBytes;
			LOG("Loaded JSON file: " + filename);
			that.json[filename] = json;
		});
	});
};

Resources.prototype.loadAudioDef = function( key ) {

	var that = this;
	var defs = this.defAudio;
	var val = defs[key];

	var loadingTrackedData = {loadedBytes:0, totalSizeBytes: val.filesize};
	that.loadingTrackedItems[that.loadingTrackedItems.length] = loadingTrackedData;

	LOG(val);
	var sound = new Howl({
		urls: val.urls,
		autoplay: false,
		loop: val.loop | false,
		volume: val.volume,
		onload: function() {
			loadingTrackedData.loadedBytes = loadingTrackedData.totalSizeBytes;
			that.audio[key] = sound;

			LOG("Loaded audio file: " + key);
			LOG(sound);
		}
	});
}

Resources.prototype.loadAudio = function() {
	var defs = this.defAudio;
	//var that = this;

	for( var key in defs ) {
		//var val = defs[key];
		this.loadAudioDef(key);

		//LOG(filename);
		//this.loadModel(filename);
	};
};

Resources.prototype.loadShaders = function() {

	var defs = this.defShaders;
	var that = this;
	
	defs.forEach(function(filename) {
		var filepath = 'resource/shaders/' + filename;

		var loadingTrackedData = {loadedBytes:0, totalSizeBytes: 1024};
		that.loadingTrackedItems[that.loadingTrackedItems.length] = loadingTrackedData;

		var request = new XMLHttpRequest();
		if (request.overrideMimeType) {
			request.overrideMimeType('text/plain');
		}

		// success!
		function handleLoad(e) {
			loadingTrackedData.loadedBytes = loadingTrackedData.totalSizeBytes;
			LOG("Loaded shader: " + filepath);
			that.shaders[filename] = request.responseText;
		}

		// error
		function handleError(e) {
			LOG("Error loading shader: " + filepath);
		}

		request.open('get', filepath, true);
		request.addEventListener('load', handleLoad, false);
		request.addEventListener('error', handleError, false);
		request.send();
	});
};