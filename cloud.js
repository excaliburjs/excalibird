var Cloud = ex.Actor.extend({
   constructor: function(x, y){
      ex.Actor.apply(this, [x, y]);
      this.width = 500;
      this.height = 500;
      this.dx = ex.Util.randomInRange(-30, -100);
      var cloud = Resource.Cloud.asSprite();
      cloud.setScaleX(3 * gameScale.x);
      cloud.setScaleY(3 * gameScale.y);


      this.addDrawing("default", cloud);
      this.setCenterDrawing(true);
      this.scale.setTo(gameScale.x, gameScale.y);
   },

   update: function(engine, delta){
      ex.Actor.prototype.update.apply(this, [engine, delta]);
      var screenCoords =  engine.worldToScreenCoordinates(new ex.Point(this.x, this.y));

      if(screenCoords.x + this.getWidth() < 0){
         this.x = engine.width + this.getWidth();
      }
   }

});