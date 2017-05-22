// ====================================
// Basic Alarm State tests: alarmSnooze
// ====================================

var chai = require("chai");
var expect = chai.expect;

var Alarm = require("../alarm.js");

var alarm1 = new Alarm();
var alarm2 = new Alarm();

function triggerAlways() { return (true); }
function triggerNever() { return (false); }

// -------------------------
// Enable alarmSnooze state.
// -------------------------

alarm1.clear();
alarm1.enable();
alarm1.setTrigger( triggerAlways );
alarm1.tick();												// Should now be in 'alarmOn'
alarm1.setSnooze( triggerAlways );
alarm1.tick();												// Should now be in 'alarmSnooze'

describe('Alarm set to alarmSnooze state:', function() {
	it('alarmSnooze is true', function() {
		expect(alarm1.state.alarmSnooze).to.be.true;
	});
});

// ---------------------------
// Stays in alarmSnooze state.
// ---------------------------

alarm2.clear();
alarm2.enable();
alarm2.setTrigger( triggerAlways );
alarm2.tick();												// Should now be in 'alarmOn'
alarm2.setSnooze( triggerAlways );
alarm2.tick();												// Should now be in 'alarmSnooze'

describe('Alarm stays in alarmSnooze state:', function() {
	alarm2.tick();
	it('snooze function is set and clear is false', function() {
		expect(alarm2.state.alarmSnooze).to.be.true;
	});
});

// ------------------------------
// Transitions to alarmOff state.
// ------------------------------

var alarm3 = new Alarm();

alarm3.clear();
alarm3.enable();
alarm3.setTrigger( triggerAlways );
alarm3.tick();												// Should now be in 'alarmOn'
alarm3.setSnooze( triggerAlways );
alarm3.tick();												// Should now be in 'alarmSnooze'

describe('Alarm transitions from alarmSnooze to alarmOff state:', function() {
	alarm3.setAutoOff( triggerAlways );
	alarm3.tick();
	it('alarmOff is true', function() {
		expect(alarm3.state.alarmOff).to.be.true;
	});
});

// -----------------------------
// Transitions to alarmOn state.
// -----------------------------

var alarm4 = new Alarm();

alarm4.clear();
alarm4.enable();
alarm4.setTrigger( triggerAlways );
alarm4.tick();												// Should now be in 'alarmOn'
alarm4.setSnooze( triggerAlways );
alarm4.tick();												// Should now be in 'alarmSnooze'

describe('Alarm transitions from alarmSnooze to alarmOn state:', function() {
	alarm4.setSnooze( triggerNever );
	alarm4.tick();
	it('alarmOn is true', function() {
		expect(alarm4.state.alarmOn).to.be.true;
	});
});

// ------------------------------
// Transitions to alarmSet state.
// ------------------------------

var alarm5 = new Alarm();

alarm5.clear();
alarm5.enable();
alarm5.setTrigger( triggerAlways );
alarm5.tick();												// Should now be in 'alarmOn'
alarm5.setSnooze( triggerAlways );
alarm5.tick();												// Should now be in 'alarmSnooze'

describe('Alarm transitions from alarmSnooze to alarmSet state:', function() {
	alarm5.setEvent( triggerNever );
	alarm5.tick();
	it('alarmSet is true', function() {
		expect(alarm5.state.alarmSet).to.be.true;
	});
});

