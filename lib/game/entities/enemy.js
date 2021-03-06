ig.module(
 'game.entities.enemy',
 'game.entities.stuffs'
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
	collides: ig.Entity.COLLIDES.ACTIVE,
	//actual size of the player
	size: {x: 32, y:32},
	
	//account for whitespace (amount to trim off the top and sides)
	offset: {x: 4, y: 2},
	flip: false,

	accelGround: 1000,
	speed_x: 0.5,
	speed_y: 0,
	is_enemy: true,
	found_player : false,
	timer : new ig.Timer(),
	random : Math.floor(Math.random() * (7 - -3)) + -3,
		init: function( x, y, settings ) {

			this.parent( x, y, settings );

			this.addAnim( 'imAzombie', 180, [0] );
			
			this.speed_y = Math.floor(Math.random() * (2 - -1)) + -1;

			this.speed_x += Math.floor(Math.random() * (1 - 0)) + 0;
			
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

			this.speed_y > 2 ? this.speed_y = 2 : this.speed_y += 0.01;
			this.speed_x > 3 ? this.speed_x = 3 : this.speed_x += 0.01;

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

			!this.found_player ? this.roam() : this.chase();
			this.parent(x,y);
		},

		check: function( other ) {

			other.receiveDamage( 0, this );
			

			!other.is_enemy === true ?  other.receiveDamage(.05) : instructions = false;
			
			// ig.game.current -= 1;

		},

		roam: function() {

			
			if (this.timer.delta() > (6+this.random)){
			
				this.randomReset();
				this.timerReset();
				this.change = true;
				console.log('eh');


			} 

			if(this.change) {
				if(this.operand == 1) {

					this.speed_x > 0 ? this.speed_x += 0.1 : this.speed_x = -this.speed_x;
					this.speed_y > 0 ? this.speed_y += 0.1 : this.speed_y = -this.speed_y;
				} else {

					this.speed_x > 0 ? this.speed_x = -this.speed_x : this.speed_x += 0.1;
					this.speed_y > 0 ? this.speed_y = -this.speed_y : this.speed_y += 0.1;
				}

				this.change = false;
				console.log(this.operand);
			}

			x = this.speed_x;
			y = this.speed_y;
			this.move(x,y);

		
		},

		chase: function() {

		
			// this basically says if the player is on your left move left, if he is above you go up, etc..

			if (this.pos.x < ig.game.player.pos.x) {
				
					this.x = false;
					// make offset of player last pos and have zombie go there before tracking player again
					
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
			this.operand = Math.floor(Math.random() * (1 - 0)) + 0;

			this.random = Math.floor(Math.random() * (7 - -3)) + -3;
		},

		timerReset: function() {

			this.timer.set( 0 );
		},

		angleFinder: function() {

			// determines the direction an entity should be facing based on which direction it is moving

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
			this.res = ig.game.collisionMap.trace( this.pos.x , this.pos.y, this.speed_x, this.speed_y, this.size.x, this.size.y );


			if ( this.res.collision.x || this.res.collision.y ) {

				this.targetAngle > 1.5 ? this.targetAngle -= 3 : this.targetAngle += 3;
				this.speed_y = -this.speed_y + 0.5;
				this.speed_x = -this.speed_x + 0.5;

			}

			if (this.currentAnim.angle != (this.targetAngle + 0.75) || this.currentAnim.angle != (this.targetAngle - 0.75)) {

				

				if (this.currentAnim.angle < this.targetAngle) {

						this.currentAnim.angle += (this.targetAngle - this.currentAnim.angle)/10
					} else {

						this.currentAnim.angle -= (this.currentAnim.angle - this.targetAngle)/10;
					}
			}
		}

	});
});