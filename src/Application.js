import device;
import AudioManager;
import ui.StackView as StackView;

import ui.resource.loader as loader;
import src.views.World as WorldView;
import src.views.UserInput as Input;
import src.views.Loading as Loading;
import src.Config as Config;

import ui.TextView as TextView;

exports = Class(GC.Application, function() {

	/**
	 * init
	 */
	this.initUI = function() {

		this.setScale(Config.width, Config.height);

		this.audio = new AudioManager({
			path: 'resources/sounds',
			files: Config.sound
		});

		this.input = new Input({
			superview: this.view
		});

		this.stack = new StackView({
			superview: this,
			width: GC.app.baseWidth,
			height: GC.app.baseHeight,
			clip: true
		});

		this.world = new WorldView({});
		this.loading = new Loading({});

		this.stack.push(this.loading);

		loader.preload(['resources/images', 'resources/sounds'], this.onAssetsReady.bind(this));
	};

	/**
	 * Fire when assets is ready
	 */
	this.onAssetsReady = function() {
		this.audio.play('gameplay');
		this.stack.push(this.world);
		this.world.run();
	};

	/**
	 * Scale app view
	 */
	this.setScale = function(width, height) {
		this.baseWidth = width;
		this.baseHeight = device.height * (width / device.width);
		this.scale = device.width / this.baseWidth;
		this.view.style.scale = this.scale;
	};

	/**
	 *
	 */
	this.launchUI = function() {
		//this.audio.play('gameplay');
	};
});
