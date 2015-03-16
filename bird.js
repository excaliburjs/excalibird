

var Bird = ex.Actor.extend({
	constructor: function(engine){
		
		// call super constructor
		var centerX = engine.getWidth()/2;
		var centerY = engine.getHeight()/2;
		ex.Actor.apply(this, [centerX, centerY, Config.BirdWidth, Config.BirdHeight]);

		// initialize acceleration downwards off of global config
		this.ay = Config.BirdAccel;
		
		this.anchor = new ex.Point(0.5, 0.6);
		

		// setup animations
		var spriteSheet = new ex.SpriteSheet(Resource.BirdSpriteSheet, 4, 1, 32, 32);
		this.upAnimation = spriteSheet.getAnimationByIndices(engine, [2, 1, 0], 150);
		this.upAnimation.setScaleX(gameScale.x);
		this.upAnimation.setScaleY(gameScale.y);
		this.upAnimation.freezeFrame = 2;

		this.downAnimation = spriteSheet.getAnimationByIndices(engine, [0, 3, 2], 150);
		this.downAnimation.setScaleX(gameScale.x);
		this.downAnimation.setScaleY(gameScale.y);
		this.downAnimation.freezeFrame = 2;

		this.addDrawing("up", this.upAnimation);		
		this.addDrawing("down", this.downAnimation);

		this.setCenterDrawing(true);
		this.scale.setTo(gameScale.x*Config.BirdScale, gameScale.y*Config.BirdScale);
		
		this.dead = false;

		// setup passive collision, meaning it will get collsion events but not be moveds
		this.collisionType = ex.CollisionType.Passive;
		this.on('collision', function(){
			if(!this.dead){
				console.log("Collision!")
				dispatcher.stop();
				this.actionQueue.clearActions();
				this.dead = true;
				this.rx = 10;
				engine.input.pointers.primary.off("down");
				gameOver();
			}
			//this.moveTo(-1000, 1000, 300).kill();
		});

		this.on('exitviewport', function(){
			this.dead = true;
			this.rx = 10;
			dispatcher.stop();
			this.actionQueue.clearActions();
			engine.input.pointers.primary.off("down");
			gameOver();
		});

		
		this.animatingUpwards = false;
	},

	update: function(engine, delta){
		// call super update
		ex.Actor.prototype.update.apply(this, [engine, delta]);

		if(!this.dead){
			// if bird is falling play down animation
			if(this.dy > 0){
				//this.downAnimation.reset();
				this.setDrawing("down");
			}

			// only calculate if not animating to make the snap less jarring
			if(!this.animatingUpwards){
				// calculate bird's angle
				var velocityAngle = new ex.Vector(-Config.LevelSpeed, this.dy).normalize().toAngle();
				this.rotation = velocityAngle;

			}


			// clamp velocity, otherwise we get going too fast 
			this.dy = ex.Util.clamp(this.dy, -Config.BirdMaxVel, Config.BirdMaxVel);
		}
	},

	bounce: function(){
		// applies impulse upward and plays the rewound animation
		this.dy = Config.BirdImpulse * gameScale.x;
		this.upAnimation.reset();
		this.setDrawing("up");

		// Play flap sound
		Resource.FlapSound.play();

		// Apply a smoothing effect to make the snap less jarring
		var velocityAngle = new ex.Vector(-Config.LevelSpeed, this.dy).normalize().toAngle();
		this.animatingUpwards = true;
		var that = this;
		// animate a rotation over 150 ms then switch the animating flag
		this.rotateBy(velocityAngle, 130).callMethod(function(){
			that.animatingUpwards = false;
		});


	}

})