var App = function() {
};

App.prototype = {
	init: function() {

		this.time = 0.0;
		this.fps = 60.0;
		this.dt = 1.0/this.fps;
		this.mouse = v2(0.0);
		this.mousePrev = v2(0.0);
		this.mouseRel = v2(0.0);
		this.mouseNormalized = v2(-1.0);

		// scene
		this.scene = new THREE.Scene();
		
		// scene's camera
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 15;

		// renderer
		this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:SETTINGS.antiAliasing });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0x9ee3de, 1);
		document.body.appendChild(this.renderer.domElement);

		this.debugObjs = new THREE.Object3D();

		// gui
		if ( SETTINGS.debug  ) {
			this.gui = new dat.GUI();

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

		var that = this;
		window.addEventListener( 'mousemove', function(event) {
			var mouseXNorm = ( event.clientX / window.innerWidth ) * 2 - 1;
			var mouseYNorm = - ( event.clientY / window.innerHeight ) * 2 + 1;	
			var mouseCurr = v2(event.clientX, event.clientY);

			that.mouse = mouseCurr;
			that.mouseNormalized = v2(mouseXNorm, mouseYNorm);
		});
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


		this.mouseRel.copy(this.mouse);//
		this.mouseRel.sub(this.mousePrev);
		this.mousePrev.copy(this.mouse);
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