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
		found_player : false,
		init: function( x, y, settings ) {

			this.parent( x, y, settings );

			// Add the animations

			this.addAnim( 'idle', 180, [0] );
			this.angle = 0;


			// check if this zombie has found the player
			// this.found_player = false;

			// set speed
			// speed = this.speed
			
			// console.log(this.distanceTo(this.parent.player));
			
		},

		update: function() {
			
			// console.log(ig.game.player.pos.x)
			player_x = ig.game.player.pos.x;
			player_y = ig.game.player.pos.y;
			found_x = false;
			found_y = false;
			x = this.pos.x;
			y = this.pos.y;
			x_range = 250;
			y_range = 250;
			x_diff = x - player_x;
			y_diff = y - player_y;

			if (x_diff < 0 ) {
				x_diff = -x_diff;
			}
			if (x_diff <= x_range) {
				found_x = true;
			}
			if (y_diff < 0) {
				y_diff = -y_diff;
			}
			if (y_diff <= y_range) {
				found_y = true;
			}
			if (found_y == true && found_x == true) {
				this.found_player = true;
			}
			if (this.found_player == true) {
				this.chase();
			} else {
				this.roam();
			}

			// Keep them in bounds
		
			if (this.pos.x < 0) {
				this.speed = this.speed * -1;
				this.pos.x = 1;
			} else if (this.pos.x > 960) {
				this.speed = this.speed * -1;
				this.pos.x = 959;
			}
			

			// set movement
			
			
			// this.pos.y += speed;

			this.parent();
		},

		check: function( other ) {

			other.receiveDamage( 0, this );
			this.speed = 0;

		},

		roam: function() {

			this.pos.x += this.speed;
			this.angle += 0.75;
			console.log(this.currentAnim.angle);
			this.currentAnim.angle = this.angle;
			this.parent();
		},

		chase: function() {

			x_is_greater = null;
			y_is_greater = null;
			// console.log('chasing..');
			if (this.pos.x > ig.game.player.pos.x) {
				this.pos.x += this.speed;
			} else {
				this.pos.x -= this.speed;
			}
			if (this.pos.y > ig.game.player.pos.y) {
				this.pos.y += this.speed;
			} else {
				this.pos.y -= this.speed;
			}
		}

	});
});