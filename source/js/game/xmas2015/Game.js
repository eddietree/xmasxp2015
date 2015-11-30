var Game = function() {};

Game.prototype = {

	initSceneObjects: function() {
		this.sceneObjs = {
			box: new TestBox(),
		};

		for (key in this.sceneObjs) {
			var obj = this.sceneObjs[key];
			obj.init();
		}
	},

	init: function() {
		this.initSceneObjects();
	},

	update: function() {
		for (key in this.sceneObjs) {
			var obj = this.sceneObjs[key];
			obj.update();
		}
	},

	draw: function() {

	},
};