var Game = function(firstName) {
	this.firstName = firstName;
};

Game.prototype = {
	
	init: function() {
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({
			color: new THREE.Color(0xff00ff)
		});
		this.cube = new THREE.Mesh(geometry, material);

		var tween = new TWEEN.Tween(this.cube.position)
			.to({
				x: 1,
				y: 1,
				z: 1
			}, 500)
			//.delay(1000)
			.easing(TWEEN.Easing.Back.In)
			.start();

		g_core.scene.add(this.cube);
	},

	update: function() {

	},

	draw: function() {

	},
};