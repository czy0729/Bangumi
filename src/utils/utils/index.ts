/*
 * @Author: czy0729
 * @Date: 2021-10-07 06:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 15:14:18
 */
import { ComponentType } from 'react'
import { Linking } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import pLimit from 'p-limit'
import { B, IOS, M, TIMEZONE_IS_GMT8 } from '@constants/constants'
import { AnyObject, Fn } from '@types'
import { date, getTimestamp } from '../date'
import Base64 from '../thirdParty/base64'
import { info } from '../ui'
import { log } from './utils'

export * from '../date'

/**
 * 全局强制组件设置默认参数
 * @param Component 组件
 * @param defaultProps 默认属性
 * @returns 添加默认属性后的组件
 */
export function setDefaultProps<T extends ComponentType<any>>(
  Component: T,
  defaultProps?: Record<string, any>
) {
  // @ts-expect-error
  const componentRender = Component.render
  if (!componentRender) {
    Component.defaultProps = defaultProps
    return Component
  }

  // @ts-expect-error
  Component.render = function (props: { style: any }, ref: any) {
    props = {
      ...defaultProps,
      ...props,
      style: [defaultProps?.style, props?.style]
    }
    return componentRender.call(this, props, ref)
  }

  return Component
}

/** 深拷贝 */
export function deepClone<T extends AnyObject>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const clone = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // @ts-expect-error
      clone[key] = deepClone(obj[key])
    }
  }

  return clone as T
}

/**
 * 判断是否为非空对象
 * @param value 待判断的值
 * @returns 如果是非空对象则返回 true, 否则返回 false
 */
export function isObject(value: any): boolean {
  return typeof value === 'object' && !!value
}

/** 缩短 runAfterInteractions */
export function runAfter(fn: () => any, postTask: boolean = false) {
  // return InteractionManager.runAfterInteractions(fn)
  if (postTask) {
    setTimeout(() => {
      requestAnimationFrame(fn)
    }, 0)
    return
  }

  requestAnimationFrame(fn)
}

/** 若有后续样式返回数组否则返回第一参数 (用于防止组件重渲染) */
export function stl(...styles: any[]): any | any[] {
  const filteredStyles = styles.filter(Boolean)
  return filteredStyles.length === 1 ? filteredStyles[0] : filteredStyles
}

/** 节流 */
export function throttle(callback: (arg?: any) => void, delay: number = 400) {
  let timeoutID: any
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

/** 防抖 */
export function debounce(fn: Fn, ms: number = 320): typeof fn {
  // 创建一个标记用来存放定时器的返回值
  let timeout = null

  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的
      // interval 间隔内如果还有字符输入的话就不会执行 fn 函数
      fn.apply(this, arguments)
    }, ms)
  }
}

/**
 * Compare two strings. This comparison is not linguistically accurate, unlike
 * String.prototype.localeCompare(), albeit stable.
 * @doc https://github.com/grantila/fast-string-compare
 * @returns -1, 0 or 1
 */
export function compare(a: string, b: string) {
  const lenA = a.length
  const lenB = b.length
  const minLen = lenA < lenB ? lenA : lenB
  var i = 0
  for (; i < minLen; ++i) {
    const ca = a.charCodeAt(i)
    const cb = b.charCodeAt(i)

    if (ca > cb) return 1
    else if (ca < cb) return -1
  }
  if (lenA === lenB) return 0
  return lenA > lenB ? 1 : -1
}

/**
 * 正序比较函数, 可接受一个映射函数进行比较
 * - 用于在安卓端开启低版本的 Hermes 后, Array.sort 需要严格区分返回 0 -1 1, 相同返回会出现不稳定的结果
 * @param a 第一个比较项
 * @param b 第二个比较项
 * @param fn 映射函数, 将比较项转换后再进行比较
 * @returns 如果a < b, 则返回 -1; 如果a = b, 则返回 0; 如果a > b, 则返回 1
 */
export function asc(a: any, b: any, fn?: (item: any) => any): 0 | 1 | -1 {
  const _a = typeof fn === 'function' ? fn(a) : a
  const _b = typeof fn === 'function' ? fn(b) : b
  if (typeof _a === 'string' && typeof _b === 'string') return compare(_b, _a)
  if (_a === _b) return 0
  if (_a < _b) return -1
  return 1
}

