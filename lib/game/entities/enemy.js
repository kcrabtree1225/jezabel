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

			// Add the animations
			// console.log(this.name);

			this.addAnim( 'idle', 180, [0] );
			
			this.speed_y = Math.floor(Math.random() * (3 - -2)) + -2;

			this.speed_x = ig.game.enemies.length;

			this.canMove = true;

			// check if this zombie has found the player
			// this.found_player = false;

			// set speed
			// speed = this.speed_x
			
			// console.log(this.distanceTo(this.parent.player));
			
		},

		update: function() {

			// if (this.canMove == true){
			//console.log(this.last.x);
			this.pos.x += this.speed_x;
			this.pos.y += this.speed_y;
			//console.log(this.pos.x);
			// }
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

				// this.canMove = false;

				if (this.currentAnim.angle < this.targetAngle) {

						this.currentAnim.angle += (this.targetAngle - this.currentAnim.angle)/10
					} else {

						this.currentAnim.angle -= (this.currentAnim.angle - this.targetAngle)/10;
					}
			} else {

				// this.canMove = true;
			}
			
			// angleFinder();
			// console.log(ig.game.player.pos.x)
			// this.angleFinder();
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
		
			
			

			// set movement
			
			
			// this.pos.y += speed;

			this.parent();
		},

		check: function( other ) {

			other.receiveDamage( 0, this );
			this.kill();
			this.kill();

		},

		roam: function() {

			// this.pos.x += this.speed_x;
			// this.angle = 180;
			// this.angle = 4.5;
			// console.log(this.currentAnim.angle);
			// this.currentAnim.angle = this.angle;
			// this.parent();
			// this.times = ig.game.timer.delta();
			if (this.timer.delta() > (6.75+this.random)){
				// console.log('done');
				this.randomReset();
				this.timerReset();

				// console.log(this.random);
				// console.log(this.timer.delta());
				
				// other things for move change
			} else {
				x = this.speed_x;
				y = this.speed_y;
				this.move(x,y);
				// this.pos.x += x;

			}
			// console.log(this.timer.delta());
			// alert(Math.floor(Math.random() * (5 - 1)) + 1);
		},

		chase: function() {

			x = null;
			y = null;
			// console.log('chasing..');
			if (this.pos.x > ig.game.player.pos.x) {
				if(this.speed_x < 0){
					x = true;
				} else {
					x = false;
				} 	
			} else {
				if(this.speed_x < 0){
					x = false;
				} else {
					x = true;
				} 	
			}
			if (this.pos.y > ig.game.player.pos.y) {
				if(this.speed_y < 0){
					y = true;
				} else {
					y = false;
				} 		
			} else {
				if(this.speed_y < 0){
					y = false;
				} else {
					y = true;
				} 		
			}


			this.move(x,y);
			// move function?
			// if (y == 'plus' & this.angle != 90) {
			// 	this.angle = 90;
			// 	this.pos.y += this.speed_x;
			// }
		},







		move: function(x,y) {

			

			

			// if (this.found_player) {

		
			// 	if (x == true) {
				
			// 		this.pos.x += this.speed_x;

			// 	} else {

			// 		this.pos.x -= this.speed_x;
			// 	}

			// 	if (y == true) {

			// 		if (this.speed_y == 0){
			// 			this.speed_y = 1;
			// 		}

			// 		this.pos.y += this.speed_y;

			// 	} else {

			// 		if (this.speed_y == 0){
			// 			this.speed_y = 1;
			// 		}

			// 		this.pos.y -= this.speed_y;
			// 	}

			// } else {

			// 	this.pos.x += x;
			// 	this.pos.y += y;

			// }

		},

		randomReset: function() {

			this.random = 0;
			this.random = Math.floor(Math.random() * (7 - -3)) + -3;
		},

		timerReset: function() {

			this.timer.set( 0 );
		},

		angleFinder: function() {

			t = this
			// this.angle = 0;
			t.x_angle = 0;
			t.y_angle = 0;
			t.targetAngle = 0;
			// get current vs attempt
			// alert('here');
			if (this.speed_x > 0) {

				t.x_angle = 1.5;

			} else {
				t.x_angle = 4.5;
			}

			if (this.speed_y < 0) {

				t.y_angle = 6;
			} else {
				t.y_angle = 3;
			}

			// alert('here2');
			if (this.speed_y == 0) {

				t.targetAngle = t.x_angle;
			} else if (this.speed_x == 0) {
				t.targetAngle = t.y_angle;
			} else {

			t.targetAngle = (t.x_angle + t.y_angle)/2;

			}
			// alert('here3');
			// alert(this.angle);
			// alert(t.targetAngle);
			// alert(t.targetAngle);
			// alert(t.angle);
			// alert(this.currentAnim.angle);
			// console.log(this.currentAnim.angle);
			console.log(t.targetAngle);
			// alert(this.targetAngle);
			// console.log(t.y_angle);

			if (this.currentAnim.angle < t.targetAngle) {
				while (this.currentAnim.angle != t.targetAngle) {
					t.currentAnim.angle += 0.075;
					
					if (this.currentAnim.angle > t.targetAngle) {
						this.currentAnim.angle = t.targetAngle;
					}
				}
			} else {
				while (this.currentAnim.angle != t.targetAngle) {
					this.currentAnim.angle -= 0.075;
					// t.angle -= 0.075;
					if (this.currentAnim.angle < t.targetAngle) {
						this.currentAnim.angle = t.targetAngle;
					}
				}	
			}
			// console.log(t.targetAngle);
			// console.log(t.x_angle);
			// console.log(t.y_angle);
			// console.log(this.currentAnim.angle);
			// console.log(this.angle);
			// console.log(t.x_angle);
			// console.log(t.y_angle);
			// alert('done');
		}

	});
});