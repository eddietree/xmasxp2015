var App = function(firstName) {
	this.firstName = firstName;
};

App.prototype.Init = function() {

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	this.renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	// test cube
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	this.cube = new THREE.Mesh(geometry, material);
	this.scene.add(this.cube);

	this.camera.position.z = 5;

	var tween = new TWEEN.Tween(this.cube.position)
        .to({ x: 1, y: 1, z: 1 }, 500)
        //.delay(1000)
        .easing(TWEEN.Easing.Back.In)
        .start();

     var test = v3(1,2,3);
};

App.prototype.Update = function() {
	//this.cube.rotation.x += 0.1;
	//this.cube.rotation.y += 0.1;

	TWEEN.update();
};

App.prototype.Render = function() {
	this.renderer.render(this.scene, this.camera);
};

App.prototype.ResizeToFitScreen = function() {
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
};