var TestBox = function(firstName) {
	SceneObj.call(this);
	LOG("Creating TestBox");
};

TestBox.prototype = Object.create(SceneObj.prototype);
TestBox.prototype.constructor = TestBox;

TestBox.prototype.init = function() {
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
		color: new THREE.Color(0xff00ff)
	});
	this.cube = new THREE.Mesh(geometry, material);


	var geometry2 = new THREE.BoxGeometry(1, 1, 1);
	var material2 = new THREE.MeshBasicMaterial({
		color: new THREE.Color(0xff00ff)
	});
	this.cube2 = new THREE.Mesh(geometry, material);
	this.cube2.position.x = 1;
	this.cube2.position.y = 1;
	this.cube2.position.z = 1;
	this.cube.add(this.cube2);

	this.add(this.cube);

	this.initLight();
	//APP.scene.add(this);
};

TestBox.prototype.initLight = function() {
	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 2, 2, 0 );
	APP.scene.add( spotLight );

	var spotLightHelper = new THREE.SpotLightHelper( spotLight );
	APP.scene.add( spotLightHelper );

	var ambient = new THREE.AmbientLight( 0x444444 );
	APP.scene.add( ambient );
};

TestBox.prototype.start = function() {
	var tween = new TWEEN.Tween(this.cube.position)
		.to({
			x: 1,
			y: 1,
			z: 1
		}, 500)
		//.delay(1000)
		.easing(TWEEN.Easing.Back.In)
		.start();
};

TestBox.prototype.update = function() {
};

TestBox.prototype.draw = function() {
};