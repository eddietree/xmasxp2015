var App = function() {
};

App.prototype = {
	init: function() {

		this.time = 0.0;
		this.fps = 60.0;
		this.dt = 1.0/this.fps;

		// scene
		this.scene = new THREE.Scene();
		
		// scene's camera
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 15;

		// renderer
		this.renderer = new THREE.WebGLRenderer({canvas: canvas });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0xAAAAAA, 1);
		document.body.appendChild(this.renderer.domElement);

		this.debugObjs = new THREE.Object3D;

		// gui
		this.gui = new dat.GUI();
		if ( SETTINGS.debug  ) {

			// add debug objs into scene
			this.scene.add(this.debugObjs);

			// handle keypress
			window.addEventListener("keypress", function(e) {
				//LOG("Key pressed: " + e.charCode);
				if ( e.charCode == 103 || e.charCode == 119 ) {
					dat.GUI.toggleHide();
				}
			});

		} else {
			dat.GUI.toggleHide();
		}
	},

	startGame : function() {
		this.game = new Game();
		this.game.init();
		this.game.start();
	},

	update: function() {

		this.time += this.dt;
		TWEEN.update();

		if ( this.game )
			this.game.update();
	},

	draw: function() {
		if ( this.game ) {
			this.game.draw();
		}

		this.renderer.render(this.scene, this.camera);
	},

	onWindowResized: function() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	},
};