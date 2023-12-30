/**
* 月份缩写 jan feb mar apr may jun jul aug sep oct nov dec
* 星期缩写 mon tue wed thu fri sat sun
*/
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
let date1 = Lday(2024, 12, 1, 8, 20, 1);
let date2 = dayjs('0050-02-01');
console.log(date1)
let date3 = date1.clone()
console.log(date1.getTimeZone())