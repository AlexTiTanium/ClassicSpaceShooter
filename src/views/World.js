import ui.View;
import math.util as util;
import src.Config as Config;
import src.entities.Player as Player;
import src.utils.EntitiesPool as EntitiesPool;
import src.utils.CollisionDetector as CollisionDetector;
import src.utils.Particles as Particles;

exports = Class(ui.View, function(supr) {

	this.pause = true;

	this.tag = "World";
	this.fixedTickDelta = 0;
	this.fixedTick = 30; // 30 ticks per second
	this.currentWave = 1;
	this.spawnIndex = 1;

	/**
	 * init
	 */
	this.init = function(opts) {

		opts = merge(opts, {
			width: GC.app.baseWidth,
			height: GC.app.baseHeight
		});

		supr(this, 'init', [opts]);

		this.build();
	};

	/**
	 * Prepare game view
	 */
	this.build = function() {

		// Create and add player spaceship to the game view
		this.player = new Player({
			superview: this
		});

		this.bulletPool = new EntitiesPool(Config.bullets, this);
		this.enemiesPool = new EntitiesPool(Config.enemies, this);

		this.particles = new Particles(this);
	};

	/**
	 * Start spawn enemies
	 */
	this.run = function() {
		this.pause = false;
		this.spawnWaves(0, 0);
	};

	/**
	 * Game loop, ~60 ticks per second
	 */
	this.tick = function(dt) {

		if (this.pause) return;

		this.player.update(dt);
		this.bulletPool.update(dt);
		this.enemiesPool.update(dt);

		this.particles.update(dt);

		if (this.fixedTickDelta >= this.fixedTick) {
			this.fixedTickDelta = 0;
			this.fixedUpdate();
		}

		this.fixedTickDelta += dt;
	};

	/**
	 * Fixed update tick, ~30 ticks per second
	 */
	this.fixedUpdate = function() {

		// Check if something from enemiesPool colide with items from bulletPool
		// If collision detected  CollisionDetector will call onCollision calbeack for enemiesPool item
		CollisionDetector.check(this.enemiesPool.items, this.bulletPool.items);
	};

	/**
	 *
	 */
	this.spawnWaves = function(delay, spawnIndex) {

		var current = Config.waves[this.currentWave];

		if (!current) {
			this.currentWave = 1;
			this.spawnWaves(1, 0);
			return; // There no other watves
		}

		var spawn = current.spawn[spawnIndex || 0]

		// Switch to next wayve
		if (!spawn) {
			this.currentWave++;
			var newWave = Config.waves[this.currentWave];
			var newWaveDelay = newWave ? newWave.delay : 0;
			return this.spawnWaves(newWaveDelay, 0);
		}

		setTimeout(function() {

			for (var i = 0; i < spawn.count; i++) {

				var randomEnemy = util.random(0, spawn.enemies.length);
				var randomPosition = util.random(100, 500);

				setTimeout(this.spawnEnemy.bind(this, spawn.enemies[randomEnemy], {
					x: randomPosition,
					y: 0
				}), util.random(2000, 4000));
			}

			return this.spawnWaves(spawn.delay, ++spawnIndex);

		}.bind(this), delay * 1000);
	};

	/**
	 * Shurtcut for spawn explosion particles
	 *
	 * @arg {Object<x,y>} position - start position
	 */
	this.makeBang = function(position) {
		this.particles.makeBang(position);
	};

	/**
	 * Shurtcut for bullet spawn
	 *
	 * @arg {String} type - See Config.bullets
	 * @arg {Object<x,y>} position - start position
	 * @arg {Vec2D} direction - Unit vector
	 */
	this.spawnBullet = function(type, position, direction) {
		this.bulletPool.spawn(type, position, {
			direction: direction
		});
	};

	/**
	 * Shurtcut for enemy spawn
	 *
	 * @arg {String} type - See Config
	 * @arg {Object<x,y>} position - start position
	 */
	this.spawnEnemy = function(type, position) {
		this.enemiesPool.spawn(type, position);
	};

});
