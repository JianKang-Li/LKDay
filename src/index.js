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
let date1 = Lday("2022-1-19  8:22:01");
let date2 = dayjs();
// console.log("dayjs", date2.subtract(2, "M").format());
// console.log("LDay", date1.subtract(2, "M").format());
// console.log("dayjs", date2.toArray());
// console.log("LDay", date1.toArray());
// console.log(date1.dd());
console.log(date1.format('YYYY-M-DD hh:m:ss'))



