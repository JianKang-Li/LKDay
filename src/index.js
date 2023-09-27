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
let date1 = Lday(50,2,1);
let date2 = dayjs('0050-02-01');
date1.set('Y', 2024)
// console.log("dayjs", date2.subtract(2, "M").format());
// console.log("LDay", date1.subtract(2, "M").format());
// console.log("dayjs", date2.toArray());
// console.log("LDay", date1.toArray());
// console.log(date1.dd());
// console.log(date1.isBefore(new Date('2021-10-2')))
// console.log(date2.isBefore('2021-10-2'))
console.log(date1)
console.log(date2)

