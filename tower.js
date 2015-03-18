

// Towers of excalibird

var Tower = ex.Actor.extend({
	constructor: function(x, y, isBottomTower){
		
		var brickSpriteSheet = new ex.SpriteSheet(Resource.BrickSpriteSheet, 2, 1, 61, 40);
		this.capSprite = brickSpriteSheet.getSprite(0);
		this.capSprite.setScaleY(2 * gameScale.y);
		this.capSprite.setScaleX(2 * gameScale.x);
		this.baseSprite = brickSpriteSheet.getSprite(1);
		this.baseSprite.setScaleY(2 * gameScale.y);
		this.baseSprite.setScaleX(2 * gameScale.x);
		
		var spriteHeight = this.baseSprite.sheight * this.baseSprite.scaleY;

		ex.Actor.apply(this, [x, isBottomTower? y: y-(Config.TowerStacks * spriteHeight)*gameScale.y, Config.TowerWidth*2, (Config.TowerStacks * spriteHeight)]);

		this.isBottomTower = isBottomTower;
		
		this.dx = Config.LevelSpeed;

		this.scale.setTo(gameScale.x, gameScale.y)

		if(!this.isBottomTower){
			this.capSprite.flipVertical = true;
			this.baseSprite.flipVertical = true;
		}

		this.collisionType = ex.CollisionType.Passive;
		this.anchor = new ex.Point(0, 0);

	},
	draw: function(ctx, delta){
		//ex.Actor.prototype.draw.apply(this, [ctx, delta]);
		var spriteHeight = this.baseSprite.sheight * this.baseSprite.scaleY;

		if(this.isBottomTower){
			this.capSprite.draw(ctx, this.x, this.y);
			for(var i = spriteHeight; i < this.getHeight(); i += spriteHeight){
				this.baseSprite.draw(ctx, this.x, this.y + i);
			}
		}else{
			this.capSprite.draw(ctx, this.x, this.getBottom() - spriteHeight);
			for(var i = 0; i < this.getHeight(); i += spriteHeight){
				this.baseSprite.draw(ctx, this.x, this.getBottom() - i - spriteHeight*2);
			}
		}
	}

});
