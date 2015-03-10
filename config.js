
// game configuration

var Config = {

	BirdWidth: 45,
	BirdHeight: 40,
	BirdImpulse: -120,
	BirdAccel: 140,
	BirdMaxVel: 300,

	LevelSpeed: -100,
	LevelAccel: 0,
	LevelDensity: 1, // pipe per screen

	TowerWidth: 61,
	TowerStacks: 10,
	TowerGap: 130,
	TowerTimer: 4000,

	_dirty: false,
	reload: function(){
		this._dirty = true;
	}
}