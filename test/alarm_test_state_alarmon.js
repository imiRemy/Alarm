// ================================
// Basic Alarm State tests: alarmOn
// ================================

var chai = require("chai");
var expect = chai.expect;

var Alarm = require("../alarm.js");

var alarm1 = new Alarm();
var alarm2 = new Alarm();

function triggerAlways() { return (true); }
function triggerNever() { return (false); }

// ---------------------
// Enable alarmOn state.
// ---------------------

alarm1.clear();
alarm1.enable();
alarm1.setTrigger( triggerAlways );
alarm1.tick();

describe('Alarm set to alarmOn state:', function() {
	it('alarmOn is true', function() {
		expect(alarm1.state.alarmOn).to.be.true;
	});
});

// -----------------------
// Stays in alarmOn state.
// -----------------------

alarm2.clear();
alarm2.enable();
alarm2.setTrigger( triggerAlways );
alarm2.tick();

describe('Alarm stays in alarmOn state:', function() {
	alarm2.tick();
	it('trigger function is set and clear is false', function() {
		expect(alarm2.state.alarmOn).to.be.true;
	});
});

// ------------------------------
// Transitions to alarmOff state.
// ------------------------------

var alarm3 = new Alarm();

alarm3.clear();
alarm3.enable();
alarm3.setTrigger( triggerAlways );

describe('Alarm transitions from alarmOn to alarmOff state:', function() {
	alarm3.tick();
	alarm3.setAutoOff( triggerAlways );
	alarm3.tick();
	it('alarmOff is true', function() {
		expect(alarm3.state.alarmOff).to.be.true;
	});
});

// ---------------------------------
// Transitions to alarmSnooze state.
// ---------------------------------

var alarm4 = new Alarm();

alarm4.clear();
alarm4.enable();
alarm4.setTrigger( triggerAlways );
alarm4.tick();

describe('Alarm transitions from alarmOn to alarmSnooze state:', function() {
	alarm4.setSnooze( triggerAlways );
	alarm4.tick();
	it('alarmSnooze is true', function() {
		expect(alarm4.state.alarmSnooze).to.be.true;
	});
});

// ------------------------------
// Transitions to alarmSet state.
// ------------------------------

var alarm5 = new Alarm();

alarm5.clear();
alarm5.enable();
alarm5.setTrigger( triggerAlways );
alarm5.tick();

describe('Alarm transitions from alarmOn to alarmSet state:', function() {
	alarm5.setEvent( triggerNever );
	alarm5.tick();
	it('alarmSet is true', function() {
		expect(alarm5.state.alarmSet).to.be.true;
	});
});

