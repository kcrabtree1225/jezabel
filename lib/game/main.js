ig.module( 
	'game.main' 
)
.requires(
	// uncomment next line to enable debugging mode
	//'impact.debug.debug',
	'impact.game',
	'impact.font',
	'game.levels.one',
	'impact.timer',
	'game.entities.enemy',

	// plugins
	'plugins.gui'

)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),


	init: function() {
		
		// load level one
		this.loadLevel(LevelOne);

		
		// instantiate timer
		timer = new ig.Timer();
		timer.set( 0 );

		// enemy variables

			//enemy status
		zombieSpawning = 'OFF';

			//maximum number of zombies allowed on stage at once
	    max = 50;
	    
			// hold is the interval at which enemies spawn in seconds. Example : if hold = 5, an enemy will try to spawn every 5 seconds.
		hold = 2;
		
			// determines which gate the zombie will spawn from
		spawnGate = 3;

			// determines an enemies coordinates
		this.xPos = 0;
		this.yPos = 0;
		
			// an array to hold each instance of enemy
		enemies = [];


		// make enemies global
		ig.game.enemies = enemies;

		// Key bindings
		ig.input.bind( ig.KEY.LEFT_ARROW, 'strafeLeft' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'strafeRight' );
		ig.input.bind( ig.KEY.UP_ARROW, 'forward' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'backward' );
		ig.input.bind( ig.KEY.A, 'strafeLeft' );
		ig.input.bind( ig.KEY.D, 'strafeRight' );
		ig.input.bind( ig.KEY.W, 'forward' );
		ig.input.bind( ig.KEY.S, 'backward' );
		ig.input.bind( ig.KEY.SHIFT, 'run');
		ig.input.bind( ig.KEY.TAB, 'switchWeapon');

		// Bindings we need to eventually remove
		ig.input.bind( ig.KEY.T, 'toggleZombies' );
	},
	
	update: function() {

		// Update all entities and backgroundMaps
		this.parent();

		// get time since last enemy spawn
		enemyTimer = timer.delta();
		
		// get the current number of enemies on stage
		current = ig.game.getEntitiesByType(EntityEnemy).length;
		
		// update the display
		document.getElementById("zombieCount").innerHTML = current;
		document.getElementById('zombieSpawn').innerHTML = zombieSpawning;

		if (ig.game.player.spawn) {
			// spawn enemies
			if( enemyTimer > hold & current < max ) {
				
				// insert a new instance of enemy into the enemies array
				// enemies.push(ig.game.spawnEntity( EntityEnemy, 900, 256, {name: enemies.length} ));
				this.spawnEnemy();
				hold += 5;

			}
		}
	
	},
	
	draw: function() {

		// Draw all entities and backgroundMaps
		this.parent();

		if(ig.gui.show) ig.gui.draw();
		
	},

	spawnEnemy: function() {

		// picks a random number
		// setup Math.floor(Math.random() * (varMax - varMin)) + varMin;
		spawnGate = Math.floor(Math.random() * (4 - -1)) + -1;
		// 1 = left entrance
		// 2 = bottom entrance
		// 3 = right entrance 
		// 4 = top entrance

		// go get coordinates to place the enemy at based on the spawn location obtained from spawnGate
		this.getCoords();

		// spawn an enemy and push it into the enemies array
		enemies.push(ig.game.spawnEntity( EntityEnemy, this.xPos, this.yPos, {name: enemies.length, spawnGate: spawnGate} ));
		
	},

	getCoords: function() {

		// [x1, x2, y1, y2, xNegative?, yNegative?]
		mixer = [];
		

		switch (spawnGate) {
		    case 0:
		        mixer = [1,7,216,259,true,false];
		        break;
		    case 1:
		        mixer = [496,480,512,508,false,false];
		        break;
		    case 2:
		        mixer = [946,950,260,225,false,false];
		        break;
		    case 3:
		        mixer = [481,453,5,0,false,true];
		        break;
		}

		// Set very random coordinate within setGate

		this.xPos = Math.floor(Math.random() * ((mixer[0]+1) - mixer[1])) + mixer[1];
		this.yPos = Math.floor(Math.random() * ((mixer[2]+1) - mixer[3])) + mixer[3];

		this.xPos += (this.xPos/10000)*Math.floor(Math.random() * (51 - 0)) + 0;
		this.yPos += (this.yPos/10000)*Math.floor(Math.random() * (51 - 0)) + 0;

		mixer[4] === true ? this.xPos = -this.xPos : this.xPos = this.xPos ;
		mixer[5] === true ? this.yPos = -this.yPos : this.yPos = this.yPos ;

	}

});


// Start the Game with 60fps, a resolution of 960x512, scaled
// to a factor of 1
ig.main( '#canvas', MyGame, 60, 960, 512, 1 );

});
