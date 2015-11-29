var Core = function(firstName) {
	this.firstName = firstName;
};

Core.prototype = {
	init : function() {

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor( 0xAAAAAA, 1 );
		document.body.appendChild(this.renderer.domElement);

		// test cube
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({
			color: new THREE.Color( 0xff00ff)
		});
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);

		this.camera.position.z = 5;

		var tween = new TWEEN.Tween(this.cube.position)
			.to({
				x: 1,
				y: 1,
				z: 1
			}, 500)
			//.delay(1000)
			.easing(TWEEN.Easing.Back.In)
			.start();

		var test = v3(1, 2);
		test.add(v3(2, 2, 2));
		LOG(test);
		//ASSERT(false);
	}, 

	update : function() {
		//this.cube.rotation.x += 0.1;
		//this.cube.rotation.y += 0.1;

		TWEEN.update();
	},

	draw : function() {
		this.renderer.render(this.scene, this.camera);
	},

	resizeToFitScreen : function() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	},
};