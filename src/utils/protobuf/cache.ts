/*
 * @Author: czy0729
 * @Date: 2023-12-13 20:00:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:15
 *
 * 解码结果缓存与并发去重
 */
import { DEV, LOG_LEVEL } from '@src/config'
import { logger } from '../dev'

import type { Data, DataAssets } from './types'

const TAG = '@utils/protobuf/cache'

/** 缓存结果 */
export const cacheMap = new Map<string, unknown>()

/** 进行中的解码 Promise, 用于并发去重 */
export const promiseMap = new Map<string, Promise<unknown>>()

const logMap = new Map<string, boolean>()

/**
 * 统一解码入口
 *  - 命中缓存直接返回缓存
 *  - 已有进行中的解码则复用同一个 Promise: 成功共享结果, 失败共享同一个 rejection
 *  - 无论成败结束都会清除进行中状态, 失败后下次调用可重试
 * */
export function runWithCache<T extends DataAssets>(
  name: T,
  factory: () => Promise<Data[T]>
): Promise<Data[T]> {
  if (cacheMap.has(name)) return Promise.resolve(cacheMap.get(name) as Data[T])

  if (!promiseMap.has(name)) {
    const promise = factory()
      .then(payload => {
        cacheMap.set(name, payload)
        return payload
      })
      .finally(() => {
        promiseMap.delete(name)
      })
    promiseMap.set(name, promise)
  }

  return promiseMap.get(name) as Promise<Data[T]>
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
