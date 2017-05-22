module.exports = Alarm;

function Alarm() {
	this.flag = { enable: false, snooze: false, trigger: false, event: false, clear: true }
	this.state = { alarmOff: true, alarmSet: false, alarmOn: false, alarmSnooze: false };
	this.handler = { trigger: null, event: null, snooze: null, autoOff: null };
};

Alarm.prototype.enable = function() {
	this.flag = { enable: true, snooze: false, trigger: false, event: false, clear: false };
	this.state =  { alarmOff: false, alarmSet: true, alarmOn: false, alarmSnooze: false };
}

Alarm.prototype.clear = function() {
	this.flag = { enable: false, snooze: false, trigger: false, event: false, clear: true };
	this.state = { alarmOff: true, alarmSet: false, alarmOn: false, alarmSnooze: false };
}

Alarm.prototype.setTrigger = function( fn ) {
	this.handler.trigger = fn;
}

Alarm.prototype.setEvent = function( fn ) {
	this.handler.event = fn;
}

Alarm.prototype.setSnooze = function( fn ) {
	this.handler.snooze = fn;
}

Alarm.prototype.setAutoOff = function( fn ) {
	this.handler.autoOff = fn;
}

Alarm.prototype._doTrigger = function() {
	if (this.handler.trigger != null)
		return( this.handler.trigger() );
	else
		return( false );
}

//-----------------------------------------------------------------------------------
// _doEvent() returns true for an undefined handler.
// Use this function call to perform some action for the alarmOn state.  Return true
// or false depending on if the alarmOn state should stay active or not.
// In this case, an alarm event stays on until some explicit action resets the alarm.
//-----------------------------------------------------------------------------------

Alarm.prototype._doEvent = function() {
	if (this.handler.event != null)
		return( this.handler.event() );
	else
		return( true );
}

Alarm.prototype._doSnooze = function() {
	if (this.handler.snooze != null)
		return( this.handler.snooze() );
	else
		return( false );
}

Alarm.prototype._doAutoOff = function() {
	if (this.handler.autoOff != null)
		return( this.handler.autoOff() );
	else
		return( false );
}

// State Transitions.
//
// alarmSet    : reached by using this.enable() asynchronously.
//             : reached from alarmSet if flag.trigger is not true and flag.clear is not true.
//             : reached from alarmOn is flag.event is false and flag.clear is not true; i.e. alarm event is over but wish to reset alarm automatically.
//             : reached from alarmSnooze is flag.event is false; i.e. want to reset alarm automatically.
//
// alarmOn     : reached from alarmSet when flag.trigger is true and flag.clear is not true.  Sets flag.event to indicate alarm went off.
//             : reached from alarmOn when flag.snooze is false and flag.event is true and flag.clear is not true.
//             : reached from alarmSnooze when flag.snooze is false and flag.event is true and flag.clear is not true.
//
// alarmSnooze : reached from alarmOn when flag.snooze is true and flag.clear is not true.
//             : reached from alarmSnooze when flag.snooze is true and flag.clear is not true.
//
// alarmOff    : no synchronous transition on tick() to any other state; use this.enable() to go to alarmSet asynchronously.
//             : reached asynchronously from any other state on calling this.clear().
//             : reached synchronously from alarmSet when flag.clear is true.
//             : reached synchronously from alarmOn when flag.clear is true.
//             : reached synchronously from alarmSnooze when flag.clear is true.

Alarm.prototype.tick = function() {
	this.flag.trigger = this._doTrigger();
	this.flag.snooze = this._doSnooze();		// If alarm is on, go to snooze or not; If snoozing, should snooze continue or go back to on state.
	this.flag.clear = this._doAutoOff();		// Function to automatically turn off the alarm.  Has precedence over other transitions.
	
	// alarmOff

	if (this.state.alarmOff) {
		// Do nothing.
	}

	// alarmSet

	else if (this.state.alarmSet) {
		if (this.flag.clear != true) {
			if (this.flag.trigger) {
				this.state = { alarmOff: false, alarmSet: false, alarmOn: true, alarmSnooze: false };
				this.flag.trigger = false;  // Clear trigger event, check again on next tick().
				this.flag.event = true;			// The alarm has been triggered.
			}
			else {
				// No trigger and no clear, just stay at alarmSet.
			}
		}
		else {
			this.clear();		// Resets alarm to 'alarmOff' state.
		}
	}

	// -------------------------
	// alarmOn
	// State change precedence
	//		-- alarmOff
	//		-- alarmSet
	//		-- alarmSnooze
	//		-- alarmOn (no change)
	// -------------------------

	else if (this.state.alarmOn) {
		if (this.flag.clear != true) {
			this.flag.event = this._doEvent();		// After trigger event, use this function to determine if alarm should stay on or go back to 'alarmSet'
			if (this.flag.event == false)
				this.enable();
			else if (this.flag.snooze == true)
				this.state = { alarmOff: false, alarmSet: false, alarmOn: false, alarmSnooze: true };
		}
		else {
			this.clear();
		}
	}

	// alarmSnooze

	else if (this.state.alarmSnooze) {
		if (this.flag.clear != true) {
			if (this.flag.event == false)
				this.enable();
			else if (this.flag.snooze == false)
				this.state = { alarmOff: false, alarmSet: false, alarmOn: true, alarmSnooze: false };
			else if (this.flag.snooze == true) {
				// Stay in snooze mode.
			}
		}
		else {
			this.clear();
		}
	}
}

