import ui.View;
import src.views.ParallaxView as ParallaxView;
import ui.ViewPool as ViewPool;
import src.utils.Random as Random;

exports = Class(function() {

    /**
     * Init parallax bg scroll
     */
    this.init = function(config, superview) {

        this.superview = superview;

        this.width = superview.style.width;
        this.height = superview.style.height;

        this.items = [];
        this.delataItemsTicks = 0;
        this.delataStarTicks = 0;

        this.pool = new ViewPool({
            ctor: ParallaxView,
            initCount: 300,
            superview: this.superview,
            initOpts: merge(config, {
                superview: this.superview
            })
        });

        this.config = config;

        this.build();
    };

    /**
     * Place some items before level will start
     */
    this.build = function() {

        for (var i = 0; i < 4; i++) {
            this.addOneItem('objects', Random.integer(0, this.height));
        }

        for (var i = 0; i < 20; i++) {
            this.addOneItem('stars', Random.integer(0, this.height));
        }
    };

    /**
     * Create one item
     */
    this.addOneItem = function(type, y) {

        var item = this.pool.obtainView();

        var width = type == 'stars' ? 2 : Random.integer(20, 100);
        var height = width;

        item.updateOpts({
            image: Random.choose(this.config[type]),
            width: width,
            height: height,
            opacity: Random.float(0.3, 0.7),
            x: Random.integer(0, this.width),
            y: y ? y : -height
        });

        item.speed = this.config.speed;
        item.direction = this.config.direction;

        this.items.push(item);
    };

    /**
     * Move objects
     */
    this.update = function(dt) {

        if (this.delataItemsTicks > this.config.generateObjectEvery) {
            this.addOneItem('objects');
            this.delataItemsTicks = 0;
        }

        if (this.delataStarTicks > this.config.generateStarEvery) {
            this.addOneItem('stars');
            this.delataStarTicks = 0;
        }

        this.delataItemsTicks += dt;
        this.delataStarTicks += dt;

        for (var i = this.items.length; i--;) {
            var item = this.items[i];

            item.update(dt);

            if (item.style.y - item.style.height > GC.app.baseHeight) {
                this.pool.releaseView(item);
                this.items.splice(i, 1);
            }
        }

    };

});
