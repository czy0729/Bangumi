/*
 * @Author: czy0729
 * @Date: 2021-10-07 06:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 11:11:31
 */
import { InteractionManager, PromiseTask, SimpleTask } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import dayjs from 'dayjs'
import { DEV } from '@/config'
import { B, M } from '@constants/constants'
import { info } from './ui'

/**
 * 排除null
 * @param {*} value
 */
export function isObject(value: any): boolean {
  return typeof value === 'object' && !!value
}

/**
 * 缩短 runAfterInteractions
 * @param {*} fn
 */
export function runAfter(fn: (() => any) | SimpleTask | PromiseTask) {
  return InteractionManager.runAfterInteractions(fn)
}

/**
 * 节流
 * @param {*} callback
 */
export function throttle(callback: (arg?: any) => void, delay = 400) {
  let timeoutID: number
  let lastExec = 0

  function wrapper() {
    // eslint-disable-next-line consistent-this
    const self = this
    const elapsed = Number(new Date()) - lastExec
    const args = arguments

    function exec() {
      lastExec = Number(new Date())
      callback.apply(self, args)
    }

    clearTimeout(timeoutID)

    if (elapsed > delay) {
      exec()
    } else {
      timeoutID = setTimeout(exec, delay - elapsed)
    }
  }

  return wrapper
}

/**
 * 防抖
 * @param {*} fn
 * @param {*} ms
 */
export function debounce(fn, ms = 400): typeof fn {
  let timeout = null // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => {
      // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments)
    }, ms)
  }
}

/**
 * 排序正序辅助函数
 *  - 用于在安卓端开启低版本的 Hermes 后, Array.sort 需要严格区分返回 0 -1 1, 相同返回会出现不稳定的结果
 * @param a
 * @param b
 * @param fn
 */
export function asc(a: any, b: any, fn?: (item: any) => any): 0 | 1 | -1 {
  let _a = a
  let _b = b
  if (typeof fn === 'function') {
    _a = fn(a)
    _b = fn(b)
  }

  if (_a === _b) return 0
  if (_a < _b) return -1
  return 1
}

/**
 * 排序倒序辅助函数
 * @param a
 * @param b
 * @param fn
 */
export function desc(a: any, b: any, fn?: (item: any) => any): 0 | 1 | -1 {
  let _a = a
  let _b = b
  if (typeof fn === 'function') {
    _a = fn(a)
    _b = fn(b)
  }

  if (_a === _b) return 0
  if (_a > _b) return -1
  return 1
}

/**
 * 接口防并发请求问题严重, 暂时延迟一下, n个请求一组
 * @param {*} fetchs
 */
export async function queue(fetchs: any[] = [], num: number = 2): Promise<boolean> {
  if (!fetchs.length) return false

  await Promise.all(
    new Array(num).fill(0).map(async () => {
      while (fetchs.length) {
        await fetchs.shift()()
      }
    })
  )
  return true
}

/**
 * 对象中选择指定 key
 * @param obj
 * @param arr
 */
export function pick(obj: object, arr: string[]) {
  return arr.reduce(
    // eslint-disable-next-line no-sequences
    (acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc),
    {}
  )
}

/**
 * 对象中选择排除 key
 * @param obj
 * @param arr
 */
export function omit<T extends object, U extends string[]>(obj: T, arr: U) {
  return Object.keys(obj).reduce(
    // eslint-disable-next-line no-sequences
    (acc, curr) => (arr.indexOf(curr) === -1 && (acc[curr] = obj[curr]), acc),
    {}
  ) as Omit<Readonly<T>, Readonly<U>[number]>
}

/**
 * 安全 toFixed
 * @param value
 * @param num
 */
export function toFixed(value: any, num: number = 2) {
  return Number(value || 0).toFixed(num)
}

/**
 * 安全对象
 * @param {*} object
 */
export function safeObject(object: any = {}) {
  Object.keys(object).forEach(key => {
    if (object[key] === undefined) {
      object[key] = ''
    }
  })
  return object
}

/**
 * 浏览器打开网页
 * @param {*} url
 */
export function open(url: any): boolean {
  if (!url || typeof url !== 'string') {
    info('地址不合法')
    return false
  }

  WebBrowser.openBrowserAsync(url, {
    enableBarCollapsing: true,
    showInRecents: true
  })

  if (DEV) console.info(url)

  return true
}

/**
 * url字符串化
 * @version 190221 1.0
 * @param {*} data
 * @param {*} encode
 */
export function urlStringify(data: object, encode: boolean = true): string {
  if (!data) return ''

  const arr = Object.keys(data).map(
    key => `${key}=${encode ? encodeURIComponent(data[key]) : data[key]}`
  )
  return arr.join('&')
}

