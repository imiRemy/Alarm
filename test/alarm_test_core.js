// ================================
// Basic Alarm functionality tests.
// ================================

var chai = require("chai");
var expect = chai.expect;

var Alarm = require("../alarm.js");

// ----------------
// Create an Alarm.
// ----------------

var alarm = new Alarm();
var alarmDup = new Alarm();

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

