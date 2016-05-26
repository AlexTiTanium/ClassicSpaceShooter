import event.Emitter as Emitter;
import ui.ViewPool as ViewPool;
import src.Config as Config;

exports = Class(Emitter, function(supr) {

    this.items = null; // Store there active entities
    this.pools = null;
    this.superview = null;
    this.config = null;

    /**
     * Init
     */
    this.init = function(poolConfig, superview) {

        supr(this, 'init', []);

        this.superview = superview;
        this.config = poolConfig;

        this.items = []; // Avoid object copy issues
        this.pools = {}; // Avoid object copy issues

        Object.keys(poolConfig).forEach(function(entitieType) {
            this.pools[entitieType] = this.factory(entitieType, poolConfig[entitieType]);
        }, this);
    };

    /**
     * Make game pools from config
     **/
    this.factory = function(name, config) {
        return new ViewPool({
            ctor: config.ctor,
            initCount: config.initCount,
            superview: this.superview,
            initOpts: merge(config, {
                superview: this.superview
            })
        });
    };

    /**
     * Release all view
     */
    this.reset = function() {
        this.items = [];
        Object.keys(this.pools).forEach(function(entitieType) {
            this.pools[entitieType].releaseAllViews();
        }, this);
    };

    /**
     * Spawn new view from pool
     *
     * @arg {String} type
     * @arg {Object<x,y>} position - start position
     * @arg {Object} object options
     */
    this.spawn = function(type, position, options) {

        var entitie = this.pools[type].obtainView();

        entitie.type = type;

        entitie.remove = false; // If true will remove this on next iteration
        entitie.startPosition = position;
        entitie.create(position, merge(this.config[type], options || {}));

        this.items.push(entitie);
    };

    /**
     * Move and relese entitie
     */
    this.update = function(dt) {

        for (var i = this.items.length; i--;) {

            var entitie = this.items[i];

            // Relese removed objects
            if (entitie.remove) {
                this.pools[entitie.type].releaseView(entitie);
                this.items.splice(i, 1);
                continue;
            }

            // Move enemy
            entitie.update(dt);
        }
    };

});
