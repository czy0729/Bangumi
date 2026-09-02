/*
 * @Author: czy0729
 * @Date: 2022-04-13 04:14:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 11:05:56
 *
 * 本地化
 *  - 写入本地动作会有合并逻辑和时间间隔，目的是避免短时间过度写入
 *  - 序列化不在调用方同步执行: setStorage 只登记引用, 小键在下一轮事件循环序列化落盘,
 *    大键 (记忆长度 >= LAZY_SET_STORAGE_SIZE) 由定时 flush 统一序列化 (间隔内多次保存合并为一次)
 */
import { AppState } from 'react-native'
import pLimit from '@utils/thirdParty/p-limit'
import { getItem, setItem } from './utils'
import {
  CACHE_MAP,
  LAZY_SET_STORAGE_INTERVAL,
  LAZY_SET_STORAGE_SIZE,
  PENDING_MAP,
  SIZE_MAP
} from './ds'

import type { TimerRef } from '@types'

let setStorageInterval: TimerRef
if (setStorageInterval) clearInterval(setStorageInterval)

let flushScheduled = false

/** 读取数据 */
export async function getStorage<T = unknown>(key: string) {
  try {
    if (!key) return null

    const data = await getItem(key)
    return JSON.parse(data) as T | null
  } catch (error) {
    return null
  }
}

/**
 * 保存数据到本地
 *  - 仅登记引用, 序列化延后: 避免在调用方 (fetch 回调、交互事件) 主线程同步 JSON.stringify 大状态
 *  - 同 key 短时间多次保存自动合并为最后一次
 *  - 序列化后大于 LAZY_SET_STORAGE_SIZE 的键由定时 flush 串行落盘
 *  - 注意: 延迟期间持有引用, 落盘的是 flush 时刻的最新数据
 * */
export async function setStorage(key: string, data: unknown) {
  if (!key) return

  PENDING_MAP.set(key, data)

  // 已知大键: 不单独调度, 引用交给定时 flush 统一序列化, 间隔内多次保存合并为一次
  if ((SIZE_MAP.get(key) ?? 0) >= LAZY_SET_STORAGE_SIZE) return

  scheduleFlush()
}

/** 尽快序列化小键并落盘 (脱离调用方关键路径); 大键转入延迟合并 */
function scheduleFlush() {
  if (flushScheduled) return

  flushScheduled = true
  setTimeout(() => {
    flushScheduled = false
    stringifyPending()
  }, 0)
}

/** 序列化待写数据: 小键立即落盘, 大键进 CACHE_MAP 等定时串行落盘 */
function stringifyPending() {
  if (!PENDING_MAP.size) return

  const entries = [...PENDING_MAP]
  PENDING_MAP.clear()

  entries.forEach(([key, data]) => {
    try {
      const _data = JSON.stringify(data)
      SIZE_MAP.set(key, _data.length)

      if (_data.length >= LAZY_SET_STORAGE_SIZE) {
        CACHE_MAP.set(key, _data)
        return
      }

      try {
        setItem(key, _data)
      } catch {}
    } catch {}
  })
}

/**
 * flush: 序列化待写数据并将大值串行落盘
 *  - 定时器周期调用; 也可在退后台等时机手动调用补写
 * */
export async function flushPendingStorage() {
  stringifyPending()

  if (!CACHE_MAP.size) return

  const setItems: (() => Promise<void>)[] = []
  CACHE_MAP.forEach((value, key) => {
    setItems.push(async () => {
      try {
        await setItem(key, value)
      } catch {}
      CACHE_MAP.delete(key)
    })
  })

  const limit = pLimit(1)
  await Promise.all(setItems.map(fn => limit(fn)))
}

setStorageInterval = setInterval(() => {
  flushPendingStorage()
}, LAZY_SET_STORAGE_INTERVAL)

// 退后台/切后台时立即补写, 收窄延迟序列化与延迟落盘的丢写窗口
AppState?.addEventListener?.('change', state => {
  if (state !== 'active') flushPendingStorage()
})
