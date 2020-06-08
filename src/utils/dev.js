/*
 * 开发调试
 * @Author: czy0729
 * @Date: 2019-03-26 18:37:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 14:28:41
 */
import { DEV } from '@constants'

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
  if (!DEV) {
    return
  }
  console.log(JSON.stringify(value, handleCircular(), space))
}

/**
 * 全局警告
 * @param {*} key
 * @param {*} method
 * @param {*} error
 */
const _warn = console.warn
export function globalWarn(key, method, error) {
  if (!DEV) {
    return
  }
  _warn(`[${key}] ${method}`, error)
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

/**
 * 测试log
 * @version 171024 0.1
 * @version 181101 1.0 测试环境才显示
 * @param {String} type  消息类型
 * @param {String} key   消息键
 * @param {Any}    value 消息值
 */
let lastTime
let lastIndex = 0
export function log(type = '', key = '', value = '', ...other) {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()

  let time = `${h}:${m}:${s}`
  if (time === lastTime) {
    lastIndex += 1
    time += `.${lastIndex + 1}`
  } else {
    lastTime = time
    lastIndex = 0
  }

  const res = [time, type]
  if (key !== undefined) res.push('\n', key)
  if (value !== undefined) res.push('\n', value)
  if (other && other.length) res.push('\n', other)
  console.info(...res)
}
