// =================================
// Basic Alarm State tests: alarmSet
// =================================

var chai = require("chai");
var expect = chai.expect;

var Alarm = require("../alarm.js");

var alarm1 = new Alarm();
var alarm2 = new Alarm();

function triggerAlways() { return (true); }
function triggerNever() { return (false); }

// ----------------------
// Enable alarmSet state.
// ----------------------

alarm1.clear();
alarm1.enable();

alarm2.clear();
alarm2.enable();
alarm2.setTrigger( triggerNever );

describe('Alarm set to alarmSet state:', function() {
	it('alarmSet is true', function() {
		expect(alarm1.state.alarmSet).to.be.true;
	});
});

// ------------------------
// Stays in alarmSet state.
// ------------------------

describe('Alarm stays in alarmSet state:', function() {
	alarm1.tick();
	alarm2.tick();
	it('trigger function is not set and clear is false', function() {
		expect(alarm1.state.alarmSet).to.be.true;
	});
	it('trigger function returns false and clear is false', function() {
		expect(alarm2.state.alarmSet).to.be.true;
	});
});

// -----------------------------
// Transitions to alarmOn state.
// -----------------------------

var alarm3 = new Alarm();

alarm3.clear();
alarm3.enable();
alarm3.setTrigger( triggerAlways );

describe('Alarm transitions from alarmSet to alarmOn state:', function() {
	alarm3.tick();
	it('alarmOn is true', function() {
		expect(alarm3.state.alarmOn).to.be.true;
	});
});

// ------------------------------
// Transitions to alarmOff state.
// ------------------------------

var alarm4 = new Alarm();

alarm4.clear();
alarm4.enable()
alarm4.setAutoOff( triggerAlways );

describe('Alarm transitions from alarmSet to alarmOff state when clear is set and no trigger:', function() {
	alarm4.tick();
	it('state is alarmOff', function() {
		expect(alarm4.state.alarmOff).to.be.true;
	});
});

var alarm5 = new Alarm();

alarm5.clear();
alarm5.enable()
alarm5.setTrigger( triggerAlways );
alarm5.setAutoOff( triggerAlways );

describe('Alarm transitions from alarmSet to alarmOff state when clear is set and trigger is set:', function() {
	alarm5.tick();
	it('state is alarmOff', function() {
		expect(alarm5.state.alarmOff).to.be.true;
	});
});
