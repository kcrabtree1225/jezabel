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
	offset: {x: -10, y: -2},   						//account for whitespace (amount to trim off the top and sides)
	speed: 2,										//players base speed when walking
	runSpeed: 2.75,									//players base speed when running
	health: 100,
	armor: 100,
	weapon: 0,
	totalWeapons: 3,
	currentWeapon: "EntityPistol",
	pistolMags: 6,
	pistolMagSize: 6,
	maxPistolAmmo: 0,
	totalPistolAmmo: 0,
	currentPistolAmmo: 0,
	currentPistolMagAmmo: 0,

		init: function( x, y, settings ) {

			//weapon setup
			this.maxPistolAmmo = this.pistolMags * this.pistolMagSize;
			this.currentPistolAmmo = this.pistolMags * this.pistolMagSize;
			this.currentPistolMagAmmo = 6;

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
			this.placeHolders = [0,0,0,0];
			
		},

		doMath: function() {

			negative = false;

			degConv = 57.2957795;

			yInc2 = 20/90;
			xInc2 = 12/90;
			zeroPoint =  -1.5 * 90;

			inRads = (this.currentAnim.angle);	
			degs = 0;	
			diffDegs = 0;

			if(inRads < 0) {

				negative = true;
				inRads = -inRads;
				
			}

			inDegs = (inRads * degConv);
			this.placeHolders[2] = inDegs;

			yInc = 20/inDegs;
			xInc = 12/inDegs;

			this.placeHolders[1] = (yInc * inDegs);
			this.placeHolders[0] = (xInc * inDegs);

			this.maths[0] = (this.placeHolders[0] + 12);
			this.maths[1] = (this.placeHolders[1] - 8);
			this.placeHolders[2] = this.maths[0];
			this.placeHolders[3] = this.maths[1];
			this.placeHolders[1] = (yInc2 * inDegs);
			this.placeHolders[0] = (xInc2 * inDegs);

			if(inDegs > 90 & inDegs < 270) {

				this.maths[0] = (this.placeHolders[0]);

				if(this.maths[0] > 18) {

						tempNum = this.maths[0] - 18;
						this.maths[0] = this.maths[0] - (tempNum * 2);

				}

			} else {

				this.maths[0] = (this.placeHolders[0] + 12);

			}

			if(inDegs > 180) {

				this.maths[1] = (this.placeHolders[1] - 8);
				tempNum = this.maths[1] - 32;
				this.maths[1] = this.maths[1] - (tempNum * 2);
				this.maths[0] -= 6;

			} else {

				this.maths[1] = (this.placeHolders[1] - 8);

			}

			if (inDegs < 90 & negative & inDegs > 20){

				this.maths[0] = (this.placeHolders[0]);
				
			}
			
		},

		handleMovementTrace: function( res ) {
		    // This completely ignores the trace result (res) and always
		    // moves the entity according to its velocity

		    this.speed = 2;

    		if ( res.collision.x || res.collision.y ) {

			console.log('Player @ '+this.pos.x+','+this.pos.y);
			console.log('Collision @ '+res.pos.x+','+res.pos.y);

			// this.speed = 0;

				if(this.nextCol) {

				this.collision = true;

				}
			}

		    // this.pos.x += this.vel.x * ig.system.tick;
		    // this.pos.y += this.vel.y * ig.system.tick;
		},

		update: function() {

			// // var res = ig.game.collisionMap.trace( this.pos.x + mySpeed, this.pos.y, this.speed, this.speed, this.size.x, this.size.y );
			// // if (res.collision.x || res.collision.y) {
			// // resDiffX = this.pos.x - res.collision.x ;
			// // resDiffY = this.pos.y  - res.collision.y ;

			// // if (resDiffX > resDiffY) {

			// // 	theChange = (resDiffX -1)/2 ;
			// // } else {

			// // 	theChange = (resDiffY -1)/2;
			// // }

			var mySpeed = (Math.sin(this.currentAnim.angle)*this.speed);



			// 	// if (mySpeed > 0 ) {

			// 	// 	mySpeed += theChange;
			// 	// } else {

			// 	// 	mySpeed -=theChange;
			// 	// }
			// // }

			// var mySpeed = (Math.sin(this.currentAnim.angle)*this.speed);

			// if (mySpeed > 0 ) {

			// 		mySpeed += 17;
			// 	} else {

			// 		mySpeed -=17;
			// 	}
			// // console.log(mySpeed);
			// // console.log(this.pos.x + mySpeed);
			// // console.log(this.pos.y + mySpeed);

			
			var nextRes = ig.game.collisionMap.trace( this.pos.x + this.speed, this.pos.y + this.speed, this.speed, this.speed, this.size.x, this.size.y );
			this.nextCol = false;
			if ( nextRes.collision.x || nextRes.collision.y ) { 

				// console.log('next Player @ '+(this.pos.x+mySpeed)+','+(this.pos.y+mySpeed));
				console.log('next Collision @ '+nextRes.pos.x+','+nextRes.pos.y);
				this.nextCol = true;
			}

			this.collision = false;
			var res = ig.game.collisionMap.trace( this.pos.x , this.pos.y, mySpeed, mySpeed, this.size.x, this.size.y );
			this.handleMovementTrace(res);

			// // if (this.pos.y > 450 & this.pos.x > 32 & this.pos.x < 868){

			// // 	if (res.collision.y ) {

			// // 		console.log('Player @ '+this.pos.x+','+this.pos.y);
			// // 		console.log('Collision @ '+res.pos.x+','+res.pos.y);

			// // 		if(this.nextCol) {

			// // 		this.collision = true;

			// // 		}

			// // 	}

			// // } else {

			// 	// if ( res.collision.x || res.collision.y ) {

			// 	// 	console.log('Player @ '+this.pos.x+','+this.pos.y);
			// 	// 	console.log('Collision @ '+res.pos.x+','+res.pos.y);

			// 	// 	if(this.nextCol) {

			// 	// 	this.collision = true;

			// 	// 	}

			// 	}
			// // }
			// Update HUD Status Bars
			document.getElementById("health-bar").innerHTML = this.health;
			$('#health-bar').css('width', this.health+'%')

			document.getElementById("armor-bar").innerHTML = this.armor;
			$('#armor-bar').css('width', this.armor+'%')

			//document.getElementById("ammo-bar").innerHTML = this.pistolMagSize;

			//omg this is nasty..
			switch (this.currentPistolMagAmmo) {
				case(6):
					$('#ammo-bar').css('width', 100+'%')
					break;
				case(5):
					$('#ammo-bar').css('width', 83.33+'%')
					break;
				case(4):
					$('#ammo-bar').css('width', 66.66+'%')
					break;
				case(3):
					$('#ammo-bar').css('width', 49.99+'%')
					break;
				case(2):
					$('#ammo-bar').css('width', 33.32+'%')
					break;
				case(1):
					$('#ammo-bar').css('width', 16.65+'%')
					break;
				case(0):
					$('#ammo-bar').css('width', 0+'%')
			}
			
			// Update HUD Status Bar Labels
			document.getElementById("max-ammo").innerHTML = " Total Pistol Ammo: " + this.currentPistolAmmo+'/'+this.maxPistolAmmo;
			document.getElementById("mag-status").innerHTML = this.currentPistolMagAmmo+'/'+this.pistolMagSize;

			ig.game.player = this;
			// Handle moving 
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
					
					if (!this.collision) {
						this.pos.x += (Math.sin(this.currentAnim.angle)*runSpeed);
    					this.pos.y -= (Math.cos(this.currentAnim.angle)*runSpeed);
    				} 
				} else {

					if (!this.collision) {
					this.pos.x += (Math.sin(this.currentAnim.angle)*speed);
	    			this.pos.y -= (Math.cos(this.currentAnim.angle)*speed);
	    			}
	    		}

			} else if (ig.input.state('backward')) {
			
				this.pos.x -= (Math.sin(this.currentAnim.angle)*speed);
    			this.pos.y += (Math.cos(this.currentAnim.angle)*speed);
			}

			// Move!
			this.parent();

			// Handle shooting
			if(ig.input.pressed('mouse1')) {

				if (this.currentPistolAmmo > 0) {

					this.currentPistolAmmo -= 1;
					this.currentPistolMagAmmo -=1;

					// Handle Reload
					if (this.currentPistolMagAmmo == 0)
						if ((this.currentPistolAmmo - 6 ) >= 0) 
							do {
								this.currentPistolMagAmmo += 1; 
							} while (this.currentPistolMagAmmo < 6);	

					
					this.doMath();
					ig.game.spawnEntity(EntityPistol, this.pos.x + this.maths[0], this.pos.y + this.maths[1] , {
	        			source: this,
	        			click: {
	            			x: ig.gui.cursor.pos.x + ig.game.screen.x,
	            			y: ig.gui.cursor.pos.y
	        			}
	    			});
				} else {
					alert('Out of ammo!');
				}
    			
			}

			// Handle weapon toggling
			if (ig.input.pressed('switchWeapon')) {
				this.weapon++;
				if(this.weapon >= this.totalWeapons)
					this.weapon = 0;
				switch(this.weapon) {
					case(0): 
						this.activeWeapon = "EntityPistol";
						$('#weapon-image').attr('src', 'media/pistol.png');
						break;
					case(1): 
						this.activeWeapon = "EntityPistol";
						$('#weapon-image').attr('src', 'media/shotty.png');
						break;
					case(2):
						this.activeWeapon = "EntityPistol"
						$('#weapon-image').attr('src', 'media/rifle.png');
				}
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
	EntityPistol = ig.Entity.extend({
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
		
		
			//this.parent(x, y, settings);
			this.parent(x, y, settings);
			this.addAnim( 'idle', 0.2, [0] );
			this.maxVel.x = 200;
			this.maxVel.y = 200;

			this.angle = Math.atan2(settings.click.y - ig.game.player.pos.y, settings.click.x - ig.game.player.pos.x);
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