/**
 * 补零
 * @version 190301 1.0
 * @param {*} n
 */
export function pad(n: string | number) {
  return Number(n) < 10 ? `0${n}` : n
}

/**
 * 睡眠
 * @version 180417 1.0
 * @param {*} ms
 */
export function sleep(ms: number = 800): Promise<undefined> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 简易时间戳格式化函数
 * @param  {String} format    格式化格式
 * @param  {Int}    timestamp 时间戳
 */
export function date(format?: string, timestamp?: any): string {
  // 假如第二个参数不存在，第一个参数作为timestamp
  if (!timestamp) {
    timestamp = format
    format = 'Y-m-d H:i:s'
  }

  const jsdate = timestamp ? new Date(timestamp * 1000) : new Date()
  const f = {
    Y: function () {
      return jsdate.getFullYear()
    },
    y: function () {
      return (jsdate.getFullYear() + '').slice(2)
    },
    m: function () {
      return pad(f.n())
    },
    d: function () {
      return pad(f.j())
    },
    H: function () {
      return pad(jsdate.getHours())
    },
    i: function () {
      return pad(jsdate.getMinutes())
    },
    s: function () {
      return pad(jsdate.getSeconds())
    },
    n: function () {
      return jsdate.getMonth() + 1
    },
    j: function () {
      return jsdate.getDate()
    }
  }
  return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
    let ret = ''
    if (t != s) {
      ret = s
    } else {
      if (f[s]) {
        ret = f[s]()
      } else {
        ret = s
      }
    }
    return ret
  })
}

/**
 * IOS8601时间转换
 * @param {*} isostr
 */
export function parseIOS8601(isostr: string, format = 'Y-m-d') {
  if (!isostr) return ''

  const parts = isostr.match(/\d+/g)
  const timestamp =
    new Date(
      `${parts[0]}-${parts[1]}-${parts[2]} ${parts[3]}:${parts[4]}:${parts[5]}`
    ).getTime() / 1000
  return date(format, timestamp)
}

/** 返回 timestamp */
export function getTimestamp(date = '') {
  const _date = trim(date)
  if (_date) return dayjs(_date).unix()
  return dayjs().unix()
}

/** xd xh xm xs ago => timestamp */
export function getRecentTimestamp(recent: string) {
  try {
    let timestamp = 0
    const d = recent.match(/\d+d/g)
    if (d) timestamp += parseInt(d[0]) * 24 * 60 * 60

    const h = recent.match(/\d+h/g)
    if (h) timestamp += parseInt(h[0]) * 60 * 60

    const m = recent.match(/\d+m/g)
    if (m) timestamp += parseInt(m[0]) * 60

    const s = recent.match(/\d+s/g)
    if (s) timestamp += parseInt(s[0])

    return timestamp
  } catch (error) {
    return 0
  }
}

const _y = date('y', getTimestamp())

/**
 * 返回最简单的时间表达
 * @version 190430 1.1
 * @return {String} *time 时间戳字符串
 */
export function simpleTime(time = '') {
  if (!time) return '-'

  const _time = getTimestamp(time)
  const ymd = date('y-m-d', _time)
    .split('-')
    .filter((item, index) => (index === 0 ? item != _y : true))
    .map(item => parseInt(item))
    .join('-')
  const hi = date('H:i', _time)
  return `${ymd} ${hi}`
}

/**
 * 数组分组
 * @param {*} arr
 * @param {*} num
 */
export function arrGroup(arr: string | any[], num: number = 40): any[] {
  const allData = []
  let currData = []

  for (let i = 0; i < arr.length; i += 1) {
    currData.push(arr[i])
    if ((i != 0 && (i + 1) % num == 0) || i == arr.length - 1) {
      allData.push(currData)
      currData = []
    }
  }

  return allData
}

/**
 * 首字母大写
 * @param {*} str
 */
export function titleCase(str: string = '') {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

/**
 * [待废弃] 颜色过渡
 */
export function gradientColor(startRGB: any[], endRGB: any[], step: number) {
  const startR = startRGB[0]
  const startG = startRGB[1]
  const startB = startRGB[2]
  const endR = endRGB[0]
  const endG = endRGB[1]
  const endB = endRGB[2]
  const sR = (endR - startR) / step // 总差值
  const sG = (endG - startG) / step
  const sB = (endB - startB) / step

  const colorArr = []
  for (let i = 0; i < step; i += 1) {
    // 计算每一步的hex值
    const rgb = `rgb(${parseInt(sR * i + startR)}, ${parseInt(
      sG * i + startG
    )}, ${parseInt(sB * i + startB)})`
    colorArr.push(rgb)
  }
  return colorArr
}

/**
 * 去掉收尾空格
 * @param {*} str
 */
export function trim(str: string = '') {
  return str.replace(/^\s+|\s+$/gm, '')
}

/**
 * 生成n位随机整数
 * @param {*} n
 */
export function randomn(n: number) {
  if (n > 21) return null

  return Math.floor((Math.random() + 1) * Math.pow(10, n - 1))
}

/**
 * 区间随机
 * @param {*} start
 * @param {*} end
 */
export function random(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1) + start)
}

