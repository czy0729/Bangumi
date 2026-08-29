/*
 * @Author: czy0729
 * @Date: 2023-12-13 20:00:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:12:21
 */
import { DEV, LOG_LEVEL } from '@src/config'
import { logger } from '../dev'

import type { Data, DataAssets } from './types'

const TAG = '@utils/protobuf/utils'

/** 缓存结果 */
export const cacheMap = new Map<string, unknown>()

/** 锁定 */
export const lockMap = new Map<string, boolean>()

const logMap = new Map<string, boolean>()

/**
 * 检查进度
 *  - 若存在缓存直接返回缓存
 *  - 否则检查锁定, 若没锁定返回 true, 示意继续执行
 *  - 若锁定了返回等待 Promise
 * */
export function checkCache<T extends DataAssets>(name: T): Data[T] | true | Promise<Data[T]> {
  if (cacheMap.has(name)) return cacheMap.get(name) as Data[T]

  if (!lockMap.has(name)) {
    lockMap.set(name, true)
  } else {
    const waitingPromise = new Promise<Data[T]>(resolve => {
      const interval = setInterval(() => {
        if (!lockMap.get(name)) {
          clearInterval(interval)
          resolve(cacheMap.get(name) as Data[T])
        }
      }, 800)
    })
    return waitingPromise
  }

  return true
}

/** 获取数据 */
export function get<T extends DataAssets>(name: T): Data[T] {
  const data = cacheMap.get(name)
  if (DEV && LOG_LEVEL >= 1) {
    if (!logMap.has(name)) {
      logger.log(TAG, 'get', name, (data as { length?: number } | undefined)?.length || 0)
    }
    logMap.set(name, true)
  }
  return data as Data[T]
}

/** 是否 Promise */
export function isPromise<T = unknown>(obj: unknown): obj is Promise<T> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof (obj as Promise<T>).then === 'function'
  )
}
