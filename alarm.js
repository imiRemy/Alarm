
const AlarmMaker = {
	Alarm (bundle) {
		return Object.create(this.bundle[bundle]);
	},

	bundle: {
		basic: {
			flag: { set: false, snooze: false, trigger: false, event: false, clear: true },
			doTriggerFn: null,
			doEventFn: null,
			setEvent (fn) { this.doEventFn = fn; },
			doEvent () { if (this.doEventFn != null) { this.doEventFn(); this.flag.event = true } },
			set ()   { this.flag.set = true; this.flag.snooze = false; this.flag.event = false; this.flag.clear = false },
			clear () { this.flag.set = false; this.flag.snooze = false; this.flag.trigger = false; this.flag.event = false; this.flag.clear = true },
			setTrigger (fn) { this.triggerFn = fn; },
			doTrigger () { if (this.triggerFn != null) { this.triggerFn(); this.flag.trigger = true; return true } return false },
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

