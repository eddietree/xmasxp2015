var Resources = function() {

	// textures!
	this.defTextures = {
		'resource/tex/cliff-test.png' : {param:null},
	};

	// dae files
	this.defModels = {
		'resource/obj/cliff.dae' : {param:null},
	};

	this.models = {};
	this.textures = {};
	this.audio = {};
	this.loadingTrackedItems = [];
};

Resources.prototype.load = function() {
	this.loadTextures();
	this.loadModels();
	this.loadAudio();
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

		var loadingTrackedData = {loadedBytes:0, totalSizeBytes: 1<<14};
		this.loadingTrackedItems[this.loadingTrackedItems.length] = loadingTrackedData;

		var loader = new THREE.TextureLoader();
		loader.load(

			filename, // resource URL

			// Function when resource is loaded
			function ( res ) {
				LOG("Loaded Texture file: " + filename );
				loadingTrackedData.loadedBytes = loadingTrackedData.totalSizeBytes;
				that.textures[filename] = res;
			},

			// Function called when download progresses
			function ( xhr ) {
				loadingTrackedData.loadedBytes = xhr.loaded;
				loadingTrackedData.totalSizeBytes = xhr.total;
				//LOG( (xhr.loaded / xhr.total * 100) + '% loaded' );
			},

			// Function called when download progresses
			function ( xhr ) {
				LOG("ERROR loading Texture file: " + filename );
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			}
		);
	}
};

Resources.prototype.loadModels = function() {
	LOG("Loading models");

	var defs = this.defModels;
	var that = this;
	
	for( var key in defs ) {
		var val = defs[key];
		var filename = key;

		var loadingTrackedData = {loadedBytes:0, totalSizeBytes: 1<<14};
		this.loadingTrackedItems[this.loadingTrackedItems.length] = loadingTrackedData;

		var loader = new THREE.ColladaLoader();
		loader.load(

			filename, // resource URL

			// Function when resource is loaded
			function ( res ) {
				LOG("Loaded Collada file: " + filename );
				LOG(res.scene);

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
				LOG("ERROR loading Collada file: " + filename );
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			}
		);
	}
};

Resources.prototype.loadAudio = function() {
	// TODO:
};