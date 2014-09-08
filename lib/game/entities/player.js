ig.module(
 'game.entities.player'
)
.requires(
 'impact.entity'
)
.defines(function(){
EntityPlayer = ig.Entity.extend({
	animSheet: new ig.AnimationSheet( 'media/player.png', 32, 32 ),

	// Collision Settings
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,

	// Player Properties and Methods
	size: {x: 32, y:32},							//actual size of the player
	offset: {x: 4, y: 2},   						//account for whitespace (amount to trim off the top and sides)
	speed: 2,										//players base speed when walking

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			// Set id
			ig.game.player = this;

			// Set the default animation
			this.addAnim( 'default', 1, [0] );

			// Set the initial angle (this is radians not degrees!)
			this.angle = 0;

		},

		update: function() {

			// Handle moving 
			var speed = this.speed;

				// TODO: abstract this and write a function to handle these checks
				var StageLimitLeft = 30;
				var StageLimitRight = 910;
				var StageLimitUp = 32;
				var StageLimitDown = 452;

			if (ig.input.state('rotateLeft')) {
				// check to make sure player is within the stage boundaries
				// if (this.pos.x - speed > StageLimitLeft )
				// 	this.pos.x -= speed;
				this.angle -= .075;
			} else if (ig.input.state('rotateRight')) {
				// check to make sure player is within the stage boundaries
				// if (this.pos.x + speed < StageLimitRight )
				// 	this.pos.x += speed;
				this.angle += .075;
				
			} else if (ig.input.state('forward')) {
				//check to make sure player is within the stage boundaries
				// if (this.pos.x - speed > StageLimitUp)
				// 	this.pos.x -= speed;
				this.pos.x += (Math.sin(this.currentAnim.angle)*speed);
    			this.pos.y -= (Math.cos(this.currentAnim.angle)*speed);

			} else if (ig.input.state('backward')) {
				// check to make sure player is within the stage boundaries
				// if (this.pos.y + speed < StageLimitDown)
				// 	this.pos.y += speed;
				this.pos.x -= (Math.sin(this.currentAnim.angle)*speed);
    			this.pos.y += (Math.cos(this.currentAnim.angle)*speed);
			}

			// Move!
			this.currentAnim.angle = this.angle;
			this.parent();

			// Handle shooting
			if(ig.input.pressed('mouse1')) {
				ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {
        			source: this,
        			click: {
            			x: ig.gui.cursor.pos.x + ig.game.screen.x,
            			y: ig.gui.cursor.pos.y
        			}
    			});
			}
			
		},
	});
	
	//Inner Class for the pistol
	EntityBullet = ig.Entity.extend({
		// Properties and Methods
		size: {x: 5, y: 3},   
		animSheet: new ig.AnimationSheet('media/bullet.png', 5, 3),
		maxVel: {x: 200, y: 200},
		speed: 350,
		// Collision 
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings) {
			// this.parent(x + (settings.flip ? -4 : 8), y+8, settings);
			var player = ig.game.player;
			// var bulletX = Math.sin(ig.game.player.currentAnim.angle);
			// var bulletY = Math.cos(ig.game.player.currentAnim.angle);
			
			// this.parent(x+25, y+14, settings);
			this.parent(x+24, y+14, settings);
			this.addAnim( 'idle', 0.2, [0] );
			this.maxVel.x = 200;
			this.maxVel.y = 200;

			// var mx = settings.mouse.x - player.x;
			// var my = settings.mouse.y - player.y;
			// console.log(mx);
			// console.log(my);
			// var vLength = Math.sqrt( Math.pow(mx, 2) + Math.pow(my, 2) );
			// this.vel.x = (mx/vLength)*this.speed;
			// this.vel.y = (my/vLength)*this.speed;
			// this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);

			// this.vel.x = this.accel.x = (this.maxVel.x);

			this.angle = Math.atan2(settings.click.y - this.pos.y, settings.click.x - this.pos.x);
			this.vel.y = Math.sin(this.angle) * this.speed;
			this.vel.x =  Math.cos(this.angle) * this.speed;
			
		},

		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) {
				this.kill();
			}
		},

		check: function (other) {
			other.receiveDamage(3, this);
			this.kill();
		}

	});
});