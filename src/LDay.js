/**
* param:String
* return:{"key":num}
**/
function Char_stati(text) {
    let SArray = new Array()
    for (let i = 0; i < text.length; i++) {
        let obj = {}
        obj[text[i]] = 1
        let k = 1
        while (i < text.length && text[i + 1] === text[i]) {
            k++
            i++
        }
        obj[text[i]] = k
        SArray.push(obj)
    }
    return SArray
}

class Day {

    constructor(date) {
        this.date = date ? new Date(date) : new Date();
        this.Months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.$Y = this.date.getFullYear();
        this.$M = this.date.getMonth() + 1;
        this.$D = this.date.getDate();
        this.$W = this.date.getDay();
        this.$h = this.date.getHours();
        this.$m = this.date.getMinutes();
        this.$s = this.date.getSeconds();
        this.$t = this.date.getTime();
        this.$L = this.isLeap();
    }

    /* 判断是否是闰年 */
    isLeap() {
        let flag = (this.$Y % 4 === 0 && this.$Y !== 0) || this.$Y % 400 === 0;
        if (flag) {
            this.Months[1] = 29;
        }
        return (this.$Y % 4 === 0 && this.$Y !== 0) || this.$Y % 400 === 0;
    }

    /* 格式化 */
    format(pattern = "YYYY-MM-DD") {
        // switch (pattern) {
        //     case "YYYY-MM-DD":
        //         return `${this.$Y.toString().padStart(4, "0")}-${this.$M
        //             .toString()
        //             .padStart(2, "0")}-${this.$D.toString().padStart(2, "0")}`;

        //     default: {
        //         return `${this.$Y}-${this.$M}-${this.$D}`;
        //     }
        // }
        if (!pattern) {
            return `${this.$Y}-${this.$M}-${this.$D}`;
        } else {
            let SArray = Char_stati(pattern)
            let Tstring = ''
            for (let i of SArray) {
                let key = Object.keys(i)[0]
                let num = i[key]
                switch (key) {
                    case 'Y': {
                        Tstring += `${this.$Y.toString().padStart(num, "0")}`
                        break;
                    }
                    case "M": {
                        Tstring += `${this.$M.toString().padStart(num, "0")}`
                        break;
                    }
                    case "D": {
                        Tstring += `${this.$D.toString().padStart(num, "0")}`
                        break;
                    }
                    case "h": {
                        Tstring += `${this.$h.toString().padStart(num, "0")}`
                        break;
                    }
                    case "m": {
                        Tstring += `${this.$m.toString().padStart(num, "0")}`
                        break;
                    }
                    case "s": {
                        Tstring += `${this.$s.toString().padStart(num, "0")}`
                        break;
                    }
                    default: {
                        Tstring += `${key.repeat(num)}`
                    }
                }
            }
            return Tstring
        }
    }

    /* 是否相同时间 */
    isSame(otherDate) {
        return this.$t - otherDate.$t === 0;
    }

    /* 获取是一周第几天 */
    day() {
        return this.$W === 0 ? 7 : this.$W;
    }

    /* 一年内第几天 */
    dayOfYear() {
        let num = this.$D;
        for (let i = 0; i < this.$M - 1; i++) {
            num += this.Months[i];
        }
        if (this.$L) {
            num++;
        }
        return num;
    }

    /* 一年内第几周 */
    week() {
        const firstday = new Date(`${this.$Y} 1 1`);
        const diff = this.$t - firstday.getTime();
        const days = Math.ceil(diff / 86400000);
        return Math.ceil(days / 7) + 1;
    }

    /* 加 */
    add(num, key) {
        let Y = this.$Y;
        let M = this.$M;
        let t = this.$t;
        let nums;
        const keys = ["y", "year", "M", "month"];
        let flag = keys.includes(key);
        function addT(numT) {
            let res = t + numT;
            return res;
        }
        switch (key) {
            case "y":
            case "year":
                Y = Y + num;
                break;
            case "M":
            case "month":
                M = M - 1 + num;
                if (M > 12) {
                    Y = Y + Math.floor(M / 12);
                    M = (M % 12) + 1;
                }
                break;
            case "d":
            case "date":
                nums = num * 1000 * 60 * 60 * 24;
                break;
            case "h":
            case "hour":
                nums = num * 1000 * 60 * 60;
                break;
            case "m":
            case "minute":
                nums = num * 1000 * 60;
                break;
            case "s":
            case "second":
                nums = num * 1000;
                break;
            case "ms":
            case "millisecond":
                break;
        }
        let para = flag
            ? `${Y} ${M} ${this.$D} ${this.$h}:${this.$m}:${this.$s}`
            : addT(nums);

        return new Day(para);
    }

    /* 减 */
    subtract(num, key) {
        let Y = this.$Y;
        let M = this.$M;
        let t = this.$t;
        let nums;
        const keys = ["y", "year", "M", "month"];
        let flag = keys.includes(key);
        function subT(num) {
            let res = t - num;
            return res;
        }
        switch (key) {
            case "y":
            case "year":
                Y = Y - num;
                break;
            case "M":
            case "month":
                M = M - num;
                if (M < 0) {
                    let n = Math.floor(M / 12);
                    Y = Y + n;
                    M = Math.abs(n) * 12 + M;
                    if (M === 0) {
                        Y = Y - 1;
                        M = 12;
                    }
                } else if (M === 0) {
                    Y = Y - 1;
                    M = 12;
                }
                break;
            case "d":
            case "date":
                nums = num * 1000 * 60 * 60 * 24;
                break;
            case "h":
            case "hour":
                nums = num * 1000 * 60 * 60;
                break;
            case "m":
            case "minute":
                nums = num * 1000 * 60;
                break;
            case "s":
            case "second":
                nums = num * 1000;
                break;
            case "ms":
            case "millisecond":
                break;
        }
        let para = flag
            ? `${Y} ${M} ${this.$D} ${this.$h}:${this.$m}:${this.$s}`
            : subT(nums);

        return new Day(para);
    }

    /* 获取本月天数 */
    daysInMonth() {
        return this.Months[this.$M - 1];
    }

    /* 获取数据 */
    get(id) {
        let key = id || "";
        switch (key) {
            case "y":
            case "year":
                return this.$Y;
            case "M":
            case "month":
                return this.$M;
            case "d":
            case "date":
                return this.$D;
            case "h":
            case "hour":
                return this.$h;
            case "m":
            case "minute":
                return this.$m;
            case "s":
            case "second":
                return this.$s;
            case "ms":
            case "millisecond":
                return this.$t;
            case "w":
            case "day":
                return this.$W;
            default:
                return this[key];
        }
    }

    /* 格式转换 */
    toArray() {
        // 年 月 日 时 分 秒 星期几(从0开始)
        return [
            this.$Y,
            this.$M,
            this.$D,
            this.$h,
            this.$m,
            this.$s,
            this.$W === 0 ? 7 : this.$W,
        ];
    }
}


const oldPro = Day.prototype

function Lday(date) {
    return new Day(date);
}

Lday.extend = (plugin, option) => {
    plugin(Lday, oldPro, option)
}


/* 构造函数 */
export default Lday
