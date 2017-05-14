// ===================================
// Basic Alarm Enable and Clear tests.
// ===================================

var chai = require("chai");
var expect = chai.expect;

var Alarm = require("../alarm.js");

// -----------------
// Enable the alarm.
// -----------------

var alarm = new Alarm();
alarm.enable();

describe('Alarm can be enabled:', function() {
	it('flag.enable is true', function() {
		expect(alarm.flag.enable).to.be.true;
	});
	it('flag.snooze is false', function() {
		expect(alarm.flag.snooze).to.be.false;
	});
	it('flag.trigger is false', function() {
		expect(alarm.flag.trigger).to.be.false;
	});
	it('flag.event is false', function() {
		expect(alarm.flag.event).to.be.false;
	});
	it('flag.clear is false', function() {
		expect(alarm.flag.clear).to.be.false;
	});
	it('state.alarmOff is true', function() {
		expect(alarm.state.alarmOff).to.be.false;
	});
	it('state.alarmSet is true', function() {
		expect(alarm.state.alarmSet).to.be.true;
	});
	it('state.alarmOn is true', function() {
		expect(alarm.state.alarmOn).to.be.false;
	});
	it('state.alarmSnooze is true', function() {
		expect(alarm.state.alarmSnooze).to.be.false;
	});
});

// ----------------
// Clear the alarm.
// ----------------

// Make a new alarm to avoid async issues in tests.

var alarm2 = new Alarm();
alarm2.enable();
alarm2.clear();

describe('Alarm can be cleared:', function() {
	it('flag.enable is false', function() {
		expect(alarm2.flag.enable).to.be.false;
	});
	it('flag.snooze is false', function() {
		expect(alarm2.flag.snooze).to.be.false;
	});
	it('flag.trigger is false', function() {
		expect(alarm2.flag.trigger).to.be.false;
	});
	it('flag.event is false', function() {
		expect(alarm2.flag.event).to.be.false;
	});
	it('flag.clear is true', function() {
		expect(alarm2.flag.clear).to.be.true;
	});
	it('state.alarmOff is true', function() {
		expect(alarm2.state.alarmOff).to.be.true;
	});
	it('state.alarmSet is true', function() {
		expect(alarm2.state.alarmSet).to.be.false;
	});
	it('state.alarmOn is true', function() {
		expect(alarm2.state.alarmOn).to.be.false;
	});
	it('state.alarmSnooze is true', function() {
		expect(alarm2.state.alarmSnooze).to.be.false;
	});
});

