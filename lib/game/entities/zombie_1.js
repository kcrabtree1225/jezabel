ig.module(
 'game.entities.zombie_1'
)
.requires(
 'impact.entity'
)
.defines(function(){
EntityPlayer = ig.Entity.extend({
	animSheet: new ig.AnimationSheet( 'media/zombie_1.png', 16, 16 ),
	size: {x: 8, y:14},
	offset: {x: 4, y: 2},
	flip: false,
	maxVel: {x: 100, y: 150},
	friction: {x: 600, y: 0},
	accelGround: 400,
	accelAir: 200,
	jump: 200,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
			this.addAnim( 'jump', 1, [9] );
			this.addAnim( 'fall', 0.4, [6,7] );
		},

		update: function() {
			// move left or right
			var accel = 50;
			if( ig.input.state('left') ) {
				this.accel.x = -accel;
				this.flip = true;
			}else if( ig.input.state('right') ) {
				this.accel.x = accel;
				this.flip = false;
				
			}else if( ig.input.state('up') ) {
				this.accel.y = -accel;
				this.flip = false;
			}else if( ig.input.state('down') ) {
				this.accel.y = accel
				this.flip = false;
			}else{
				this.accel.x = 0;
				this.accel.y = 0;
			}

			if( this.vel.x != 0 || this.vel.y !=0 ) {

			this.currentAnim = this.anims.run;

			}else{
			
			this.currentAnim = this.anims.idle;

			}

			// move!
			this.currentAnim.flip.x = this.flip;
			this.parent();
		},
	});
});