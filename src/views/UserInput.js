import ui.View as View;

exports = Class(View, function(supr) {

    this.name = "UserInputListener";

    /**
     * init
     */
    this.init = function(opts) {

        opts.blockEvents = false;

        opts = merge(opts, {
            x: 0,
            y: 0,
            superview: opts.superview,
            width: GC.app.baseWidth,
            height: GC.app.baseHeight,
            zIndex: 10
        });

        this.event_id = null;

        supr(this, 'init', [opts]);
    };

    /**
     * On mouse key down
     **/
    this.onInputStart = function(event, point) {
        if (this.event_id === null) {
            this.event_id = event.id;
            this.emit('position:update', point);
            this.emit('shoot:start');
        }
    }

    /**
     * On mouse move
     **/
    this.onInputMove = function(event, point) {
        if (this.event_id !== null && this.event_id == event.id) {
            this.emit('position:update', point);
        }
    }

    /**
     * On mouse key up
     **/
    this.onInputSelect = function(event, point) {
        if (this.event_id !== null && this.event_id == event.id) {
            this.emit('position:update', point);
            this.emit('shoot:stop');
            this.event_id = null;
        }
    }

});
