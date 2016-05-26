import src.utils.Random as Random;
import src.utils.EntitiesPool as EntitiesPool;
import src.Config as Config;

exports = Class(function() {

    /**
     * Init
     */
    this.init = function(level, superview) {

        this.superview = superview;
        this.level = level;

        this.width = superview.style.width;
        this.height = superview.style.height;

        this.spawnIndex = 0;
        this.spawnDelta = this.getCurrentDelay();
        this.roundSpeed = 1;

        this.enemiesPool = new EntitiesPool(Config.enemies, superview);
    };


    this.getCurrentSpawn = function() {

        var spawn = this.level[this.spawnIndex];

        if (!spawn) {
            this.spawnIndex = 0;
            this.roundSpeed += 0.1;
            return this.level[this.spawnIndex];
        }

        return spawn;
    };

    /**
     * How many ticks curent spawn will active
     */
    this.getCurrentDelay = function() {
        return this.getCurrentSpawn().delay || 500;
    };

    /**
     * Get all active enemies
     */
    this.getAllEnemies = function() {
        return this.enemiesPool.items;
    };

    /**
     * Reset state
     */
    this.reset = function() {
        this.spawnIndex = 0;
        this.spawnDelta = 0;
        this.roundSpeed = 1;
        this.enemiesPool.reset();
    };

    /**
     * Spawn enemy formation
     */
    this.spawn = function() {

        this.spawnDelta = 0;
        this.spawnIndex += 1;

        var spawn = this.getCurrentSpawn();
        this.formations(spawn.formation, spawn);
    };

    /**
     * Get enamy inforamtion
     */
    this.getEnemy = function(variants) {
        var name = Random.choose(variants);
        return Config.enemies[name];
    };

    /**
     * Move enemy and check delays
     */
    this.update = function(dt) {

        dt = dt * Math.min(2, this.roundSpeed);

        this.enemiesPool.update(dt);

        if (this.superview.player.isDead) return;

        if (this.spawnDelta >= this.getCurrentDelay()) {
            this.spawn();
        }
        this.spawnDelta += dt;
    };

    /**
     * Enemy follow each other
     */
    this.formations = function(type, spawn) {

        switch (type) {

            /**
             * Enemy follow each other
             */
            case 'chain':
                for (var i = 0; i < spawn.count; i++) {

                    var enemy = this.getEnemy(spawn.enemies);
                    var position = this.positions(spawn.position, enemy);

                    position.y = (enemy.height + 15) * -i;

                    this.enemiesPool.spawn(enemy.name, position);
                }
                break;
        }
    };

    /**
     * Supported formations types
     */
    this.positions = function(type, enemy) {

        switch (type) {

            case 'center':
                return {
                    x: this.width / 2,
                    y: 0
                };
                break;

            case 'left':
                return {
                    x: enemy.width,
                    y: 0
                };
                break;
            case 'right':
                return {
                    x: this.width - enemy.width,
                    y: 0
                };
                break;
        }
    };

});
