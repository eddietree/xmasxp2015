var Game = function() {
};

Game.prototype.init = function() {
	this.sceneManager = new SceneManager();
	this.sceneManager.addScene('SceneTestBox', new SceneTestBox());
};

Game.prototype.start = function() {
	this.sceneManager.changeSceneTo('SceneTestBox');
};

Game.prototype.update = function() {
	this.sceneManager.update();
};

Game.prototype.draw = function() {
};