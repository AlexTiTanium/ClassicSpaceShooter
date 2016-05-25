import ui.ImageView as ImageView;

exports = Class(ImageView, function(supr) {

	// Enemy movement direction
	this.direction = {
		x: 0,
		y: 1
	};

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
	 * Init enamy object
	 */
	this.create = function(position, options) {

		this.updateOpts({
			visible: true,
			x: position.x - this.style.width / 2,
			y: position.y - this.style.height
		});

		this.speed = options.speed || 1;
		this.pool = options.pool;
	};

	/**
	 * Collision collback
	 */
	this.onCollision = function(target) {

		this.release();
		target.release();

		this.getSuperview().makeBang({
			x: this.style.x + this.style.width / 2,
			y: this.style.y + this.style.height / 2
		});

		GC.app.audio.play('explosion_enemy');
	};

	/**
	 * Release this object on next iteration
	 */
	this.release = function() {
		this.remove = true;
	};

	/**
	 * Move enemy
	 **/
	this.update = function(dt) {

		this.style.x += dt * this.speed * this.direction.x;
		this.style.y += dt * this.speed * this.direction.y;

	};

});