/**
 * 倒序比较函数, 可接受一个映射函数进行比较
 * @param a 第一个比较项
 * @param b 第二个比较项
 * @param fn 映射函数, 将比较项转换后再进行比较
 * @returns 如果a < b, 则返回 1; 如果a = b, 则返回 0; 如果a > b, 则返回 -1
 */
export function desc(a: any, b: any, fn?: (item: any) => any): 0 | 1 | -1 {
  const _a = typeof fn === 'function' ? fn(a) : a
  const _b = typeof fn === 'function' ? fn(b) : b
  if (typeof _a === 'string' && typeof _b === 'string') return compare(_a, _b)
  if (_a === _b) return 0
  if (_a > _b) return -1
  return 1
}

/**
 * 并发请求
 * @param {*} fetchs 请求数组
 * @param {*} num 并发数, 默认为 2
 */
export async function queue(fetchs: (() => any)[] = [], num: number = 2) {
  if (fetchs?.length === 0) return false

  const limit = pLimit(num)
  return Promise.all(fetchs.map(fetch => limit(fetch)))
}

/** 对象中选择指定 key */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  arr: K[]
): Pick<T, K> {
  return arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {} as Pick<T, K>)
}

/** 对象中选择排除 key */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key as K)) return acc

    return { ...acc, [key]: obj[key] }
  }, {} as Omit<T, K>)
}

const INTERCEPTOR_FINGERPRINTS: Record<string, true> = {}

/** 拦截器, 若拦截中返回 true */
export function interceptor(key: string = '', obj: AnyObject = {}, distance: number = 800) {
  const fingerprint = `${key}|${JSON.stringify(obj)}`

  // 检查指纹是否存在于记录中
  if (INTERCEPTOR_FINGERPRINTS[fingerprint]) {
    log('interceptor', 'denied:', key)
    return true
  }

  // 记录指纹，并在若干秒后清除
  INTERCEPTOR_FINGERPRINTS[fingerprint] = true
  setTimeout(() => {
    delete INTERCEPTOR_FINGERPRINTS[fingerprint]
  }, distance)

  return false
}

/** 安全 toFixed */
export function toFixed(value: any, num: number = 2) {
  return Number(value || 0).toFixed(num)
}

/** 安全对象 (用于把请求中的 null 换成 undefined, 减少 ?. 语法出错) */
export function safeObject<T extends Record<string, any>>(object: T = {} as T): T {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, value === null ? undefined : value])
  ) as T
}

/** 浏览器打开网页 */
export function open(url: any, encode: boolean = false): boolean {
  if (!url || typeof url !== 'string') {
    info('地址不合法')
    return false
  }

  if (url.startsWith('//')) url = `https:${url}`

  if (encode) url = encodeURI(url)

  if (IOS && url.indexOf('http') === 0) {
    WebBrowser.openBrowserAsync(url, {
      enableBarCollapsing: true,
      showInRecents: true
    })
  } else {
    Linking.openURL(url)
  }

  log('open', url)
  return true
}

/** url 字符串化 */
export function urlStringify(
  data?: Record<string, any>,
  encode: boolean = true,
  sort: boolean = false
): string {
  if (!data) return ''

  if (sort) {
    return Object.entries(data)
      .sort((a, b) => asc(a[0], b[0]))
      .map(([key, value]) => `${key}=${encode ? encodeURIComponent(value) : value}`)
      .join('&')
  }

  return Object.entries(data)
    .map(([key, value]) => `${key}=${encode ? encodeURIComponent(value) : value}`)
    .join('&')
}

/** 补零 */
export function pad(n: string | number): string {
  return +n < 10 ? `0${n}` : `${n}`
}

/** 睡眠 */
export function sleep(ms: number = 800): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/** 等待 */
export const wait = sleep

/** 将网页版的中国时区时间转换成本地时区时间 */
export function toLocalTimeStr(chinaTimeStr: string, format: string = 'Y-m-d H:i:s') {
  if (TIMEZONE_IS_GMT8 || !chinaTimeStr) return chinaTimeStr

  // 将中国时间字符串转换为本地时间
  const localDateTime = new Date(`${chinaTimeStr.replace(/-/g, '/')} GMT+0800`)
  return date(format, Math.floor(localDateTime.getTime() / 1000))
}

/**
 * 将 ISO8601 格式的时间字符串转换为指定格式的日期字符串
 * @param isostr ISO8601 格式的时间字符串
 * @param format 日期格式字符串，默认为 'Y-m-d'
 * @returns 指定格式的日期字符串
 */
