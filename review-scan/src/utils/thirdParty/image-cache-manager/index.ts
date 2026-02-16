/*
 * @Author: czy0729
 * @Date: 2024-03-06 11:38:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 17:28:29
 */
import * as FileSystem from 'expo-file-system'
import { DownloadOptions } from './type'
import { CacheEntry } from './utils'
import { BASE_DIR } from './ds'

export default class CacheManager {
  static entries: {
    [uri: string]: CacheEntry
  } = {}

  static get(uri: string, options: DownloadOptions): CacheEntry {
    if (!CacheManager.entries[uri]) CacheManager.entries[uri] = new CacheEntry(uri, options)
    return CacheManager.entries[uri]
  }

  static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true })
    await FileSystem.makeDirectoryAsync(BASE_DIR)
  }

  static async getCacheSize(): Promise<number> {
    const result = await FileSystem.getInfoAsync(BASE_DIR)
    if (!result.exists) throw new Error(`${BASE_DIR} not found`)

    return result.size
  }
}