/**
 * 数字分割加逗号
 * @version 160811 1.0
 * @version 160902 1.1 添加保留多少位小数
 * @version 160907 1.2 代码优化，金额少于1000时直接返回
 * @version 170103 1.3 判断n为0的情况
 * @param {Number} s 数字
 * @param {Int} n 保留多少位小数
 * @return {String}
 */
export function formatNumber(s: string | number, n = 2, xsb?: boolean) {
  if (xsb) {
    if (s >= B) return `${formatNumber((s as number) / B, 1)}亿`
    if (s >= M) return `${formatNumber((s as number) / M, 1)}万`
    return formatNumber(s, n)
  }

  if (s === '') return Number(s).toFixed(n)
  if (typeof s === 'undefined') return Number(0).toFixed(n)

  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''

  // @ts-ignore
  if (s == 0) return Number(s).toFixed(n)

  // @ts-ignore
  if (s < 1000) return Number(s).toFixed(n)

  const l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
  }
  if (typeof r === 'undefined') return t.split('').reverse().join('')
  return t.split('').reverse().join('') + '.' + r
}

/**
 * 时间戳距离现在时间的描述
 */
export function lastDate(timestamp: number, simple = true) {
  const getNumber = () => Math.floor(totalTime / _)
  const modTimestamp = () => totalTime % _

  let totalTime = getTimestamp() - timestamp
  let _

  _ = 60 * 60 * 24 * 365
  const years = getNumber()
  totalTime = modTimestamp()

  _ = 60 * 60 * 24 * 30
  const months = getNumber()
  totalTime = modTimestamp()

  if (years > 0) return simple ? `${years}年前` : `${years}年${months}月前`

  _ = 60 * 60 * 24 * 7
  const weeks = getNumber()
  totalTime = modTimestamp()
  if (months > 0) return simple ? `${months}月前` : `${months}月${weeks}周前`

  _ = 60 * 60 * 24
  const days = getNumber()
  totalTime = modTimestamp()
  if (weeks > 0) return simple ? `${weeks}周前` : `${weeks}周${days}天前`

  _ = 60 * 60
  const hours = getNumber()
  totalTime = modTimestamp()
  if (days > 0) return simple ? `${days}天前` : `${days}天${hours}时前`

  _ = 60
  const minutes = getNumber()
  totalTime = modTimestamp()
  if (hours > 0) return simple ? `${hours}时前` : `${hours}时${minutes}分前`
  if (minutes > 0) return `${minutes}分前`
  return '刚刚'
}

/**
 * 清除搜索关键字的特殊字符
 * @param {*} str
 */
export function cleanQ(str: any) {
  return String(str).replace(/['!"#$%&\\'()*+,./:;<=>?@[\\\]^`{|}~']/g, ' ')
}

/**
 * 字符串相似度
 * @param {*} s 字符串1
 * @param {*} t 字符串2
 * @param {*} f 相似度级别
 */
export function similar(s: string, t: string, f?: number) {
  if (!s || !t) return 0

  const l = s.length > t.length ? s.length : t.length
  const n = s.length
  const m = t.length
  const d = []

  f = f || 3
  const min = (a, b, c) => (a < b ? (a < c ? a : c) : b < c ? b : c)

  let i
  let j
  let si
  let tj
  let cost
  if (n === 0) return m
  if (m === 0) return n
  for (i = 0; i <= n; i += 1) {
    d[i] = []
    d[i][0] = i
  }
  for (j = 0; j <= m; j += 1) {
    d[0][j] = j
  }
  for (i = 1; i <= n; i += 1) {
    si = s.charAt(i - 1)
    for (j = 1; j <= m; j += 1) {
      tj = t.charAt(j - 1)
      if (si === tj) {
        cost = 0
      } else {
        cost = 1
      }
      d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
    }
  }
  const res = 1 - d[n][m] / l
  return res.toFixed(f)
}

export function factory<T>(type: { new (): T }): T {
  const instance = new type()
  return instance
}
