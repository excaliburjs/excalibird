
// todo add a module loading paradigm to this example, browserify or something

// Build and configure the engine
var engine = new ex.Engine(0, 0, "game", ex.DisplayMode.FullScreen);
//engine.isDebug = true;
engine.setAntialiasing(false);
engine.backgroundColor = ex.Color.Azure.clone();

// detect and auto scale to viewport height
var detected = 1.0;// .6 - (Config.BirdHeight / engine.getHeight());
var gameScale = new ex.Point(1.0, 1.0);// new ex.Point(1 + detected , 1.0 + detected);

// Build and load resources
var loader = new ex.Loader();
for(var resource in Resource){
	loader.addResource(Resource[resource]);
}


// assemble the game

// title screen

var title = null;
var instructions = null;
var buildTitle = function(){
	 title = new ex.Actor(engine.getWidth()/2, engine.getHeight()/2, 100, 100);
	var titleSprite = Resource.Excalibird.asSprite();
	titleSprite.setScaleX(2.5);
	titleSprite.setScaleY(2.5);
	title.addDrawing("title", titleSprite);
	title.setCenterDrawing(true);
	title.scale.setTo(gameScale.x, gameScale.y);
	title.moveTo(title.x, title.y + 30, 50).moveTo(title.x, title.y, 50).repeatForever();
	engine.add(title);

	instructions = new ex.Label("Click or Tap to Start!!!", engine.getWidth()/2, engine.getHeight()-30, "20px 'Press Start 2P', cursive");
	instructions.color = ex.Color.Black;
	instructions.textAlign = ex.TextAlign.Center;
	instructions.scale.setTo(gameScale.x , gameScale.y);
	instructions.blink(300, 300).repeatForever();
	engine.add(instructions);
}


var dispatcher = null;
var bird = null;
var stats = null;
// start the main game
var start = function(){	
	bird = new Bird(engine);
	stats = new ex.Label("Score: " + 0, 20, 30, "20px 'Press Start 2P', cursive");
	stats.score = 0;
	stats.scale.setTo(gameScale.x, gameScale.y);
	stats.baseAlign = ex.BaseAlign.Top;
	engine.add(bird);
	engine.currentScene.addUIActor(stats);

	//var tower = new Tower(800, 200, true);
	//var tower2 = new Tower(800, 70, false);
	//engine.add(tower);
	//engine.add(tower2);

	dispatcher = new TowerDispatcher(engine, bird, stats);
	dispatcher.start();

	// handle input
	engine.input.pointers.primary.on("down", function (pe) {
	    bird.bounce();
	});
}

var gameOver = function(){
	Resource.FailSound.play();
	instructions = new ex.Label("Game Over! Try again?", engine.getWidth()/2, engine.getHeight()/2, "20px 'Press Start 2P', cursive");
	instructions.color = ex.Color.Black;
	instructions.textAlign = ex.TextAlign.Center;
	instructions.scale.setTo(gameScale.x, gameScale.y);
	engine.add(instructions);
	engine.input.pointers.primary.on("down", function(){
		dispatcher.clear();
		bird.kill();
		engine.currentScene.uiActors = [];
		instructions.kill();

		engine.input.pointers.primary.off("down");
		start();
		if(title) title.kill();
		if(instructions) instructions.kill();
	});
}

engine.input.pointers.primary.on("down", function(){
	engine.input.pointers.primary.off("down");
	start();
	if(title) title.kill();
	if(instructions) instructions.kill();
});


// start the game
engine.start(loader).then(function(){
	console.log("Game loaded");
	console.log("Height:", engine.getHeight());
	console.log("BirdHeight:", Config.BirdHeight);	
	detected =  (engine.getHeight() / 800) * .50 + 1;
	gameScale = new ex.Point(detected , detected);
	console.log("Scale:", gameScale.x);

	

	// add my special clouds 
	engine.add(new Cloud(800, 0));
	engine.add(new Cloud(400, 300 * gameScale.y));
	engine.add(new Cloud(700, 700 * gameScale.y));

	buildTitle();
});