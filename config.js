
// game configuration

var Config = {

	BirdWidth: 35,
	BirdHeight: 35,
	BirdImpulse: -200,
	BirdAccel: 570,
	BirdMaxVel: 450,
	BirdScale: 1.7,

	LevelSpeed: -250,
	LevelAccel: 0,
	LevelDensity: 1, // pipe per screen

	TowerWidth: 61,
	TowerStacks: 10,
	TowerGap: 90,
	TowerTimer: 2000,

	_dirty: false,
	reload: function(){
		this._dirty = true;
	}
}