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
		speed: 0,
		init: function( x, y, settings ) {

			this.parent( x, y, settings );

			// Add the animations
			// this.addAnim( 'up', 1, [0] );
			this.addAnim( 'idle', 180, [0] );
			// this.addAnim( 'left', 270, [0] );
			// this.addAnim( 'right', 90, [0] );

			

			// Set speed
			console.log(this.distanceTo(this.parent.player));
			this.speed = 5;
		},

		update: function() {
			
			this.pos.x -= this.speed;
			this.parent();
		},

		check: function( other ) {

			other.receiveDamage( 0, this );
			this.speed = 0;

		},

	});
});