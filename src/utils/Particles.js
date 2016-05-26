import event.Emitter as Emitter;
import ui.ParticleEngine as ParticleEngine;
import src.utils.Random as Random;

exports = Class(Emitter, function(supr) {

    /**
     * Init
     */
    this.init = function(superview) {

        supr(this, 'init', []);

        this.engine = new ParticleEngine({
            superview: superview,
            width: 43,
            height: 43,
            initCount: 300,
            zIndex: 7,
            centerAnchor: true
        });
    };

    /**
     * Make particle explosion in position
     */
    this.makeBang = function(position, size) {

        size = size || 50;
        var particles = 20;

        var particleObjects = this.engine.obtainParticleArray(particles);

        for (var i = 0; i < particles; i++) {
            var pObj = particleObjects[i];

            // Init base particle
            pObj.polar = true;

            pObj.x = position.x - size / 2; // Fix particle engine bug
            pObj.y = position.y + size / 2; // Fix particle engine bug

            pObj.ox = position.x - size / 2;
            pObj.oy = position.y + size / 2;

            pObj.anchorX = size / 2;
            pObj.anchorY = size / 2;
            pObj.width = size;
            pObj.height = size;

            // Last 2 particle
            if (i > particles - 3) {
                this.finalRing(pObj, size);
            } else if (i < 10) {
                this.spawnParticle(pObj, size);
            } else {
                this.spawnSparkles(pObj, size);
            }
        }

        this.engine.emitParticles(particleObjects);
    };

    /**
     * Explosion rings
     */
    this.finalRing = function(pObj, size) {
        pObj.image = 'resources/images/bang/explosion_circle_' + Random.integer(1, 3) + '.png';
        pObj.width = size;
        pObj.height = size;

        pObj.ttl = 2000;

        pObj.dscale = Random.float(1.1, 1.4);
        pObj.dy = 30;
        pObj.dopacity = -1;
        pObj.dopacity = -0.5;
        pObj.transition = "easeOut";
    }

    /**
     * Explosion particles
     */
    this.spawnParticle = function(pObj, size) {
        pObj.image = 'resources/images/bang/explosion_particle_' + Random.integer(1, 5) + '.png';
        pObj.width = size;
        pObj.height = size;

        pObj.ttl = 2000;

        pObj.dscale = 1.1;
        pObj.ddscale = 0.3;

        pObj.ox += Random.integer(-20, 20);
        pObj.oy += Random.integer(-20, 20);

        pObj.dy = Random.integer(-40, 40);
        pObj.dx = Random.integer(-40, 40);

        pObj.dopacity = -0.7;
    }

    /**
     * Explosion sparks
     */
    this.spawnSparkles = function(pObj, size) {

        pObj.image = 'resources/images/bang/explosion_spark_' + Random.integer(1, 5) + '.png';

        pObj.width = Random.integer(5, 15);
        pObj.height = pObj.width;

        pObj.ttl = 4000;

        pObj.dy = Random.integer(-100, 100);
        pObj.dx = Random.integer(-100, 100);

        pObj.dopacity = Random.float(-0.3, -0.8);
    }

    /**
     * Particle engine tick
     */
    this.update = function(dt) {
        this.engine.runTick(dt * 2.5);
    }

});
