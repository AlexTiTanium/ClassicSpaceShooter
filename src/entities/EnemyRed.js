import src.entities.Enemy as Enemy;
import src.utils.Random as Random;

exports = Class(Enemy, function(supr) {

    this.prevX = 0;
    this.amplitude = 100;
    this.func = Math.sin;

    /**
     * Define enemy specific functions
     */
    this.setOptions = function(options) {
        this.amplitude = options.amplitude;
        this.func = options.func;
    };

    /**
     * Move enemy
     **/
    this.update = function(dt) {

        var amplitude = this.amplitude;

        this.style.y += dt * this.speed * this.direction.y;
        this.style.x = this.func(this.style.y / 100) * amplitude + this.startPosition.x;
        this.style.r = Math.atan2(dt * this.speed * this.direction.y, this.style.x - this.prevX) + Math.PI / 2;
        this.prevX = this.style.x;

        // Detect if enemy is out of view
        if (this.style.x + this.style.width > GC.app.baseWidth ||
            this.style.y - this.style.height > GC.app.baseHeight) {

            this.release();
        }

    };


});
