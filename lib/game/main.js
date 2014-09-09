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

		// enemyCounter
			//maximum number of zombies allowed on stage at once
	    max = 50;
			// hold is the interval at which enemies spawn in seconds. Example : if hold = 5, an enemy will try to spawn every 5 seconds.
		hold = 5;

		
		// an array to hold each instance of enemy
		enemies = [];


		// make enemies global
		ig.game.enemies = enemies;

		// Key bindings
		ig.input.bind( ig.KEY.LEFT_ARROW, 'rotateLeft' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'rotateRight' );
		ig.input.bind( ig.KEY.UP_ARROW, 'forward' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'backward' );
		ig.input.bind( ig.KEY.A, 'rotateLeft' );
		ig.input.bind( ig.KEY.D, 'rotateRight' );
		ig.input.bind( ig.KEY.W, 'forward' );
		ig.input.bind( ig.KEY.S, 'backward' );

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
		

		if (ig.game.player.spawn) {
			// spawn enemies
			if( enemyTimer > hold & current < max ) {
				hold += 5;


				// insert a new instance of enemy into the enemies array
				enemies.push(ig.game.spawnEntity( EntityEnemy, 900, 256, {name: enemies.length} ));
				//console.log(enemies[current]);
				console.log('current enemies: ' + current);

				current += 1;

			}
		}
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if(ig.gui.show) ig.gui.draw();
		
		// Add your own drawing code here
		// var player = this.getEntitiesByType(EntityPlayer)[0];
		// var x = ig.system.width/2,
		// 	y = ig.system.height/2;

		// this.font.draw( 'Angle: ' + player.angle, x, y-20, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 960x512, scaled
// to a factor of 1
ig.main( '#canvas', MyGame, 60, 960, 512, 1 );

});
