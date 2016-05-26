import device;
import src.entities.Bullet as Bullet;
import src.entities.EnemyRed as EnemyRed;
import src.entities.EnemyBlue as EnemyBlue;

exports = {

    // Base game dimension
    width: 576,
    height: 1024,

    // Set maximum delta time value
    max_delta: 100,

    // Player settings
    player_start_position_offset: 40,
    player_ship: 'resources/images/ship.png',
    player_speed: 500,

    // Parallax background
    background: {
        image: 'resources/images/bg.png',
        width: 256,
        height: 256,
        speed: 0.1,
        zIndex: 1,
        // Warn! Supported onlu Y direction
        direction: {
            x: 0,
            y: 1
        }
    },

    // Parallax items
    env_items: {
        objects: [
            'resources/images/object_1.png',
            'resources/images/object_2.png',
            'resources/images/object_3.png'
        ],
        stars: ['resources/images/star.png'],
        generateObjectEvery: 2000, // Ticks
        generateStarEvery: 400, // Ticks
        zIndex: 2,
        speed: 0.2,
        // Warn! Supported onlu Y direction
        direction: {
            x: 0,
            y: 1
        }
    },

    score: {
        horizontalAlign: 'left',
        verticalAlign: 'top',
        x: 15,
        y: 10,
        layout: 'box',
        color: 'white',
        zIndex: 10,
        fontFamily: 'kenvector_future',
        text: "000000",
        size: 25,
        wrap: true
    },

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

        'red1': {
            name: 'red1',
            ctor: EnemyRed,
            initCount: 20,
            image: 'resources/images/enemy_red.png',
            speed: 0.4,
            width: 75,
            height: 57,
            amplitude: 100,
            func: Math.sin
        },

        'red2': {
            name: 'red2',
            ctor: EnemyRed,
            initCount: 20,
            image: 'resources/images/enemy_red.png',
            speed: 0.4,
            width: 75,
            height: 57,
            amplitude: 100,
            func: Math.cos
        },

        'blue': {
            name: 'blue',
            ctor: EnemyBlue,
            initCount: 20,
            image: 'resources/images/enemy_blue.png',
            speed: 0.5,
            width: 75,
            height: 57
        }

    },

    // Levels section
    level_1: [
        {
            delay: 2000,
            formation: "chain",
            count: 7,
            enemies: ['red1'],
            position: 'center'
        },
        {
            delay: 2000,
            formation: "chain",
            count: 7,
            enemies: ['red2'],
            position: 'center'
		},

        {
            delay: 0,
            formation: "chain",
            count: 7,
            enemies: ['red1'],
            position: 'center'
		},

        {
            delay: 0,
            formation: "chain",
            count: 7,
            enemies: ['red2'],
            position: 'center'
		},

        {
            delay: 2000,
            formation: "chain",
            count: 7,
            enemies: ['blue'],
            position: 'right'
		},

        {
            delay: 200,
            formation: "chain",
            count: 7,
            enemies: ['red1'],
            position: 'center'
		},

        {
            delay: 1000,
            formation: "chain",
            count: 7,
            enemies: ['red2'],
            position: 'center'
		},

        {
            delay: 2000,
            formation: "chain",
            count: 9,
            enemies: ['blue'],
            position: 'left'
		},

        {
            delay: 0,
            formation: "chain",
            count: 7,
            enemies: ['red1'],
            position: 'center'
		},

        {
            delay: 0,
            formation: "chain",
            count: 7,
            enemies: ['red1'],
            position: 'center'
		},

        {
            delay: 2000,
            formation: "chain",
            count: 4,
            enemies: ['blue'],
            position: 'center'
		},

        {
            delay: 0,
            formation: "chain",
            count: 7,
            enemies: ['red2'],
            position: 'center'
		},

        {
            delay: 2000,
            formation: "chain",
            count: 3,
            enemies: ['blue'],
            position: 'left'
		},

        {
            delay: 0,
            formation: "chain",
            count: 7,
            enemies: ['red1'],
            position: 'center'
		},

        {
            delay: 2000,
            formation: "chain",
            count: 7,
            enemies: ['blue'],
            position: 'right'
		}

	]

};
