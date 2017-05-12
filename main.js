
var AlarmMaker = require("./alarm.js").AlarmMaker;

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
