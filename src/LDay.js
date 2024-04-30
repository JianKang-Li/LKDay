/**
 * 统计字符串中每个字符出现次数
 * @param {string} text 需要统计的字符串
 * @return {Object} 返回一个对象
*/
function Char_static(text) {
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

/**
* 创建一个Day对象
* @class Day
* 传入参数可为：<br>
* 1. 日期字符串<br>
* 2. 日期数字 年，月，日，时，分，秒<br>
*/
class Day {
  constructor() {
    this.Factory([...arguments])
    this.Months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.$Y = this.date.getFullYear()
    this.$M = this.date.getMonth() + 1
    this.$D = this.date.getDate()
    this.$W = this.date.getDay()
    this.$h = this.date.getHours()
    this.$m = this.date.getMinutes()
    this.$s = this.date.getSeconds()
    this.$t = this.date.getTime()
    this.$L = this.isLeap()
    this.isLdayObj = true
    this.rules = {
      y: 'y',
      year: 'Y',
      M: 'M',
      Month: 'M',
      d: 'd',
      day: 'd',
      h: 'h',
      hour: 'h',
      m: 'm',
      minute: 'm',
      s: 's',
      second: 's',
      ms: 'ms',
      millisecond: 'ms'
    }
  }

  Factory(date) {
    let length = date.length

    if (length === 1) {
      if (date[0].isLdayObj) {
        this.date = date[0].date
        return
      }
      if (Array.isArray(date[0])) {
        date = date[0]
        length = date.length
      }
    }

    if (length >= 3) {
      const Y = date[0].toString().padStart(4, '0')
      const M = date[1].toString().padStart(2, '0')
      const D = date[2].toString().padStart(2, '0')

      if (length === 3) {
        this.date = new Date(`${Y}-${M}-${D}`)
      } else {
        let temp = new Date(`${Y}-${M}-${D}`)
        date[3] && temp.setHours(date[3])
        date[4] && temp.setMinutes(date[4])
        date[5] && temp.setSeconds(date[5])

        this.date = temp
      }
    }
    else if (length === 1) {
      this.date = new Date(date[0])
    }
    else {
      this.date = new Date()
    }
  }

  /**
  * 判断是否是闰年
  * @return {Boolean} 是否是闰年
  *
  */
  isLeap() {
    let flag = (this.$Y % 4 === 0 && this.$Y !== 0) || this.$Y % 400 === 0
    if (flag) {
      this.Months[1] = 29
    }
    return (this.$Y % 4 === 0 && this.$Y !== 0) || this.$Y % 400 === 0
  }

  /**
  * 格式化
  * @param {String} pattern 输入格式化字符串
  * @return {String} 格式化后的字符串时间
  */
  format(pattern = "YYYY-MM-DD") {
    if (!pattern) {
      return `${this.$Y}-${this.$M}-${this.$D}`
    } else {
      let SArray = Char_static(pattern)
      let Tstring = ''
      for (let i of SArray) {
        let key = Object.keys(i)[0]
        let num = i[key]
        switch (key) {
          case 'Y': {
            Tstring += `${this.$Y.toString().padStart(num, "0")}`
            break
          }
          case "M": {
            Tstring += `${this.$M.toString().padStart(num, "0")}`
            break
          }
          case "D": {
            Tstring += `${this.$D.toString().padStart(num, "0")}`
            break
          }
          case "h": {
            Tstring += `${this.$h.toString().padStart(num, "0")}`
            break
          }
          case "m": {
            Tstring += `${this.$m.toString().padStart(num, "0")}`
            break
          }
          case "s": {
            Tstring += `${this.$s.toString().padStart(num, "0")}`
            break
          }
          default: {
            Tstring += `${key.repeat(num)}`
          }
        }
      }
      return Tstring
    }
  }

  /**
  * 是否相同时间
  * @param {Lday} 另一个Lday对象
  * @return {Boolean} 是否相同
  */
  isSame(otherDate) {
    return this.$t - otherDate.$t === 0
  }

  /**
  * 获取是一周第几天
  * @return {Number} 是一周中的第几天
  *
  */
  day() {
    return this.$W === 0 ? 7 : this.$W
  }

  /**
  * 一年内第几天
  * @return {Number} 是一年中的第几天
  *
  */
  dayOfYear() {
    let num = this.$D
    for (let i = 0; i < this.$M - 1; i++) {
      num += this.Months[i]
    }
    if (this.$L) {
      num++
    }
    return num
  }

  /**
  * 一年内第几周
  * @return {Number} 一年内的第几周
  *
  */
  week() {
    const firstDay = new Date(`${this.$Y} 1 1`)
    const diff = this.$t - firstDay.getTime()
    const days = Math.ceil(diff / 86400000)
    return Math.ceil(days / 7) + 1
  }

  /**
  * 获取unix时间戳
  * @return {Number} unix时间戳
  *
  */
  unix() {
    return this.date.valueOf() / 1000
  }

  /**
  * 加
  * @param {Number} num 数量
  * @param {String} key 关键字
  * @return {Lday} 新的Lday对象
  *
  */
  add(key, num) {
    let Y = this.$Y
    let M = this.$M
    let t = this.$t
    let nums
    const keys = ["Y", "y", "year", "M", "month"]
    let flag = keys.includes(key)
    function addT(numT) {
      let res = t + numT
      return res
    }
    switch (this.rules[key]) {
      case "y":
        Y = Y + num
        break
      case "M":
        M = M + num
        if (M > 12) {
          Y = Y + Math.floor(M / 12)
          M = (M % 12)
        } else if (M < 0) {
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
        break
      case "d":
        nums = num * 1000 * 60 * 60 * 24
        break
      case "h":
        nums = num * 1000 * 60 * 60
        break
      case "m":
        nums = num * 1000 * 60
        break
      case "s":
        nums = num * 1000
        break
      case "ms":
        break
    }

    let para = flag
      ? [Y, M, this.$D, this.$h, this.$m, this.$s]
      : addT(nums)

    return new Day(para)
  }

  /**
  * 减
  * @param {Number} num 数量
  * @param {String} key 关键字
  * @return {Lday} 新的Lday对象
  *
  */
  subtract(key, num) {
    return this.add(key, num * -1)
  }

  /**
  * 获取本月天数
  * @return {Number} 本月的天数
  *
  */
  daysInMonth() {
    return this.Months[this.$M - 1]
  }

  /**
  * 获取数据
  * @param {String} id 关键字
  * @return {number} 新的Lday对象数据
  *
  */
  get(id) {
    let key = id || ""
    const date = {
      y: this.$Y,
      year: this.$Y,
      M: this.$M,
      month: this.$M,
      d: this.$D,
      date: this.$D,
      h: this.$h,
      hour: this.$h,
      m: this.$m,
      minute: this.$m,
      s: this.$s,
      second: this.$s,
      ms: this.$t,
      millisecond: this.$t,
      W: this.$W,
      day: this.$W
    }

    return date[key]
  }

  /**
  * 设置数据
  * @param {String} key 关键字
  * @param {Number| String} num 设置的值
  *
  */
  set(key, num) {
    switch (key) {
      case 'Y': {
        this.$Y = num
        this.date.setFullYear(num)
        break
      }
      case 'M': {
        this.$M = num
        this.date.setMonth(num - 1)
        break
      }
      case 'D': {
        this.$D = num
        this.date.setDate(num)
        break
      }
      case 'h': {
        this.$h = num
        this.date.setHours(num)
        break
      }
      case 'm': {
        this.$m = num
        this.date.setMinutes(num)
        break
      }
      case 's': {
        this.$s = num
        this.date.setSeconds(num)
        break
      }
    }
  }

  /**
  * 格式转换
  * @return {Array} 年 月 日 时 分 秒 星期几(从0开始)组成的数组
  *
  */
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
    ]
  }

  /**
  * 是否为前面的时间
  * @param {String|Date} date 比较时间点
  * @return {Boolean} 比较结果
  */
  isBefore(date) {
    return this.$t < (new Day(date)).$t
  }

  /**
  * 是否为后面的时间
  * @param {String|Date} date 比较时间点
  * @return {Boolean} 比较结果
  */
  isAfter(date) {
    return this.$t > (new Day(date)).$t
  }

  /**
  * 克隆新对象
  * @return {Day} 返回新的Day对象
  *
  */
  clone() {
    return new Day(this.$Y, this.$M, this.$D, this.$h, this.$m, this.$s)
  }

  /**
  * 获取当前时间时区
  * @return {number} 返回时区小时数
  **/
  getTimeZone() {
    return this.date.getTimezoneOffset() / 60
  }

  /**
  * 获取时间差
  * @return {number} 返回时间差值
  **/
  diff(date, key) {
    const diffMs = this.$t - (new Day(date)).$t
    const transform = {
      d: 1000 * 60 * 60 * 24,
      m: 1000 * 60,
      s: 1000,
      ms: 1
    }
    const format = transform[this.rules[key]] || transform['s']

    return diffMs / format
  }
}


const oldPro = Day.prototype

function Lday() {
  return new Day(...arguments)
}

Lday.extend = (plugin, option) => {
  plugin(Lday, oldPro, option)
}

// 原型方法
/**
* @param {Number} num 时间戳
* @return {Day} LDay对象
*/
Lday.unix = (num) => {
  return new Day(num)
}

/**
* @param {Any} obj 判断参数
* @return {Boolean} 是否是LDay对象
*/
Lday.isLDay = (obj) => {
  return !!obj.isLdayObj
}


/* 构造函数 */
export default Lday
