import ui.SpriteView as SpriteView;
import ui.ImageView as ImageView;

exports = Class(SpriteView, function(supr) {

	// Discribe collision behaivoir
	this.physics = function() {
		return {
			type: 'rect',
			width: this.style.width,
			height: this.style.height,
			x: this.style.x,
			y: this.style.y
		};
	};

	/**
	 * Create bullet in world view, then start shot animation
	 */
	this.create = function(position, options) {

		this.updateOpts({
			defaultAnimation: 'shot',
			loop: false,
			frameRate: 40,
			visible: true,
			x: position.x - this.style.width / 2,
			y: position.y - this.style.height
		});

		this.speed = options.speed || 1;
		this.direction = options.direction;

		this.startAnimation('shot', {
			frame: 1, // Not from zero!
			callback: this.animationComplete.bind(this)
		});
	};

	/**
	 * When animation complete make it wisable on zero frame
	 */
	this.animationComplete = function() {
		if (this.remove) return;
		this.updateOpts({
			visible: true
		}); // Show first(zero) frame of animation
	};

	/**
	 * Release this object on next iteration
	 */
	this.release = function() {
		this.remove = true;
	};

	/**
	 * Move bullet
	 **/
	this.update = function(dt) {

		this.style.x += dt * this.speed * this.direction.x;
		this.style.y += dt * this.speed * this.direction.y;

	};

});
