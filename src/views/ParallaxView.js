import ui.ImageView as ImageView;

exports = Class(ImageView, function(supr) {

    this.update = function(dt) {
        this.style.x += dt * this.speed * this.direction.x;
        this.style.y += dt * this.speed * this.direction.y;
    };

});
