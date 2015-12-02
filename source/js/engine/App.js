var App = function() {
};

App.prototype = {
	init: function() {

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({canvas: canvas });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0xAAAAAA, 1);
		document.body.appendChild(this.renderer.domElement);

		this.camera.position.z = 15;
		//this.camera.position = v3(10);
	},

	startGame : function() {

		controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
		controls.enableDamping = true;
		controls.dampingFactor = 0.8;
		controls.enableZoom = true;

		this.game = new Game();
		this.game.init();
		this.game.start();
	},

	update: function() {
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