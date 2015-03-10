
// game configuration

var Config = {

	BirdWidth: 50,
	BirdHeight: 45,
	BirdImpulse: -120,
	BirdAccel: 170,
	BirdMaxVel: 300,

	LevelSpeed: -100,
	LevelAccel: 0,
	LevelDensity: 1, // pipe per screen

	TowerWidth: 61,
	TowerStacks: 10,
	TowerGap: 110,
	TowerTimer: 4000,

	_dirty: false,
	reload: function(){
		this._dirty = true;
	}
}