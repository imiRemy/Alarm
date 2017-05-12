// ================================
// Basic Alarm functionality tests.
// ================================

var chai = require("chai");
var expect = chai.expect;

var AlarmMaker = require("../alarm.js").AlarmMaker;

// ----------------
// Create an Alarm.
// ----------------

var alarm = AlarmMaker.Alarm('basic');

describe('Alarm is an object:', function() {
	it('Alarm should be an object', function() {
		expect(alarm).to.be.an('object');
	});
});

describe('Alarm initial conditions:', function() {
	it('should have property flag', function() {
		expect(alarm).to.have.property('flag');
	});
	it('should have property state', function() {
		expect(alarm).to.have.property('state');
	});
});

// -----------------
// Enable the alarm.
// -----------------

alarm.enable();

describe('Alarm can be set:', function() {
	it('set flag', function() {
		expect(alarm.flag.enable).to.be.true;
	});
	it('set state', function() {
		expect(alarm.state.alarmSet).to.be.true;
	});
});

// -------------------------------
// Check trigger and state change.
// -------------------------------

function trigger() {
	return true;
}

var alarm2 = AlarmMaker.Alarm('basic');
alarm2.setTrigger( trigger );
alarm2.enable();
alarm2.clear();

describe('Alarm can be cleared:', function() {
	it('clear flag', function() {
		expect(alarm2.flag.clear).to.be.true;
	});
	it('clear state', function() {
		expect(alarm2.state.alarmOff).to.be.true;
	});
});

describe('Alarm trigger function:', function() {
	it('is not null', function() {
		expect(alarm2.handler.trigger).to.not.be.null;
	});
	it('returns true', function() {
		expect(alarm2._doTrigger()).to.be.true;
	});
});

// ----------------------------
// Set alarm and apply trigger.
// ----------------------------

var alarm3 = AlarmMaker.Alarm('basic');
alarm3.setTrigger( trigger );
alarm3.clear();
alarm3.tick();

describe("tick() with AlarmOff; alarm state should be 'AlarmOff':", function() {
	it('it is', function() {
		expect(alarm3.state.alarmOff).to.be.true;
	});
});

var alarm4 = AlarmMaker.Alarm('basic');
alarm4.setTrigger( trigger );
alarm4.clear();
alarm4.enable();
alarm4.tick();

describe("tick() with AlarmSet, alarm state should be 'AlarmOn':", function() {
	it('it is', function() {
		expect(alarm4.state.alarmOn).to.be.true;
	});
});

