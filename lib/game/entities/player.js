ig.module(
 'game.entities.player'
)
.requires(
 'impact.entity'
)
.defines(function(){
EntityPlayer = ig.Entity.extend({
	animSheet: new ig.AnimationSheet( 'media/player.png', 32, 32 ),

	//Collision Settings
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,

	//actual size of the player
	size: {x: 32, y:32},
	//account for whitespace (amount to trim off the top and sides)
	offset: {x: 4, y: 2},
	flip: false,
	maxVel: {x: 100, y: 100},
	friction: {x: 1800, y:1800},
	accelGround: 1000,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			// Add the animations

			this.addAnim( 'up', 1, [0] );
			this.addAnim( 'down', 180, [0] );
			this.addAnim( 'left', 270, [0] );
			this.addAnim( 'right', 90, [0] );

			// Set id
			this.id = 'player';
			this.name = 'player';

			this.addAnim( 'move', 1, [0] );
			// this.addAnim( 'down', 180, [0] );
			// this.addAnim( 'left', 270, [0] );
			// this.addAnim( 'right', 90, [0] );

		},

		update: function() {

			
			// move left or right
			var accel = 100;
			if( ig.input.state('left') ) {
				this.accel.x = -accel;
				
				
				
			}else if( ig.input.state('right') ) {
				this.accel.x = accel;
				// this.flip = false;
				// this.currentAnim = this.anims.right;
				
				
			}else if( ig.input.state('up') ) {
				this.accel.y = -accel;
				// this.flip = false;
				// this.currentAnim = this.anims.up;
				
			}else if( ig.input.state('down') ) {
				this.accel.y = accel
				// this.flip = false;
				// this.currentAnim = this.anims.down;
				
			}else{
				this.accel.x = 0;
				this.accel.y = 0;
			}

			// if( this.vel.x != 0 || this.vel.y !=0 ) {

			// this.currentAnim = this.anims.run;

			// }else{
			
			// this.currentAnim = this.anims.idle;

			// }

			// move!
			this.currentAnim.flip.x = this.flip;
			this.parent();
		},
	});
});