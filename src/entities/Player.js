import ui.ImageView as ImageView;

import math.util as util;
import math.geom.Vec2D as Vec2D;
import ui.resource.Image as Image;
import src.Config as Config;
import src.utils.Random as Random;

var ship_image = new Image({
    url: Config.player_ship
});

exports = Class(ImageView, function(supr) {

    this.tag = "Player";

    this.isDead = false;

    // Player alwas shot to up
    this.shoot_direction = new Vec2D({
        x: 0,
        y: -1
    });

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
     * Init
     */
    this.init = function(opts) {

        opts = merge(opts, {
            image: ship_image,
            zIndex: 5,
            x: GC.app.baseWidth / 2 - ship_image.getWidth() / 2,
            y: GC.app.baseHeight - ship_image.getHeight() - Config.player_start_position_offset,
            width: ship_image.getWidth(),
            height: ship_image.getHeight()
        });

        supr(this, 'init', [opts]);

        this.startPosition = {
            x: opts.x,
            y: opts.y
        };

        // Player will move to this point
        this.target = new Vec2D({
            x: opts.x,
            y: opts.y
        });

        // Shooting
        this.shoot = false;
        this.shoot_interval = 200; // Iterval between shots
        this.shoot_delta = this.shoot_interval; // Make shot immediately

        // Listen user input
        GC.app.input.on('position:update', this.updateTargetPoint.bind(this));

        GC.app.input.on('shoot:start', function() {
            this.shoot = true;
        }.bind(this));

        GC.app.input.on('shoot:stop', function() {
            this.shoot = false;
        }.bind(this));
    };

    /**
     * Player Target position from user input
     **/
    this.updateTargetPoint = function(point) {
        this.target.x = point.x;
        this.target.y = point.y;
    };

    /**
     * Player movement and shooting
     **/
    this.update = function(dt) {

        if (this.isDead) return;
        if (!this.shoot) return;

        // Shooting
        this.shoot_delta = util.clip(this.shoot_delta + dt, 0, this.shoot_interval);
        if (this.shoot_delta >= this.shoot_interval) {
            this.makeOneShot();
            this.shoot_delta = 0;
        }

        // Movement
        if (this.target.x == this.style.x && this.target.y == this.style.y) return;

        var ship = new Vec2D({
            x: this.style.x + ship_image.getWidth() / 2,
            y: this.style.y + ship_image.getHeight() / 2
        });

        var vectorToTarget = this.target.minus(ship);
        var magnitude = vectorToTarget.getMagnitude();

        if (magnitude < 0.001) return;

        var speed = Math.min(Config.player_speed * (dt / 1000), magnitude);
        var normalized = vectorToTarget.getUnitVector();

        var x = speed * normalized.x;
        var y = speed * normalized.y;

        this.style.x = util.clip(this.style.x + x, 0, GC.app.baseWidth - ship_image.getWidth());
        this.style.y = util.clip(this.style.y + y, 0, GC.app.baseHeight - ship_image.getHeight());
    };

    /**
     * Reset player state
     */
    this.reset = function() {

        this.isDead = false;

        this.updateOpts({
            visible: true,
            x: this.startPosition.x,
            y: this.startPosition.y
        });
    };

    /**
     * Collision collback
     */
    this.onCollision = function(target) {

        if (this.isDead) return;

        this.isDead = true;

        this.updateOpts({
            visible: false
        });

        this.getSuperview().makeBang({
            x: this.style.x + this.style.width / 2,
            y: this.style.y + this.style.height / 2
        }, 100);

        GC.app.audio.play('explosion_player');

        this.getSuperview().gameOver();
    };

    /**
     * Make one shoot
     **/
    this.makeOneShot = function() {

        if (this.isDead) return;

        this.getSuperview().spawnBullet('blue', {
            x: this.style.x + ship_image.getWidth() / 2,
            y: this.style.y
        }, this.shoot_direction);

        GC.app.audio.play('laser_' + Random.integer(1, 2));
    };

});
