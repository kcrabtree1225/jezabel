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
	'game.entities.enemy'

)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	
	
	init: function() {
		
		this.loadLevel(LevelOne);
		
		// instantiate timer
		timer = new ig.Timer();
		timer.set( 0 );

		// enemyCounter
		max = 60
		hold = 0
		enemies = [];
		// Add key bindings
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.SPACE_BAR, 'shoot' );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		// get time 
		enemyTimer = timer.delta();
		
		// get the current number of enemies on stage
		current = ig.game.getEntitiesByType(EntityEnemy).length;
		// console.log(ig.game.player.pos);
		// spawn enemies
		if( enemyTimer > hold & current < max ) {
			hold += 5;
			ig.game.spawnEntity( EntityEnemy, 900, 256, {flip:this.flip} );
		}
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 964, 512, 1 );

});
