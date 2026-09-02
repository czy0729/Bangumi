/*
 * @Author: czy0729
 * @Date: 2021-10-07 06:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 11:05:45
 */
import { Linking } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import pLimit from '@utils/thirdParty/p-limit'
import { B, IOS, M, TIMEZONE_IS_GMT8 } from '@constants/constants'
import { date, getTimestamp } from '../date'
import { applyProxy } from '../proxy'
import Base64 from '../thirdParty/base64'
import { info } from '../ui'
import { pad } from './base'
import { asc } from './sort'
import { log } from './utils'

export { asc, compare, desc } from './sort'
export { pad, safeObject, titleCase, trim } from './base'

export * from '../date'
export * from './relative-time'

import type { ComponentType } from 'react'
import type { TimerRef, ViewStyle, TextStyle, ImageStyle } from '@types'

/**
 * 全局强制组件设置默认参数
 * @param Component 组件
 * @param defaultProps 默认属性
 * @returns 添加默认属性后的组件
 */
export function setDefaultProps<T extends ComponentType<Record<string, unknown>>>(
  Component: T,
  defaultProps?: Record<string, unknown>
) {
  // 注入内部 render 方法, 类型上不属于公共 API
  const internal = Component as ComponentType<Record<string, unknown>> & {
    render?: (props: Record<string, unknown>, ref: unknown) => unknown
  }
  const componentRender = internal.render
  if (!componentRender) {
    internal.defaultProps = defaultProps
    return Component
  }

  internal.render = function (props: Record<string, unknown>, ref: unknown) {
    props = {
      ...defaultProps,
      ...props,
      style: [defaultProps?.style, props?.style]
    } as Record<string, unknown>
    return componentRender.call(this, props, ref)
  }

  return Component
}

/** 深拷贝 */
export function deepClone<T extends object>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const clone: Record<string, unknown> | unknown[] = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (Array.isArray(clone)) {
        clone[Number(key)] = deepClone((obj as Record<string, unknown>)[key] as object)
      } else {
        clone[key] = deepClone((obj as Record<string, unknown>)[key] as object)
      }
    }
  }

  return clone as T
}

/**
 * 判断是否为非空对象
 * @param value 待判断的值
 * @returns 如果是非空对象则返回 true, 否则返回 false
 */
export function isObject(value: unknown): boolean {
  return typeof value === 'object' && !!value
}

/** 缩短 runAfterInteractions */
export function runAfter(fn: () => void, postTask: boolean = false) {
  if (postTask) {
    setTimeout(() => {
      requestAnimationFrame(fn)
    }, 0)
    return
  }

  requestAnimationFrame(fn)
}

/** 若有后续样式返回数组否则返回第一参数 (用于防止组件重渲染) */
export function stl(
  ...styles: (ViewStyle | TextStyle | ImageStyle | false | null | undefined)[]
): ViewStyle | ViewStyle[] {
  const filteredStyles = styles.filter(Boolean) as ViewStyle[]
  return filteredStyles.length === 1 ? filteredStyles[0] : filteredStyles
}

/** 节流 */
export function throttle<T>(callback: (arg?: T) => void, delay: number = 400) {
  let timeoutID: TimerRef
  let lastExec = 0

  return function (this: unknown, ...args: [T?]) {
    const context = this
    const elapsed = Date.now() - lastExec

    function exec() {
      lastExec = Date.now()
      callback.apply(context, args)
    }
    clearTimeout(timeoutID)

    if (elapsed > Math.max(0, delay)) {
      exec()
    } else {
      timeoutID = setTimeout(exec, Math.max(0, delay) - elapsed)
    }
  }
}

/** 防抖 */
// 泛型约束需 any 而非 unknown: strictFunctionTypes 下 unknown[] 会拒绝带具体类型参数的函数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number = 320): T {
  let timeout: TimerRef = null

  return function (this: unknown, ...args: unknown[]) {
    const context = this
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn.apply(context, args)
    }, ms)
  } as T
}

/**
 * 并发请求
 * @param {*} fetchs 请求数组
 * @param {*} num 并发数, 默认为 2
 */
export async function queue<T>(
  fetchs: (() => Promise<T> | T)[] = [],
  num: number = 2
): Promise<T[] | false> {
  if (fetchs?.length === 0) return false

  const limit = pLimit(Math.max(1, num))
  return Promise.all(fetchs.map(fetch => limit(fetch)))
}

