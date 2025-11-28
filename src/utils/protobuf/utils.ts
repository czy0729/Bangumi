/*
 * @Author: czy0729
 * @Date: 2023-12-13 20:00:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 19:14:20
 */
import { DEV, LOG_LEVEL } from '@src/config'
import { logger } from '../dev'

import type { DataAssets, Get } from './types'

/** 缓存结果 */
export const cacheMap = new Map<string, any>()

/** 锁定 */
export const lockMap = new Map<string, boolean>()

const logMap = new Map<string, boolean>()

/**
 * 检查进度
 *  - 若存在缓存直接返回缓存
 *  - 否则检查锁定, 若没锁定返回 true, 示意继续执行
 *  - 若锁定了返回等待 Promise
 * */
export function checkCache(name: DataAssets) {
  if (cacheMap.has(name)) return cacheMap.get(name)

  if (!lockMap.has(name)) {
    lockMap.set(name, true)
  } else {
    const waitingPromise = new Promise(resolve => {
      const interval = setInterval(() => {
        if (!lockMap.get(name)) {
          clearInterval(interval)
          resolve(cacheMap.get(name))
        }
      }, 800)
    })
    return waitingPromise
  }

  return true
}

/** 获取数据 */
export const get: Get = (name: DataAssets) => {
  const data = cacheMap.get(name)
  if (DEV && LOG_LEVEL >= 1) {
    if (!logMap.has(name)) {
      logger.log('@utils/protobuf/get', name, data?.length || 0)
    }
    logMap.set(name, true)
  }
  return data
}

/** 是否 Promise */
export function isPromise(obj: any) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}
