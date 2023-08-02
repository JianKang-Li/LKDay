import Lday from "./LDay";
import * as dayjs from "dayjs";
import * as weekOfYear from "dayjs/plugin/weekOfYear";
import * as toArray from "dayjs/plugin/toArray";
import testPlugin from "./testPlugin";
import Plugin2 from "./Plugin2";
dayjs.extend(weekOfYear);
dayjs.extend(toArray);
Lday.extend(testPlugin)
Lday.extend(Plugin2)
// console.log(Lday().dd());
let date1 = Lday("02 Feb 1996 03:04:05 GMT");
let date2 = dayjs("02 Feb 1996 03:04:05 GMT");
// console.log("dayjs", date2.subtract(2, "M").format());
// console.log("LDay", date1.subtract(2, "M").format());
// console.log("dayjs", date2.toArray());
// console.log("LDay", date1.toArray());
// console.log(date1.dd());
// console.log(date1.isBefore(new Date('2021-10-2')))
// console.log(date2.isBefore('2021-10-2'))
console.log(date2.unix())
console.log(Lday.isLDay(date1), Lday.isLDay(date2))

