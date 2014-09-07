ig.module(
 'game.entities.enemy'
)
.requires(
 'impact.entity'
)
.defines(function(){
EntityEnemy = ig.Entity.extend({
	animSheet: new ig.AnimationSheet( 'media/zombie_1.png', 32, 32 ),
	// Collision settings
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	//actual size of the player
	size: {x: 32, y:32},
	
	//account for whitespace (amount to trim off the top and sides)
	offset: {x: 4, y: 2},
	flip: false,

	accelGround: 1000,
		speed: 2,
		init: function( x, y, settings ) {

			this.parent( x, y, settings );

			// Add the animations

			this.addAnim( 'idle', 180, [0] );


			

			// Set speed
			// console.log(this.distanceTo(this.parent.player));
			
		},

		update: function() {
			
			if (this.pos.x < 0) {
				this.speed = this.speed * -1;
				this.pos.x = 1;
			} else if (this.pos.x > 960) {
				this.speed = this.speed * -1;
				this.pos.x = 959;
			}
			

			// set movement
			this.pos.x -= this.speed;


			this.parent();
		},

		check: function( other ) {

			other.receiveDamage( 0, this );
			this.speed = 0;

		},

		wander: function() {

		},

	});
});