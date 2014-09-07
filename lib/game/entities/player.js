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
	// maxVel: {x: 300, y: 300},
	// friction: {x: 300, y:300},
	accelGround: 1000,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			// Add the animations
<<<<<<< HEAD
			this.addAnim( 'up', 1, [0] );
			this.addAnim( 'down', 180, [0] );
			this.addAnim( 'left', 270, [0] );
			this.addAnim( 'right', 90, [0] );

			// Set id
			this.id = 'player';
			this.name = 'player';

=======
			this.addAnim( 'move', 1, [0] );
			// this.addAnim( 'down', 180, [0] );
			// this.addAnim( 'left', 270, [0] );
			// this.addAnim( 'right', 90, [0] );
>>>>>>> 656e988e8497ceca9d3cde1260675d038ade2cc0
		},

		update: function() {

			var mx = ig.input.mouse.x + ig.game.screen.x;
			var my = ig.input.mouse.y + ig.game.screen.y;
			var mouseAngle =  Math.atan2(
			    my - (this.pos.y + this.size.y/2),
			    mx - (this.pos.x + this.size.x/2)
			);
			this.anims.move.angle = mouseAngle;
			// move left or right
			var accel = 5;
			if( ig.input.state('left') ) {
				// this.accel.x = -accel;
				this.flip = true;
				
				this.pos.x -= 2;
			}else if( ig.input.state('right') ) {
				// this.accel.x = accel;
				// this.flip = false;
				// this.currentAnim = this.anims.right;
				this.pos.x += 2;
				this.flip = true;
			}else if( ig.input.state('up') ) {
				// this.accel.y = -accel;
				// this.flip = false;
				// this.currentAnim = this.anims.up;
				this.pos.y -= 2;
			}else if( ig.input.state('down') ) {
				// this.accel.y = accel
				// this.flip = false;
				// this.currentAnim = this.anims.down;
				this.pos.y += 2;
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