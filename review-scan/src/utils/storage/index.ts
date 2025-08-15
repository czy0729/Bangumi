/*
 * 本地化
 *  - 写入本地动作会有合并逻辑和时间间隔，目的是避免短时间过度写入
 * @Author: czy0729
 * @Date: 2022-04-13 04:14:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-21 13:31:18
 */
import { queue } from '../utils'
import { getItem, setItem } from './utils'
import { CACHE_MAP, LAZY_SET_STORAGE_INTERVAL, LAZY_SET_STORAGE_SIZE } from './ds'

const DEV_LOG = false

let setStorageInterval: any
if (setStorageInterval) clearInterval(setStorageInterval)

/** 读取数据 */
export async function getStorage(key: string) {
  try {
    if (!key) return null

    const data = await getItem(key)
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

/** 保存数据到本地 (会对大于 LAZY_SET_STORAGE_SIZE 的操作进行延迟合并保存到本地) */
export async function setStorage(key: string, data: any) {
  if (!key) return

  const _data = JSON.stringify(data)
  if (_data.length >= LAZY_SET_STORAGE_SIZE) {
    CACHE_MAP.set(key, _data)
    return
  }

  try {
    setItem(key, _data)
  } catch (error) {}
}

/** 数据较大的键, 合并没必要的多次写入 */
setStorageInterval = setInterval(() => {
  if (!CACHE_MAP.size) return

  const setItems = []
  CACHE_MAP.forEach((value, key) => {
    setItems.push(async () => {
      try {
        await setItem(key, value)
      } catch (error) {}
      CACHE_MAP.delete(key)

      if (DEV_LOG) {
        const size = (String(value).length / 1000).toFixed(2)
        if (Number(size) >= 100) {
          console.info('setStorageLazy', `${size}kb`.padEnd(10, ' '), key)
        }
      }
    })
  })

  queue(setItems, 1)
}, LAZY_SET_STORAGE_INTERVAL)
