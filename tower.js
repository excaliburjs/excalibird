

// Towers of excalibird

var Tower = ex.Actor.extend({
	constructor: function(x, y, isBottomTower){
		this.isBottomTower = isBottomTower;
		ex.Actor.apply(this, [x, isBottomTower? y: y-Config.TowerHeight, Config.TowerWidth*2, Config.TowerHeight]);
		this.dx = Config.LevelSpeed;

		var brickSpriteSheet = new ex.SpriteSheet(Resource.BrickSpriteSheet, 2, 1, 61, 40);
		this.capSprite = brickSpriteSheet.getSprite(0);
		this.capSprite.setScaleY(2);
		this.capSprite.setScaleX(2);
		this.baseSprite = brickSpriteSheet.getSprite(1);
		this.baseSprite.setScaleY(2);
		this.baseSprite.setScaleX(2);

		if(!this.isBottomTower){
			this.capSprite.flipVertical = true;
			this.baseSprite.flipVertical = true;
		}

		this.collisionType = ex.CollisionType.Passive;
		this.anchor = new ex.Point(0, 0);

	},
	draw: function(ctx, delta){
		//ex.Actor.prototype.draw.apply(this, [ctx, delta]);

		if(this.isBottomTower){
			this.capSprite.draw(ctx, this.x, this.y);
			for(var i = 40; i < this.getHeight(); i += 40){
				this.baseSprite.draw(ctx, this.x, this.y + i + 40);
			}
		}else{
			this.capSprite.draw(ctx, this.x, this.getBottom()-40);
			for(var i = 0; i < this.getHeight(); i += 80){
				this.baseSprite.draw(ctx, this.x, this.getBottom() -i -80);
			}
		}
	}

});