/** 对象中选择指定 key */
export function pick<T extends object, K extends keyof T>(obj: T, arr: K[]) {
  return arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {} as Pick<T, K>)
}

/** 对象中选择排除 key */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  return (Object.keys(obj) as (keyof T)[]).reduce((acc, key) => {
    if ((keys as (keyof T)[]).includes(key)) return acc
    return { ...acc, [key]: obj[key] }
  }, {} as Omit<T, K>)
}

const INTERCEPTOR_FINGERPRINTS: Record<string, true> = {}

/** 拦截器, 若拦截中返回 true */
export function interceptor(
  key: string = '',
  obj: Record<string, unknown> = {},
  distance: number = 800
) {
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
export function toFixed(value: number | string, num: number = 2) {
  return Number(value || 0).toFixed(num)
}

/** 浏览器打开网页 */
export function open(url: string, encode: boolean = false): boolean {
  if (!url || typeof url !== 'string') {
    info('地址不合法')
    return false
  }

  if (url.startsWith('//')) url = `https:${url}`

  if (encode) url = encodeURI(url)

  // 接管 workerProxy 替换
  url = applyProxy(url).url

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
  data?: Record<string, string | number | boolean>,
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
export function parseIOS8601(isostr: string, format: string = 'Y-m-d'): string {
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

/** @deprecated 颜色过渡 */
export function gradientColor(startRGB: number[], endRGB: number[], step: number) {
  const startR = startRGB[0]
  const startG = startRGB[1]
  const startB = startRGB[2]
  const endR = endRGB[0]
  const endG = endRGB[1]
  const endB = endRGB[2]
  const sR = (endR - startR) / step // 总差值
  const sG = (endG - startG) / step
  const sB = (endB - startB) / step

  const colorArr: string[] = []
  for (let i = 0; i < step; i += 1) {
    // 计算每一步的hex值
    const rgb = `rgb(${parseInt(String(sR * i + startR))}, ${parseInt(
      String(sG * i + startG)
    )}, ${parseInt(String(sB * i + startB))})`
    colorArr.push(rgb)
  }
  return colorArr
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
export function formatNumber(s: string | number, n: number = 2, xsb?: boolean): string {
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
  const medianValues: number[] = []
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

/** 清除搜索关键字的特殊字符 */
export function cleanQ(str: unknown) {
  return String(str).replace(/['!"#$%&\\'()*+,./:;<=>?@[\\\]^`{|}~']/g, ' ')
}

const similarCache = new Map<string, number>()

/**
 * 字符串相似度（Levenshtein）
 * @param s 字符串1
 * @param t 字符串2
 * @param f 保留多少位小数
 * @param ignoreSpace 是否忽略空格比较，默认 true
 */
export function similar(s: string, t: string, f?: number, ignoreSpace: boolean = true) {
  if (!s || !t) return 0

  // 归一化：是否去空格
  if (ignoreSpace) {
    s = s.replace(/\s+/g, '')
    t = t.replace(/\s+/g, '')
  }

  const n = s.length
  const m = t.length
  const l = Math.max(n, m)

  if (n === 0 || m === 0) return 0

  const key = `${s}|${t}|${f}|${ignoreSpace}`
  const cached = similarCache.get(key)
  if (cached !== undefined) return cached

  const d: number[][] = Array.from({ length: n + 1 }, (_, i) => [i])
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
  const value = f !== undefined ? parseFloat(res.toFixed(f)) : res

  similarCache.set(key, value)
  return value
}

/** 工厂辅助函数 */
export function factory<T>(type: { new (): T }): T {
  const instance = new type()
  return instance
}

/** findLastIndex */
export function findLastIndex<T>(
  arr: T[] | readonly T[],
  callback: (item: T, index: number, array: T[] | readonly T[]) => boolean,
  thisArg?: unknown
) {
  for (let index = arr.length - 1; index >= 0; index--) {
    const value = arr[index]
    if (callback.call(thisArg, value, index, arr)) {
      return index
    }
  }
  return -1
}

/**
 * 段落是否中文语境
 *  - 26/06/12 发现有维基人对段落做过 AI 翻译，直接对这种段落进行直接返回
 * */
export function isChineseParagraph(text: string = '', threshold: number = 0.8) {
  if (text.includes('[简介原文]')) return true

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
  // 如果数组为空或 count 为 0 或负数，直接返回空数组
  if (array.length === 0 || count <= 0) return []

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
