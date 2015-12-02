var Resources = function() {

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
	var loadedBytes = 1;
	var totalSizeBytes = 1;

	for( var i = 0; i < this.loadingTrackedItems.length; i+=1 ) {
		var item = this.loadingTrackedItems[i];

		loadedBytes += item.loadedBytes;
		totalSizeBytes += item.totalSizeBytes;
	}

	return loadedBytes / totalSizeBytes;
};

Resources.prototype.getNumTrackedItems = function() {
	return this.loadingTrackedItems.length;
};

Resources.prototype.isLoadingFinished = function() {
	if (this.loadingTrackedItems.length == 0) {
		return true;
	}

	var loadedBytes = 0;
	var totalSizeBytes = 0;

	for( var i = 0; i < this.loadingTrackedItems.length; i+=1 ) {
		var item = this.loadingTrackedItems[i];

		loadedBytes += item.loadedBytes;
		totalSizeBytes += item.totalSizeBytes;
	}

	if ( totalSizeBytes == 0 )
		return false;

	return loadedBytes == totalSizeBytes;
};

Resources.prototype.loadTextures = function() {

	// TODO:
};

Resources.prototype.loadModels = function() {
	LOG("Loading models");

	var defs = {
		'resource/obj/cliff.dae' : {param:null},
	};

	var that = this;
	
	for( key in defs ) {
		var val = defs[key];
		var filename = key;

		var loadingTrackedData = {loadedBytes:0, totalSizeBytes: 1<<14};
		this.loadingTrackedItems[this.loadingTrackedItems.length] = loadingTrackedData;

		var loader = new THREE.ColladaLoader();
		loader.load(

			filename, // resource URL

			// Function when resource is loaded
			function ( collada ) {
				LOG("Loaded Collada file: " + filename );
				LOG(collada.scene);

				that.models[filename] = collada.scene;
			},

			// Function called when download progresses
			function ( xhr ) {
				LOG(xhr);

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

Resources.prototype.start = function() {

};