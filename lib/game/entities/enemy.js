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
	speed_x: 0,
	speed_y: 0,
	found_player : false,
	timer : new ig.Timer(),
	random : Math.floor(Math.random() * (7 - -3)) + -3,
		init: function( x, y, settings ) {

			this.parent( x, y, settings );

			this.addAnim( 'idle', 180, [0] );
			
			this.speed_y = Math.floor(Math.random() * (3 - -2)) + -2;

			this.speed_x = Math.floor(Math.random() * (3 - 0)) + 0;

			
		},

		update: function() {

			if (this.pos.x < 0) {
				this.speed_x = this.speed_x * -1;
				this.pos.x = 1;
			} else if (this.pos.x > 960) {
				this.speed_x = this.speed_x * -1;
				this.pos.x = 959;
			}

			if (this.pos.y < 0) {
				this.speed_y = this.speed_y * -1;
				this.pos.y = 1;
			} else if (this.pos.y > 540) {
				this.speed_y = this.speed_y * -1;
				this.pos.y = 539;
			}

			player_x = ig.game.player.pos.x;
			player_y = ig.game.player.pos.y;
			found_x = false;
			found_y = false;
			x = this.pos.x;
			y = this.pos.y;
			x_range = 150;
			y_range = 150;
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
			if (this.found_player & !this.chasing){

				this.chase();
			}

			this.move();

			this.parent();
		},

		check: function( other ) {

			other.receiveDamage( 0, this );
			this.kill();
		

		},

		roam: function() {

			
			if (this.timer.delta() > (6.75+this.random)){
			
				this.randomReset();
				this.timerReset();

			} else {
				x = this.speed_x;
				y = this.speed_y;
				this.move(x,y);
				

			}
		
		},

		chase: function() {

		
			

			if (this.pos.x < ig.game.player.pos.x) {
				
					this.x = false;
					
			} else {
				
					this.x = true;
				
			}
			if (this.pos.y < ig.game.player.pos.y) {
				
					this.y = false;
					
			} else {
				
					this.y = true;
						
			}

			if (this.x == true) {

				this.chase_x  = (ig.game.player.pos.x - this.pos.x)/100;

			} else {

				this.chase_x = (this.pos.x - ig.game.player.pos.x)/100;
			}
			if (this.y == true) {

				this.chase_y  = (ig.game.player.pos.y - this.pos.y)/100;

			} else {

				this.chase_y = (this.pos.y - ig.game.player.pos.y)/100;
			}	

			if (this.chase_x < 1.5) {

				this.chase_x = 1.5;
			}
			if (this.chase_y < 1.5) {

				this.chase_y = 1.5;
			}

			this.chasing = true;

		},







		move: function() {

			

			

			if (this.found_player) {

				if (this.x == true) {
					
					this.pos.x -= this.chase_x;

				} else {
					
					this.pos.x += this.chase_x;
				}

				if (this.y == true) {

					this.pos.y -= this.chase_y;

				} else {

					this.pos.y += this.chase_y;
				}

				this.chasing = false;

			} else {

				this.pos.x += this.speed_x;
				this.pos.y += this.speed_y;

			}

			this.angleFinder();

		},

		randomReset: function() {

			this.random = 0;
			this.random = Math.floor(Math.random() * (7 - -3)) + -3;
		},

		timerReset: function() {

			this.timer.set( 0 );
		},

		angleFinder: function() {

			if (this.last.x < this.pos.x) {

				this.x_angle = 1.5;

			} else {
				this.x_angle = 4.5;
			}
			if (this.last.y < this.pos.y) {

				this.y_angle = 3;
			} else {

				if(this.last.x < this.pos.x) {

					this.y_angle = 0;
				} else {
					this.y_angle = 6;
				}
			}
			if (this.last.y == this.pos.y) {

				this.y_angle = this.x_angle;
			}
			if (this.last.x == this.pos.x) {

				this.x_angle == this.y_angle;
			}

			this.targetAngle = (this.x_angle + this.y_angle)/2;

			if (this.currentAnim.angle != (this.targetAngle + 0.75) & this.currentAnim.angle != (this.targetAngle - 0.75)) {

				

				if (this.currentAnim.angle < this.targetAngle) {

						this.currentAnim.angle += (this.targetAngle - this.currentAnim.angle)/10
					} else {

						this.currentAnim.angle -= (this.currentAnim.angle - this.targetAngle)/10;
					}
			}
		}

	});
});