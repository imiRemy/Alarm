
var Alarm = require("./alarm.js");

var foo = function () { console.log("calling foo"); return true; };
var boo = foo;
function goo() { console.log("Boo!"); return true; };

const alarm = new Alarm();
alarm.clear();
alarm.enable();
alarm.setTrigger( foo );
alarm.setEvent( goo );
alarm.tick();


var alarm2 = new Alarm();
//alarm2.set();
//console.log( alarm2.getX(), alarm2.getFlag() );

var alarm3 = new Alarm();

