import ui.View as View;

import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import ui.ScoreView as ScoreView;

import math.util as util;
import src.Config as Config;

import src.entities.Player as Player;

import src.utils.EntitiesPool as EntitiesPool;
import src.utils.CollisionDetector as CollisionDetector;
import src.utils.Particles as Particles;
import src.utils.EnemyManager as EnemyManager;

import src.views.ParallaxBackgroundScroll as ParallaxBackgroundScroll;
import src.views.ParallaxItemsScroll as ParallaxItemsScroll;


exports = Class(View, function(supr) {

    this.pause = true;

    this.tag = "World";
    this.fixedTickDelta = 0;
    this.fixedTick = 30; // 30 ticks per second
    this.score = 0;

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
        this.enemyManager = new EnemyManager(Config.level_1, this);

        this.particles = new Particles(this);

        this.parallaxBg = new ParallaxBackgroundScroll(Config.background, this);
        this.parallaxItems = new ParallaxItemsScroll(Config.env_items, this);

        this.scoreView = new TextView(merge(Config.score, {
            superview: this,
        }));
    };

    /**
     * Start spawn enemies
     */
    this.run = function() {
        this.pause = false;
    };

    /**
     * Game loop, ~60 ticks per second
     */
    this.tick = function(dt) {

        if (this.pause) return;

        dt = Math.min(dt, Config.max_delta);

        this.player.update(dt);
        this.bulletPool.update(dt);
        this.enemyManager.update(dt);

        this.particles.update(dt);

        this.parallaxBg.update(dt);
        this.parallaxItems.update(dt);

        if (this.fixedTickDelta >= this.fixedTick) {
            this.fixedTickDelta = 0;
            this.fixedUpdate();
        }

        this.fixedTickDelta += dt;
    };

    /**
     * Restart game
     */
    this.reset = function() {

        this.removeSubview(this.gameoverText);
        GC.app.view.removeSubview(this.resetBtn);

        this.score = 0;
        this.updateScoreView();

        this.enemyManager.reset();
        this.bulletPool.reset();

        this.player.reset();
    };

    /**
     * Show game over
     */
    this.gameOver = function() {

        this.gameoverText = new TextView({
            superview: this,
            layout: 'box',
            color: 'white',
            zIndex: 10,
            fontFamily: 'kenvector_future',
            text: "GAME OVER",
            size: 50,
            wrap: true
        });

        this.resetBtn = new ButtonView({
            superview: GC.app.view, // By some reason it's not works with world view
            width: 128,
            height: 128,
            zIndex: 10,
            x: GC.app.baseWidth / 2 - 128 / 2,
            y: GC.app.baseHeight / 2 - 128 / 2 + 200,
            images: {
                down: "resources/images/ui/restart.png",
                up: "resources/images/ui/restart.png"
            },
            on: {
                up: this.reset.bind(this)
            }
        });
    };

    /**
     * Fixed update tick, ~30 ticks per second
     */
    this.fixedUpdate = function() {

        // Check if something from enemiesPool colide with items from bulletPool
        // If collision detected  CollisionDetector will call onCollision calbeack for enemiesPool item
        CollisionDetector.check(this.enemyManager.getAllEnemies(), this.bulletPool.items);
        CollisionDetector.check([this.player], this.enemyManager.getAllEnemies());
    };

    /**
     * Update score view
     */
    this.addScore = function(amount) {
        this.score += amount;
        this.updateScoreView();
    };

    /**
     * Update score view
     */
    this.updateScoreView = function() {

        var str = "" + this.score;
        var pad = "000000"
        var ans = pad.substring(0, pad.length - str.length) + str

        this.scoreView.setText(ans);
    };

    /**
     * Shurtcut for spawn explosion particles
     *
     * @arg {Object<x,y>} position - start position
     */
    this.makeBang = function(position, size) {
        this.particles.makeBang(position, size);
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

});
