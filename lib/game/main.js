ig.module( 
	'game.main' 
)
.requires(
	// uncomment next line to enable debugging mode
	//'impact.debug.debug',
	'impact.game',
	'impact.font',
	'game.levels.one',

)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {

	this.loadLevel( LevelOne );

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

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
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
	
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
