/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-15 14:18:11
 */
import pLimit from 'p-limit'
import { DEV } from '@/config'

/**
 * 接口某些字段为空返回null, 影响到es6函数初始值的正常使用, 统一处理成空字符串
 * @param {*} data
 */
export function safe(data: { [x: string]: any }) {
  if (data instanceof Object) Object.keys(data).forEach(k => (data[k] = safe(data[k])))
  return data === null ? '' : data
}

/**
 * 接口防并发请求问题严重, 暂时延迟一下, n个请求一组
 * @param {*} fetchs fetchFn[]
 * @param {*} num default: 2
 */
export async function queue(fetchs: any[] = [], num: any = 2) {
  if (!fetchs.length) return false

  const limit = pLimit(num)
  return Promise.all(fetchs.map(fetch => limit(fetch)))
}

/** [DEV] */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(`[@utils/fetch/${method}]`, ...others)
}
