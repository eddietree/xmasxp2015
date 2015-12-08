var LightDark = function(firstName) {
	SceneObj.call(this);
	LOG("Creating LightDark");

	this.state = "LIGHT";
};

LightDark.prototype = Object.create(SceneObj.prototype);
LightDark.prototype.constructor = LightDark;

LightDark.prototype.init = function() {

	if ( SETTINGS.debug ) {
		var folder = APP.gui.addFolder("LightDark");
		//folder.add(SETTINGS, 'LightDarkAlpha', 0.0, 1.0);
		//folder.add(SETTINGS, 'LightDarkRadius', 0.0, 1.0);
	}
};

LightDark.prototype.start = function() {

};

LightDark.prototype.update = function() {
};

LightDark.prototype.draw = function() {
};

LightDark.prototype.onToggle = function() {
	LOG("LightDark.onToggle()");
};