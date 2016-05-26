import ui.View;
import src.views.ParallaxView as ParallaxView;
import ui.ViewPool as ViewPool;

exports = Class(function() {

	/**
	 * Init parallax bg scroll
	 */
	this.init = function(config, superview) {

		this.superview = superview;

		this.width = superview.style.width;
		this.height = superview.style.height;

		this.tiles = [];

		this.pool = new ViewPool({
			ctor: ParallaxView,
			initCount: 21,
			superview: this.superview,
			initOpts: merge(config, {
				superview: this.superview
			})
		});

		this.build(config);
	};

	/**
	 * Build parallax background
	 */
	this.build = function(config) {

		var width = config.width;
		var height = config.height;

		var wCount = Math.ceil(this.width / width);
		var hCount = Math.ceil(this.height / height) + 1; // Add one more tile on top

		for (var i = 0; i < wCount; i++) {
			for (var j = -1; j < hCount; j++) {
				this.addTile(i * width, j * height, config);
			}
		}
	};

	/**
	 * Create one tile
	 */
	this.addTile = function(x, y, opts) {

		var tile = this.pool.obtainView();

		tile.updateOpts({
			x: x,
			y: y
		});

		tile.speed = opts.speed;
		tile.direction = opts.direction;

		this.tiles.push(tile);
	};

	/**
	 * Move tile up
	 */
	this.tileMoveUp = function(tile) {

		var tile = this.pool.obtainView();
		var hCount = Math.ceil(this.height / tile.style.height) + 1;

		tile.updateOpts({
			y: (tile.style.y - hCount * tile.style.height) - tile.style.height
		});
	}

	/**
	 * Move tiles
	 */
	this.update = function(dt) {

		for (var i = 0; i < this.tiles.length; i++) {
			var tile = this.tiles[i];

			tile.update(dt);

			if (tile.style.y - tile.style.width > this.height) {
				this.pool.releaseView(tile);
				this.tileMoveUp(tile);
			}
		}

	};

});
