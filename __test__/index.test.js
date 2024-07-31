import Lday from "../src/LDay"
import { expect, test } from '@jest/globals'
import dayjs from "dayjs"
import dayOfYear from 'dayjs/plugin/dayOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import "dayjs/locale/zh-cn"
import updateLocale from "dayjs/plugin/updateLocale"
import localeData from "dayjs/plugin/localeData"
import isLeapYear from "dayjs/plugin/isLeapYear"
import toArray from "dayjs/plugin/toArray"

dayjs.extend(updateLocale)
dayjs.extend(localeData)
dayjs.locale("zh-cn")
dayjs.updateLocale("zh-cn", {
  weekStart: 1
})
dayjs.extend(dayOfYear)
dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)
dayjs.extend(toArray)

const day = Lday('2024-10-1 01:00:00')
const day1 = dayjs('2024-10-1 01:00:00')

test('是否是闰年', () => {
  const map = [
    "2024-10-1",
    "2008-10-1",
    "2002-10-1"
  ]

  for (const key of map) {
    const day = Lday(key)

    expect(day.isLeap()).toBe(dayjs(key).isLeapYear())
  }
})

test('格式化', () => {
  const map = [
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-MM-DD",
    "YYYY-DD-MM",
    "HH:mm:ss",
  ]

  for (const key of map) {
    expect(day.format(key)).toBe(day1.format(key))
  }
})

test('是否相同时间', () => {
  const test1 = Lday('2024-10-1 00:00:00')
  const test2 = Lday('2024-10-1 00:00:02')
  const test3 = Lday('2024-10-1 00:00:01')

  expect(test1.isSame(test2)).toBe(false)
  expect(test2.isSame(test3)).toBe(false)
  expect(test1.isSame(test1)).toBe(true)
})

test('周几', () => {
  const map = {
    "2024-10-1": 2,
    "2024-11-1": 5,
    "2024-12-1": 7,
    "2023-3-1": 3
  }

  for (const key in map) {
    const day = Lday(key)

    expect(day.day()).toBe(map[key])
  }
})

test('一年内第几天', () => {
  const map = [
    "2024-10-1",
    "2024-11-1",
    "2024-12-1",
    "2023-3-1"
  ]

  for (const day of map) {
    expect(Lday(day).dayOfYear()).toBe(dayjs(day).dayOfYear())
  }
})

test('一年中的第几周',()=> {
  const map = [
    "2024-10-1",
    "2024-11-1",
    "2024-12-1",
    "2023-3-1",
    "2019-10-21",
    "2019-1-1"
  ]

  for (const day of map) {
    expect(Lday(day).week()).toBe(dayjs(day).week())
  }

})

test('unix 时间戳', () => {
  const map = [
    "2023-1-1",
    "2024-1-1",
    "2024-10-1",
    '1980-10-1'
  ]

  for (const day of map) {
    expect(Lday(day).unix()).toBe(dayjs(day).unix())
  }
})

test('加', () => {
  const map = {
    "2023-01-01 00:00:00": ['M', 2],
    "2024-01-01 00:00:00": ['d', 3],
    "2024-01-01 00:00:00": ['h', 3],
    "1980-01-01 00:00:00": ['m', 100],
    "2001-01-01 00:00:00": ['M', 11],
    "2004-01-01 00:00:00": ['M', 13],
    "1890-02-01 00:00:00": ['d', 28],
    "2048-02-01 00:00:00": ['s', 63],
    "2024-02-01 00:00:00": ['y', 63],
  }

  for (const day in map) {
    const result = map[day]
    const testReg = Lday(day).add(result[0], result[1]).format('YYYY-MM-DD HH:mm:ss')
    const testReg1 = dayjs(day).add(result[1], result[0]).format('YYYY-MM-DD HH:mm:ss')

    expect(testReg).toBe(testReg1)
  }
})

