
// Responsible for generating the level as time increases, instantiating and cleaning up "pipes"

var removeItem = function(array, item){
	var index = -1;
	if((index = array.indexOf(item)) > -1){
		array.splice(index, 1);
	}
}

var TowerDispatcher = function(engine, bird, stats){
	var me = this;
	me.engine = engine;
	me.bird = bird;
	me.stats = stats;
	me.towers = [];
	me.triggers = []

	/*me.timer = new ex.Timer(function(){
		me.generateNewTower();
	}, Config.TowerTimer, true);

	me.engine.add(me.timer);*/

	return me;
}

TowerDispatcher.prototype.generateNewTower = function(){
	var dispatch = this;
	var height = this.engine.getHeight();

	var topTowerY = ex.Util.randomInRange(Config.TowerGap* gameScale.y, height);
	var bottomTowerY = topTowerY - Config.TowerGap*gameScale.y* 2;

	var top = new Tower(engine.getWidth() - 1, topTowerY, true);
	var bottom = new Tower(engine.getWidth() - 1, bottomTowerY, false);
	var scoreTrigger = new ex.Trigger(top.x + top.getWidth(), bottomTowerY, 20, Config.TowerGap*gameScale.y* 2, function(){
		dispatch.stats.score++;
		dispatch.stats.text = "Score: " + dispatch.stats.score;
		Resource.ScoreSound.play();
		this.kill();
	}, false);
	scoreTrigger.anchor = new ex.Point(0, 0);
	scoreTrigger.target = this.bird;
	scoreTrigger.dx = Config.LevelSpeed;

	this.towers.push(top);
	this.towers.push(bottom);
	this.triggers.push(scoreTrigger);
	
	top.on('exitviewport', function(){
		this.kill();
		removeItem(dispatch.towers, top);
	});

	bottom.on('exitviewport', function(){
		this.kill();
		removeItem(dispatch.towers, bottom);
	});

	this.engine.add(top);
	this.engine.add(bottom);
	this.engine.add(scoreTrigger);

}

TowerDispatcher.prototype.start = function(){
	var me = this;
	me.timer = new ex.Timer(function(){
		me.generateNewTower();
	}, Config.TowerTimer * gameScale.x, true);

	me.engine.add(me.timer);
}


TowerDispatcher.prototype.stop = function(){
	this.towers.forEach(function(t){
		t.dx = 0;
	});

	this.triggers.forEach(function(t){
		t.dx = 0;
	});

	this.timer.cancel();
}

TowerDispatcher.prototype.clear = function(){
	this.towers.forEach(function(t){
		t.kill();
	});

	this.triggers.forEach(function(t){
		t.kill();
	});
}

