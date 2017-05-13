
//const AlarmMaker = {
exports.AlarmMaker = {
	Alarm (opts) {
		return( Object.create(this.bundle[opts]) );
	},

	bundle: {
		basic: {
			flag: { enable: false, snooze: false, trigger: false, event: false, clear: true },
			state: { alarmOff: true, alarmSet: false, alarmOn: false, alarmSnooze: false },
			handler:	{ trigger: null },
			enable () { this.flag = { enable: true, snooze: false, trigger: false, event: false, clear: false };
									this.state =  { alarmOff: false, alarmSet: true, alarmOn: false, alarmSnooze: false };
								},
			clear () 	{ this.flag = { enable: false, snooze: false, trigger: false, event: false, clear: true };
									this.state = { alarmOff: true, alarmSet: false, alarmOn: false, alarmSnooze: false };
								},
			setTrigger (fn) { this.handler.trigger = fn; },
			_doTrigger ()		{ return (this.handler.trigger()); },
			tick ()		{
									this.flag.trigger = this._doTrigger();
									if (this.state.alarmOff) {
										this.clear();
									}
									else if ((this.state.alarmSet) && (this.flag.trigger)) {
										this.state = { alarmOff: false, alarmSet: false, alarmOn: true, alarmSnooze: false }
										this.flag.trigger = false;  // Clear trigger event.
									} 
									else if (this.state.alarmOn) {
									} 
									else if (this.state.alarmSnooze) {
									}
								},
//			doTriggerFn: null,
//			doEventFn: null,
//			setEvent (fn) { this.doEventFn = fn; },
//			doEvent () { if (this.doEventFn != null) { this.doEventFn(); this.flag.event = true } },
//			set ()   { this.flag.set = true; this.flag.snooze = false; this.flag.event = false; this.flag.clear = false },
//			clearX () { this.flag.set = false; this.flag.snooze = false; this.flag.trigger = false; this.flag.event = false; this.flag.clear = true },
			nextTick () {
				if (this.doTrigger() == true) {
					if (this.flag.set == true) {
						if (this.flag.snooze == false)
							console.log("Alarm goes off.");
					}
				}
			}, // check alarm conditions: trigger, alarm over, etc.
		},
		premium: {
			x: 4,
			flag: false,
			setFn: null,
			clearFlag () { this.flag = false; console.log("premium flag set to false"); },
			setFlag () { this.flag = true; console.log("set premium alarm"); },
			extSetFlag (fn) { this.flag = fn(); },
			regSetFlagFn (fn) { this.setFn = fn; },
			setFlagFn () { this.flag = this.setFn() },
			getX () { return this.x; },
			getFlag () { return this.flag; }
		}
	}
};

/*
var foo = function () { console.log("calling foo"); return true; };
var boo = foo;
function goo() { console.log("Boo!"); return true; };

const alarm = AlarmMaker.Alarm('basic');
alarm.clear();
alarm.set();
alarm.setTrigger( foo );
alarm.setEvent( goo );
alarm.nextTick();


var alarm2 = AlarmMaker.Alarm('basic');
//alarm2.set();
//console.log( alarm2.getX(), alarm2.getFlag() );

var alarm3 = AlarmMaker.Alarm('premium');
console.log( "alarm3: " + alarm3.getFlag() );
alarm3.regSetFlagFn( boo );
alarm3.setFlagFn();
console.log( "alarm3: " + alarm3.getFlag() );
alarm3.clearFlag();
alarm3.extSetFlag( foo );
console.log( "alarm3: " + alarm3.getFlag() );
*/