test('减', () => {
  const map = {
    "2023-01-01 00:00:00": ['M', 2],
    "2024-01-01 00:00:00": ['d', 3],
    "2024-01-01 00:00:00": ['h', 3],
    "1980-01-01 00:00:00": ['m', 100],
    "2001-01-01 00:00:00": ['M', 11],
    "2004-01-01 00:00:00": ['M', 13],
    "1890-02-01 00:00:00": ['d', 28],
    "2048-02-01 00:00:00": ['s', 63],
    "2024-02-01 00:00:00": ['y', 63],
  }

  for (const day in map) {
    const result = map[day]
    const testReg = Lday(day).subtract(result[0], result[1]).format('YYYY-MM-DD HH:mm:ss')
    const testReg1 = dayjs(day).subtract(result[1], result[0]).format('YYYY-MM-DD HH:mm:ss')

    expect(testReg).toBe(testReg1)
  }
})

test('获取月份天数', () => {
  const map = [
    "2023-2-1",
    "2024-2-1",
    "2024-10-1",
    '1980-10-1',
    '2001-6-1'
  ]

  for (const day of map) {
    expect(Lday(day).daysInMonth()).toBe(dayjs(day).daysInMonth())
  }
})

test('获取原始数据', () => {
  const map = {
    "2023-2-1 00:00:00": ['y', 2023],
    "2024-2-1": ['M', 1],
    "2024-1-1": ['M', 0],
    "2024-10-1 8:10:00": ['h', 8],
    '1980-10-1 8:10:00': ['m', 10],
    '2001-6-1': ['d', 1],
    '2001-6-1 15:30:01': ['s', 1]
  }

  for (const day in map) {
    const key = map[day][0]
    const result = map[day][1]

    expect(Lday(day).get(key)).toBe(result)
  }
})

test('设置原始数据', () => {
  const map = {
    "2024-2-29 00:00:00": ['y', 2023, 2023],
    "2023-1-29": ['M', 2, 2], // 非闰年会转为 3.1
    "2024-1-29": ['M', 2, 1],
    "2024-10-1 8:10:00": ['h', 10, 10],
    '1980-10-1 8:10:00': ['m', 12, 12],
    '2001-6-1': ['d', 2, 2],
    '2001-6-1 15:30:01': ['s', 10, 10]
  }

  for (const day in map) {
    const key = map[day][0]
    const value = map[day][1]
    const result = map[day][2]
    const testObj = Lday(day)

    testObj.set(key, value)
    expect(testObj.get(key)).toBe(result)
  }
})

test('转数组', () => {
  const map = [
    "2023-2-1",
    "2024-2-1",
    "2024-10-1",
    '1980-10-1',
    '2001-6-1'
  ]

  for (const day of map) {
    expect(Lday(day).toArray().slice(0, -1)).toStrictEqual(dayjs(day).toArray())
  }
})

test('是否为前面的时间', () => {
  const map = [
    "2023-2-1",
    "2024-2-1",
    "2024-10-1",
    '1980-10-1',
    '2001-6-1'
  ]

  for (const day of map) {
    const time = new Date()
    expect(Lday(day).isBefore(time)).toBe(dayjs(day).isBefore(time))
  }
})

test('是否为后面的时间', () => {
  const map = [
    "2023-2-1",
    "2024-2-1",
    "2024-10-1",
    '1980-10-1',
    '2001-6-1',
  ]
  const afterDays = [1, 2, 3, 4, 5].map(x => {
    return dayjs().add('y', x).format('YYYY-MM-DD HH:mm:ss')
  })

  for (const day of map.concat(afterDays)) {
    const time = new Date()
    expect(Lday(day).isAfter(time)).toBe(dayjs(day).isAfter(time))
  }
})

test('相差时间', () => {
  const map = [
    ["2023-2-1", 'd'],
    ["2024-2-1", 'h'],
    ["2024-10-1", 'm'],
    ['1980-10-1', 's'],
    ['2001-6-1', 'ms'],
  ]
  const afterDays = [1, 2, 3, 4, 5].map(x => {
    return [dayjs().add('y', x).format('YYYY-MM-DD HH:mm:ss'), 'ms']
  })

  for (const [day, key] of map.concat(afterDays)) {
    const time = new Date()
    expect(Lday(day).diff(time, key)).toBe(dayjs(day).diff(time, key, true))
  }
})
