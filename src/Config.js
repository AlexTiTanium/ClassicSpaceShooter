import device;
import src.entities.Bullet as Bullet;
import src.entities.EnemyRed as EnemyRed;

exports = {

	// Base game dimension
	width: 576,
	height: 1024,

	// Player settings
	player_start_position_offset: 40,
	player_ship: 'resources/images/ship.png',
	player_speed: 500,

	// Sound section
	sound: {
		gameplay: {
			path: 'music',
			volume: 0.3,
			loop: true,
			background: true
		},
		laser_1: {
			path: 'effect',
			volume: 0.1
		},
		laser_2: {
			path: 'effect',
			volume: 0.1
		},
		explosion_enemy: {
			path: 'effect',
			volume: 0.2
		},
		explosion_player: {
			path: 'effect',
			volume: 0.5
		}
	},

	// Bullets settings
	bullets: {

		'blue': {
			ctor: Bullet,
			initCount: 50,
			width: 20,
			height: 64,
			speed: 0.8,
			sheetData: {
				url: 'resources/images/blue_bullet.png',
				anims: {
					shot: [[2, 0], [0, 0], [1, 0], [2, 0]]
				}
			}
		},

		'red': {
			ctor: Bullet,
			initCount: 50,
			width: 20,
			height: 64,
			speed: 0.5,
			sheetData: {
				url: 'resources/images/red_bullet.png',
				anims: {
					shot: [[2, 0], [0, 0], [1, 0], [2, 0]]
				}
			}
		}
	},

	// Enemy types section
	enemies: {

		'red': {
			ctor: EnemyRed,
			initCount: 10,
			image: 'resources/images/enemy_red.png',
			speed: 0.1,
			width: 75,
			height: 57
		}
	},

	// Waves section
	waves: {
		1: {
			delay: 2, // delay before spawn firs part
			spawn: [{
				enemies: ['red'],
				count: 1,
				delay: 2
			}, {
				enemies: ['red'],
				count: 1,
				delay: 1
			}]
		},

		2: {
			delay: 2, // delay before spawn firs part
			spawn: [{
				enemies: ['red'],
				count: 1,
				delay: 4
			}, {
				enemies: ['red'],
				count: 1,
				delay: 1
			}]
		},

		3: {
			delay: 2, // delay before spawn firs part
			spawn: [{
				enemies: ['red'],
				count: 1,
				delay: 4
            }, {
				enemies: ['red'],
				count: 1,
				delay: 1
            }]
		},

	}
};
