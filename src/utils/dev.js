/*
 * 开发调试
 * @Author: czy0729
 * @Date: 2019-03-26 18:37:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-01 07:46:56
 */
import { DEV, LOG_LEVEL } from '@constants'
import { RERENDER_SHOW } from '../../config'
import { pad } from './utils'

const RERENDER_LOG_COUNT = 0
let RERENDER_MEMO = {}
if (DEV && !RERENDER_LOG_COUNT) {
  setInterval(() => {
    RERENDER_MEMO = {}
  }, 8000)
}

export function rerender(key, ...other) {
  if (!DEV || !key || !RERENDER_SHOW.test(key)) return

  if (!RERENDER_MEMO[key]) RERENDER_MEMO[key] = 0
  RERENDER_MEMO[key] += 1

  let _key = key
  for (let len = _key.length; len <= 24; len += 1) {
    _key += ' '
  }

  let _count = String(RERENDER_MEMO[key])
  if (_count && _count <= RERENDER_LOG_COUNT) return

  _count += ' '
  for (let len = 1; len <= Math.min(RERENDER_MEMO[key], 20); len += 1) {
    _count += '■'
  }

  for (let len = _count.length; len <= 12; len += 1) {
    _count += ' '
  }

  console.info(now(), '[render]', _key, _count, ...other)
}

export function now() {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  // const ms = now.getMilliseconds()
  return `${h}:${pad(m)}:${pad(s)}`
}

/**
 * 测试log
 * @version 171024 0.1
 * @version 181101 1.0 测试环境才显示
 * @param {String} type  消息类型
 * @param {String} key   消息键
 * @param {Any}    value 消息值
 */
export function log(type = '', key = '', value = '', ...other) {
  if (LOG_LEVEL === 0) return

  const res = [now(), type]
  if (key !== undefined) res.push('\n', key)
  if (value !== undefined) res.push('\n', value)
  if (other && other.length) res.push('\n', other)
  console.info(...res)
}

/**
 * 处理循环引用
 */
function handleCircular() {
  const cache = []
  const keyCache = []
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      const index = cache.indexOf(value)
      if (index !== -1) {
        return `[Circular ${keyCache[index]}]`
      }
      cache.push(value)
      keyCache.push(key || 'root')
    }
    return value
  }
}

/**
 * 全局log, 能打印循环引用
 * @param {*} value
 * @param {*} space
 */
export function globalLog(value, space) {
  if (!DEV) return
  console.info(JSON.stringify(value, handleCircular(), space))
}

/**
 * 全局警告
 * @param {*} key
 * @param {*} method
 * @param {*} error
 */
export function globalWarn(key, method) {
  if (!DEV) return
  log(`\x1b[40m\x1b[33m[${key}] ${method}\x1b[0m`)
}

/**
 * 字符串填充
 * @version 171011 1.0
 * @param {*} str
 * @param {*} len
 */
export function fill(str, len = 32) {
  let _str = str
  if (_str.length > len) {
    return _str
  }
  for (let i = _str.length; i < len; i += 1) {
    _str += ' '
  }
  return _str
}
