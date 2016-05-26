import src.entities.Enemy as Enemy;
import src.utils.Random as Random;

exports = Class(Enemy, function(supr) {

    /**
     * Define enemy specific functions
     */
    this.setOptions = function(options) {

    };

    /**
     * Move enemy
     **/
    this.update = function(dt) {

        this.style.x += dt * this.speed * this.direction.x;
        this.style.y += dt * this.speed * this.direction.y;

        // Detect if enemy is out of view
        if (this.style.x + this.style.width > GC.app.baseWidth ||
            this.style.y - this.style.height > GC.app.baseHeight) {

            this.release();
        }

    };


});
