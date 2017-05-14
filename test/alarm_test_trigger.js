// ==========================
// Basic Alarm Trigger tests.
// ==========================

var chai = require("chai");
var expect = chai.expect;

var Alarm = require("../alarm.js");

// -------------------------------
// Check trigger and state change.
// -------------------------------

function triggerAlways() {
	return (true);
}

function triggerNever() {
	return (false);
}

var alarm2a = new Alarm();
alarm2a.setTrigger( triggerAlways );
alarm2a.clear();

describe('Alarm cleared and trigger function with triggerAlways:', function() {
	it('is not null', function() {
		expect(alarm2a.handler.trigger).to.not.be.null;
	});
	it('is set to a known function', function() {
		expect(alarm2a.handler.trigger).to.equal( triggerAlways );
	});
	it('returns true', function() {
		expect(alarm2a._doTrigger()).to.be.true;
	});
});

var alarm2b = new Alarm();
alarm2b.setTrigger( triggerNever );
alarm2b.clear();

describe('Alarm cleared and trigger function with triggerNever:', function() {
	it('is not null', function() {
		expect(alarm2b.handler.trigger).to.not.be.null;
	});
	it('is set to a known function', function() {
		expect(alarm2b.handler.trigger).to.equal( triggerNever );
	});
	it('returns false', function() {
		expect(alarm2b._doTrigger()).to.be.false;
	});
});

// -------------------------------------------
// Set alarm and apply trigger returning true.
// -------------------------------------------

var alarm3 = new Alarm();
alarm3.setTrigger( triggerAlways );
alarm3.clear();
alarm3.tick();

describe("tick() with AlarmOff and true trigger:", function() {
	it("alarm state should be 'AlarmOff'", function() {
		expect(alarm3.state.alarmOff).to.be.true;
	});
});

var alarm4 = new Alarm();
alarm4.setTrigger( triggerAlways );
alarm4.clear();
alarm4.enable();
alarm4.tick();

describe("tick() with AlarmSet and true trigger:", function() {
	it("alarm state should be 'AlarmOn'", function() {
		expect(alarm4.state.alarmOn).to.be.true;
	});
});

// --------------------------------------------
// Set alarm and apply trigger returning false.
// --------------------------------------------

var alarm5 = new Alarm();
alarm5.setTrigger( triggerNever );
alarm5.clear();
alarm5.tick();

describe('tick() with AlarmOff and false trigger :', function() {
	it("alarm state should be 'AlarmOff'", function() {
		expect(alarm5.state.alarmOff).to.be.true;
	});
});

var alarm6 = new Alarm();
alarm6.setTrigger( triggerNever );
alarm6.clear();
alarm6.enable();
alarm6.tick();

describe('tick() with AlarmSet and false trigger:', function() {
	it("alarm state should be 'AlarmSet'", function() {
		expect(alarm6.state.alarmSet).to.be.true;
	});
});

