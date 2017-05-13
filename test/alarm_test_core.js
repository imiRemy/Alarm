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
var alarmDup = AlarmMaker.Alarm('basic');

describe('Alarm is an object:', function() {
	it('Alarm should be an object', function() {
		expect(alarm).to.be.an('object');
	});
});

describe('Two alarms should be different:', function() {
	it('should not be equal', function() {
		expect(alarm).to.not.equal(alarmDup);
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

describe('Alarms should have different property objects:', function() {
	it('should have different handler', function() {
		expect(alarm.handler).to.not.equal(alarmDup.handler);
	});
});

// ---------------------------
// Enable and clear the alarm.
// ---------------------------

alarm.enable();

describe('Alarm can be set:', function() {
	it('set flag', function() {
		expect(alarm.flag.enable).to.be.true;
	});
	it('set state', function() {
		expect(alarm.state.alarmSet).to.be.true;
	});
});

// Make a new alarm to avoid async issues in tests.

var alarm2 = AlarmMaker.Alarm('basic');
alarm2.setTrigger( triggerAlways );
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

// -------------------------------
// Check trigger and state change.
// -------------------------------

function triggerAlways() {
	return (true);
}

function triggerNever() {
	return (false);
}

var alarm2a = AlarmMaker.Alarm('basic');
alarm2a.setTrigger( triggerAlways );
alarm2a.clear();

describe('Alarm trigger function:', function() {
	it('is not null', function() {
		expect(alarm2a.handler.trigger).to.not.be.null;
	});
	it('is set to a known function', function() {
		expect(alarm2a.handler.trigger).to.equal( triggerAlways );
	});
	it('returns true', function() {
		var temp = alarm2a._doTrigger();
		var temp2 = triggerAlways();
		console.log("debug: temp, temp2: ", temp, temp2);
		expect(alarm2a._doTrigger()).to.be.true;
	});
});

// -------------------------------------------
// Set alarm and apply trigger returning true.
// -------------------------------------------

var alarm3 = AlarmMaker.Alarm('basic');
alarm3.setTrigger( triggerAlways );
alarm3.clear();
alarm3.tick();

describe("tick() with AlarmOff and true trigger; alarm state should be 'AlarmOff':", function() {
	it('it is', function() {
		expect(alarm3.state.alarmOff).to.be.true;
	});
});

var alarm4 = AlarmMaker.Alarm('basic');
alarm4.setTrigger( triggerAlways );
alarm4.clear();
alarm4.enable();
alarm4.tick();

describe("tick() with AlarmSet and true trigger, alarm state should be 'AlarmOn':", function() {
	it('it is', function() {
		expect(alarm4.state.alarmOn).to.be.true;
	});
});

// --------------------------------------------
// Set alarm and apply trigger returning false.
// --------------------------------------------

var alarm5 = AlarmMaker.Alarm('basic');
alarm5.setTrigger( triggerNever );
alarm5.clear();
alarm5.tick();

describe("tick() with AlarmOff and false trigger; alarm state should be 'AlarmOff':", function() {
	it('it is', function() {
		expect(alarm5.state.alarmOff).to.be.true;
	});
});

var alarm6 = AlarmMaker.Alarm('basic');
alarm6.setTrigger( triggerNever );
alarm6.clear();
alarm6.enable();
alarm6.tick();

describe("tick() with AlarmSet and false trigger, alarm state should be 'AlarmSet':", function() {
	it('it is', function() {
		expect(alarm6.state.alarmOn).to.be.false;
	});
});