export function parseIOS8601(isostr: string, format = 'Y-m-d'): string {
  if (!isostr) return ''

  const [year, month, day, hour, minute, second] = isostr.trim().match(/\d+/g) ?? []
  const timestamp = new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`).getTime()
  return date(format, timestamp / 1000)
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

/** 返回最简单的时间表达 */
export function simpleTime(time: string = '') {
  if (!time) return '-'

  const _time = getTimestamp(time)
  const ymd = date('y-m-d', _time)
    .split('-')
    .filter((item, index) => (index === 0 ? item != _y : true))
    .map(item => pad(parseInt(item)))
    .join('-')
  const hi = date('H:i', _time)
  return `${ymd} ${hi}`
}

/** 数组分组 */
export function arrGroup<T>(arr: T[] | readonly T[], num: number = 40): T[][] {
  return Array.from(
    {
      length: Math.ceil(arr.length / num)
    },
    (_, i) => arr.slice(i * num, i * num + num)
  )
}

/** 首字母大写 */
export function titleCase<S extends string>(str: S): Capitalize<S> {
  const [first = '', ...rest] = String(str || '')
  return `${first.toUpperCase()}${rest.join('')}` as Capitalize<S>
}

/** @deprecated 颜色过渡 */
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
    const rgb = `rgb(${parseInt(sR * i + startR)}, ${parseInt(sG * i + startG)}, ${parseInt(
      sB * i + startB
    )})`
    colorArr.push(rgb)
  }
  return colorArr
}

/** 去掉头尾空格 */
export function trim(str: string = '') {
  return str.replace(/^\s+|\s+$/gm, '')
}

/** 生成 n 位随机整数 */
export function randomn(n: number) {
  if (n > 21) return null

  return Math.floor((Math.random() + 1) * Math.pow(10, n - 1))
}

/** 区间随机 */
export function random(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1) + start)
}

/**
 * 数字分割加逗号
 * @version 160811 1.0
 * @version 160902 1.1 添加保留多少位小数
 * @version 160907 1.2 代码优化, 金额少于 1000 时直接返回
 * @version 170103 1.3 判断 n 为 0 的情况
 * @param {*} s   数字
 * @param {*} n   保留多少位小数
 * @param {*} xsb 是否 xsb 模式
 */
export function formatNumber(s: string | number, n: number = 2, xsb?: boolean) {
  if (xsb) {
    if (Number(s) >= B) return `${formatNumber((s as number) / B, 1)}亿`
    if (Number(s) >= M) return `${formatNumber((s as number) / M, 1)}万`
    return formatNumber(s, n)
  }

  if (s === '') return Number(s).toFixed(n)
  if (typeof s === 'undefined') return Number(0).toFixed(n)

  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''

  // @ts-expect-error
  if (s == 0) return Number(s).toFixed(n)

  // @ts-expect-error
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

/** 数目缩略 */
export function decimal(value: number) {
  const amount = Math.abs(value)
  if (amount >= B) return `${value < 0 ? '-' : ''}${toFixed(amount / B, 1)}亿`
  if (amount >= M) return `${value < 0 ? '-' : ''}${toFixed(amount / M, 1)}万`
  return `${value < 0 ? '-' : ''}${formatNumber(amount, 0)}`
}

/** 计算中位数 */
export function calculateMedian(data: [price: number, count: number][]): number {
  // 1. 按价格升序排序
  data.sort((a, b) => a[0] - b[0])

  // 2. 计算总数量
  const totalCount = data.reduce(
    (
      sum,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [_, count]
    ) => sum + count,
    0
  )

  // 3. 找到中位数位置
  const isEven = totalCount % 2 === 0
  const medianPos = isEven ? [totalCount / 2, totalCount / 2 + 1] : [Math.floor(totalCount / 2) + 1]

  // 4. 遍历累计数量，定位中位数
  let cumulativeCount = 0
  const medianValues = []
  for (const [price, count] of data) {
    cumulativeCount += count
    // 检查是否覆盖中位数位置
    if (!medianValues[0] && cumulativeCount >= medianPos[0]) {
      medianValues[0] = price
      if (!isEven) break // 奇数情况，只需一个值
    }
    if (isEven && !medianValues[1] && cumulativeCount >= medianPos[1]) {
      medianValues[1] = price
      break
    }
  }

  // 5. 返回中位数
  return isEven ? (medianValues[0] + medianValues[1]) / 2 : medianValues[0]
}

const LAST_DATE_UNITS = [
  { name: '年', seconds: 60 * 60 * 24 * 365 },
  { name: '月', seconds: 60 * 60 * 24 * 30 },
  { name: '周', seconds: 60 * 60 * 24 * 7 },
  { name: '天', seconds: 60 * 60 * 24 },
  { name: '时', seconds: 60 * 60 },
  { name: '分', seconds: 60 }
] as const

/** 时间戳距离现在时间的描述 */
export function lastDate(timestamp: number | string, simple: boolean = true) {
  if (!timestamp) return '刚刚'

  let seconds = Math.floor(Date.now() / 1000 - Number(timestamp))
  let str = ''
  let hits = 0
  for (const unit of LAST_DATE_UNITS) {
    if (hits >= 2) break

    const count = Math.floor(seconds / unit.seconds)
    if (count > 0) {
      const s = `${count}${unit.name}`
      if (simple) return `${s}前`

      str += s
      hits += 1
      seconds -= count * unit.seconds
    }
  }
  return str ? `${str}前` : '刚刚'
}

/** 清除搜索关键字的特殊字符 */
export function cleanQ(str: any) {
  return String(str).replace(/['!"#$%&\\'()*+,./:;<=>?@[\\\]^`{|}~']/g, ' ')
}

