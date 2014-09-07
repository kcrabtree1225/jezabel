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
	// flip: false,
	// maxVel: {x: 100, y: 100},
	// friction: {x: 1800, y:1800},
	// accelGround: 1000,
	speed: 2,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			// Add the animations

			// this.addAnim( 'up', 1, [0] );
			// this.addAnim( 'down', 180, [0] );
			// this.addAnim( 'left', 270, [0] );
			// this.addAnim( 'right', 90, [0] );

			// Set id
			ig.game.player = this;

			this.addAnim( 'move', 1, [0] );
			this.angle = 0;
			// this.addAnim( 'down', 180, [0] );
			// this.addAnim( 'left', 270, [0] );
			// this.addAnim( 'right', 90, [0] );

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
		},
	});
});