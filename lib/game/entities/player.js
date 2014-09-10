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
	runSpeed: 2.75,									//players base speed when running

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			// Set id
			ig.game.player = this;

			// Set the default animation
			this.addAnim( 'default', 1, [0] );

			// Set the initial angle (this is radians not degrees!)
			this.angle = 0;
			this.spawn = false;

			//x , y , radians
			this.maths = [12, 8, 1.5];


			// all converted to scale x, y, degrees
			this.placeHolders = [0,0,0];

		},

		doMath: function() {

			negative = false;

			degConv = 57.2957795;

			yInc = 20/90;
			xInc = 12/90;
			zeroPoint =  -1.5 * 90;

			inRads = (this.currentAnim.angle - 1.5);
		

			if(inRads < 0) {

				negative = true;
				inRads = -inRads;
				
			}

			inDegs = (inRads * degConv);
			this.placeHolders[2] = inDegs;



			this.placeHolders[1] = (yInc * inDegs);
			this.placeHolders[0] = (xInc * inDegs);

			console.log(this.placeHolders[0]);
			console.log(this.placeHolders[1]);


			this.maths[0] = (this.placeHolders[0] + 12);
			this.maths[1] = (this.placeHolders[1] - 8);

			console.log(this.maths[0] + 12);
			console.log(this.maths[1] - 8);
			// this.maths[2] = this.placeHolders[2];


			// degree difference to 0
			
		},

		update: function() {

			// Handle moving 
			// console.log(this.currentAnim.angle - 1.5);
			var speed = this.speed;
			var runSpeed = this.runSpeed;

			var mx = ig.input.mouse.x + ig.game.screen.x;
			var my = ig.input.mouse.y + ig.game.screen.y;
			var mouseAngle =  Math.atan2(
			    my - (this.pos.y + this.size.y/2),
			    mx - (this.pos.x + this.size.x/2)
			);

			this.currentAnim.angle = (mouseAngle + 1.5);

				// TODO: abstract this and write a function to handle these checks
				var StageLimitLeft = 30;
				var StageLimitRight = 910;
				var StageLimitUp = 32;
				var StageLimitDown = 452;

			if (ig.input.state('strafeLeft')) {
				// TODO: Add strafing code	
			} else if (ig.input.state('strafeRight')) {
				// TODO: Add strafing code
			} else if (ig.input.state('forward')) {
				
				if (ig.input.state('run')) {
					this.pos.x += (Math.sin(this.currentAnim.angle)*runSpeed);
    				this.pos.y -= (Math.cos(this.currentAnim.angle)*runSpeed);
				} else {
					this.pos.x += (Math.sin(this.currentAnim.angle)*speed);
	    			this.pos.y -= (Math.cos(this.currentAnim.angle)*speed);
	    		}

			} else if (ig.input.state('backward')) {
			
				this.pos.x -= (Math.sin(this.currentAnim.angle)*speed);
    			this.pos.y += (Math.cos(this.currentAnim.angle)*speed);
			}

			// Move!
			this.parent();

			// Handle shooting
			if(ig.input.pressed('mouse1')) {
				
				this.doMath();
				ig.game.spawnEntity(EntityBullet, this.pos.x , this.pos.y , {
        			source: this,
        			click: {
            			x: ig.gui.cursor.pos.x + ig.game.screen.x,
            			y: ig.gui.cursor.pos.y
        			}
    			});
			}

			// Handle additional keypresses (to be removed later)
			if (ig.input.pressed('toggleZombies')) {
				if (!this.spawn) {
					this.spawn = true;
					zombieSpawning = 'ON';
				} else {
					this.spawn = false;
					zombieSpawning = 'OFF';
				}
			}		
		},
	});
	
	// Inner Class for the pistol
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
		
			var player = ig.game.player;
			// console.log(this.pos.x);
			// console.log(ig.game.player.pos.x);
			// console.log(this.pos.y);
			// console.log(ig.game.player.pos.y);
			this.parent(x+ig.game.player.maths[0], y+ig.game.player.maths[1], settings);
			this.parent(x, y, settings);
			this.addAnim( 'idle', 0.2, [0] );
			this.maxVel.x = 200;
			this.maxVel.y = 200;

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
			if(other.is_enemy) {

				other.found_player = true;

			}
			this.kill();
		}

	});
});