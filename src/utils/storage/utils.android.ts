/*
 * @Author: czy0729
 * @Date: 2023-11-01 13:41:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-12 03:03:34
 */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MMKV } from 'react-native-mmkv'
import { DEV } from '@src/config'

const mmkv = new MMKV({ id: 'bangumi-storage' })

let ENABLE_MMKV = true

export async function getItem(key: string): Promise<string | null> {
  if (!ENABLE_MMKV) return AsyncStorage.getItem(key)

  const mmkvValue = mmkv.getString(key)
  if (mmkvValue !== undefined) return mmkvValue

  const asyncStorageValue = await AsyncStorage.getItem(key)
  if (asyncStorageValue === null) return null

  if (DEV) log('getItem', key)
  mmkv.set(key, asyncStorageValue)
  return asyncStorageValue
}

export async function setItem(key: string, value: string): Promise<void> {
  if (!ENABLE_MMKV) return AsyncStorage.setItem(key, value)
  mmkv.set(key, value)
}

export async function getAllKeys(): Promise<readonly string[]> {
  if (!ENABLE_MMKV) return AsyncStorage.getAllKeys()

  const mmkvKeys = mmkv.getAllKeys()
  const asyncKeys = await AsyncStorage.getAllKeys()
  return [...new Set([...mmkvKeys, ...asyncKeys])]
}

export async function multiGet(
  keys: readonly string[]
): Promise<readonly [string, string | null][]> {
  if (!ENABLE_MMKV) return AsyncStorage.multiGet(keys)

  const result = new Array<[string, string | null]>(keys.length)
  const pending: { key: string; index: number }[] = []

  for (let i = 0; i < keys.length; i++) {
    const value = mmkv.getString(keys[i])
    if (value !== undefined) {
      result[i] = [keys[i], value]
    } else {
      pending.push({ key: keys[i], index: i })
    }
  }

  if (pending.length > 0) {
    try {
      const asyncResults = await AsyncStorage.multiGet(pending.map(p => p.key))
      for (let i = 0; i < asyncResults.length; i++) {
        const [key, value] = asyncResults[i]
        if (value !== null) {
          if (DEV) log('multiGet', key)
          mmkv.set(key, value)
        }
        result[pending[i].index] = [key, value]
      }
    } catch (error) {
      if (DEV) log('multiGet', 'AsyncStorage.multiGet failed', error)
      for (const { index } of pending) {
        if (!result[index]) result[index] = [keys[index], null]
      }
    }
  }

  return result
}

export async function removeItem(key: string): Promise<void> {
  if (ENABLE_MMKV) {
    mmkv.delete(key)
    return
  }
  return AsyncStorage.removeItem(key)
}

export async function clear(): Promise<void> {
  if (ENABLE_MMKV) {
    mmkv.clearAll()
    return
  }
  return AsyncStorage.clear()
}

export function setMMKVEnabled(enabled: boolean) {
  ENABLE_MMKV = enabled
  if (DEV) log('setMMKVEnabled', enabled ? 'enabled' : 'disabled')
}

function log(method: string, ...others: any[]) {
  // eslint-disable-next-line no-console
  if (DEV) console.info('🟣', `[MMKV/${method}]`.padEnd(36), ...others)
}