const similarCache = new Map<string, number>()

/**
 * 字符串相似度
 * @param {*} s 字符串1
 * @param {*} t 字符串2
 * @param {*} f 保留多少位小数
 */
export function similar(s: string, t: string, f?: number) {
  if (!s || !t) return 0
  const n = s.length,
    m = t.length,
    l = Math.max(n, m)
  if (n === 0 || m === 0) return l

  const key = `${s}|${t}|${f}`
  if (similarCache.has(key)) return similarCache.get(key)

  const d = Array.from({ length: n + 1 }, (_, i) => [i])
  d[0] = Array.from({ length: m + 1 }, (_, i) => i)
  for (let i = 1; i <= n; i++) {
    const si = s[i - 1]
    for (let j = 1; j <= m; j++) {
      const tj = t[j - 1]
      const cost = si === tj ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
    }
  }
  const res = 1 - d[n][m] / l

  const value = parseFloat(res.toFixed(f))
  similarCache.set(key, value)
  return value
}

/** 工厂辅助函数 */
export function factory<T>(type: { new (): T }): T {
  const instance = new type()
  return instance
}

/** findLastIndex */
export function findLastIndex(arr: any[] | readonly any[], callback: any, thisArg?: any) {
  for (let index = arr.length - 1; index >= 0; index--) {
    const value = arr[index]
    if (callback.call(thisArg, value, index, arr)) {
      return index
    }
  }
  return -1
}

/** 段落是否中文语境 */
export function isChineseParagraph(text: string = '', threshold: number = 0.8) {
  text = text.replace(/「|」|、|，|。|？|！|・|―|/g, '')

  const chineseRegex = /[\u4e00-\u9fa5]/
  const totalCharCount = text.length

  let chineseCharCount = 0
  for (let i = 0; i < totalCharCount; i += 1) {
    const char = text.charAt(i)
    if (chineseRegex.test(char)) chineseCharCount += 1
  }

  const chineseRatio = chineseCharCount / totalCharCount
  return chineseRatio >= threshold
}

/** 保留基本字符 */
export function keepBasicChars(str: string) {
  if (!str) return ''

  return String(str).replace(/[^\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FFa-zA-Z0-9]/g, '')
}

/** 文字中间省略 */
export function truncateMiddle(text: string = '', maxLength: number = 20, charsToShow: number = 4) {
  if (text.length <= maxLength) return text

  const startLength = Math.ceil((maxLength - charsToShow) / 2)
  const endLength = Math.floor((maxLength - charsToShow) / 2)
  return text.substring(0, startLength) + '...' + text.substring(text.length - endLength)
}

/** 随机挑选数组项 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  // 如果数组为空或 count 为 0，直接返回空数组
  if (array.length === 0 || count === 0) return []

  // 如果数组长度小于等于需要的数量，直接返回打乱后的数组
  if (array.length <= count) return shuffleArray(array)

  // 返回前 count 项
  return shuffleArray(array).slice(0, count)
}

/** Fisher-Yates 洗牌算法 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = array.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return Base64.btoa(binary)
}
