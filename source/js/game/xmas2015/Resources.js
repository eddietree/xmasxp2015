var Resources = function() {

	this.models = {};
	this.textures = {};
	this.audio = {};

	this.loadingTrackedItems = {};
};

Resources.prototype.load = function() {
	this.loadTextures();
	this.loadModels();
	this.loadAudio();
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

		var loadingTrackedData = {loaded:0, totalSize: 1<<14};
		this.loadingTrackedItems[this.loadingTrackedItems.length] = loadingTrackedData;

		var loader = new THREE.ColladaLoader();
		loader.load(

			filename, // resource URL

			// Function when resource is loaded
			function ( collada ) {
				LOG("Loaded Collada file: " + filename );
				LOG(collada.scene);

				that.onLoadedCollada(collada.scene);
			},

			// Function called when download progresses
			function ( xhr ) {
				LOG(xhr);

				loadingTrackedData.loaded = xhr.loaded;
				loadingTrackedData.totalSize = xhr.totalSize;

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

Resources.prototype.onLoadedTexture = function(obj) {
	LOG("Loaded Texture");

	// TODO:
};

Resources.prototype.onLoadedCollada = function(obj) {

	// TODO: need to parse model
};
Resources.prototype.onLoadedAudio = function(obj) {
	LOG("Loaded Audio");

	// TODO: 
};

Resources.prototype.start = function() {

};