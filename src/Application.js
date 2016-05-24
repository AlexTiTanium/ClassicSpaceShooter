import device;
import ui.StackView as StackView;

import src.views.World as WorldView;
import src.views.UserInput as Input;
import src.Config as Config;

exports = Class(GC.Application, function() {

	/**
	 * init
	 */
	this.initUI = function() {

		this.setScale(Config.width, Config.height);

		this.input = new Input({
			superview: this
		});

		var rootView = new StackView({
			superview: this,
			clip: true
		});

		this.world = new WorldView({
			parent: rootView
		});

		rootView.push(this.world);
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
	this.launchUI = function() {};
});
