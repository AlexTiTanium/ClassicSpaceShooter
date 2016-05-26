import math.geom.intersect as intersect;
import math.geom.Rect as Rect;

exports = {

    check: function(targetItems, items) {

        for (var i = 0; i < targetItems.length; i++) {

            var targetItem = targetItems[i];

            // Object without collsiion description or don't listen onCollision
            if (!targetItem || !targetItem.physics || !targetItem.onCollision) continue;

            var targetPhysics = targetItem.physics();

            for (var j = 0; j < items.length; j++) {
                var item = items[j];

                // Object without collsiion description
                if (!item || !item.physics) continue;

                var itemPhysics = item.physics();

                // Detect what type of collision we will check
                var collisionType = targetPhysics.type + 'VS' + itemPhysics.type;

                // Check rect vs rect colision
                if (collisionType == 'rectVSrect' && this.rectVSrect(targetPhysics, itemPhysics)) {
                    targetItem.onCollision(item);
                    continue;
                }

                // TODO: Implement other types
            }
        }
    },

    rectVSrect: function(rect1, rect2) {

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            return true;
        }

        return false;
    }

};
