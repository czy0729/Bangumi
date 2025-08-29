/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 19:14:41
 */
import pLimit from 'p-limit'
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'
import { Fn } from '@types'

/** 接口某些字段为空返回 null, 影响到 es6 函数初始值的正常使用, 统一处理成空字符串 */
export function safe(data: { [x: string]: any }) {
  if (data instanceof Object) Object.keys(data).forEach(k => (data[k] = safe(data[k])))
  return data === null ? '' : data
}

/** 修复 cookie 写法 */
export function safeCookie(cookie: string) {
  if (!cookie) return cookie

  return cookie
    .split(';')
    .map(item => item.trim())
    .filter(item => item !== 'undefined')
    .join('; ')
}

/**
 * 接口防并发请求问题严重, 暂时延迟一下, n 个请求一组
 * @param {*} fetchs fetchFn[]
 * @param {*} num default: 2
 */
export async function queue(fetchs: Fn[] = [], num: number = 2) {
  if (!fetchs.length) return false

  const limit = pLimit(num)
  return Promise.all(fetchs.map(fetch => limit(fetch)))
}

/** [DEV] */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.plain, `[@utils/fetch/${method}]`, ...others)
}
