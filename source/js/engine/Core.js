var Core = function(firstName) {
	this.firstName = firstName;
};

};

Core.prototype = {
	init: function() {

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({canvas: canvas });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0xAAAAAA, 1);
		document.body.appendChild(this.renderer.domElement);

		this.camera.position.z = 5;
		
		// test cube
		this.game = new Game();
		this.game.init();

		/*var test = v3(1, 2);
		test.add(v3(2, 2, 2));
		LOG(test);
		//ASSERT(false);
		*/
	},

	update: function() {
		TWEEN.update();
	},

	draw: function() {
		this.renderer.render(this.scene, this.camera);
	},

	resizeToFitScreen: function() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	},
};