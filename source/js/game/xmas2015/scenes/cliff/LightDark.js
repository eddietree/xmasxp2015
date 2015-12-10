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

	this.sndLight = RES.audio['lull'];
	this.sndDark = RES.audio['vex'];
};

LightDark.prototype.start = function() {

	this.sndLight.play();
	this.sndLight.fade(0.0, 1.0, 2000);
};

LightDark.prototype.update = function() {
};

LightDark.prototype.draw = function() {
};

LightDark.prototype.enableModeLight = function() {
	this.state = "LIGHT";

	LOG("LIGHT ON");
	this.toggleLightDark();

	this.sndDark.stop();
	this.sndLight.play();
};

LightDark.prototype.enableModeDark = function() {
	this.state = "DARK";

	

	LOG("DARK ON");
	this.toggleLightDark();

	this.sndDark.play();
	this.sndLight.stop();
};

LightDark.prototype.toggleLightDark = function() {

	var suffixDark = "Dark";

	for(var key in SETTINGS) { 

		var keyDark = key+suffixDark;

		if ( !key.contains(suffixDark) && SETTINGS.hasOwnProperty(keyDark) ) {
	   		LOG(key + " : " + SETTINGS[key]);
	   		
	   		var temp = SETTINGS[key];
			SETTINGS[key] = SETTINGS[keyDark];
			SETTINGS[keyDark] = temp;
		}
	}
};

LightDark.prototype.onToggle = function() {
	LOG("LightDark.onToggle()");

	if ( this.state === "LIGHT") {
		this.enableModeDark();
	} 
	else if ( this.state === "DARK" ) {
		this.enableModeLight();
	}

	SETTINGS.fadeAlpha = 1.0;
};