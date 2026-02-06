/*
 * @Author: czy0729
 * @Date: 2024-03-06 11:38:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 07:51:54
 */
import { FileSystem } from '../file-system'
import { CacheEntry } from './utils'
import { BASE_DIR } from './ds'

import type { DownloadOptions } from './type'

export default class CacheManager {
  static entries: {
    [uri: string]: CacheEntry
  } = {}

  static get(uri: string, options: DownloadOptions): CacheEntry {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri, options)
    }

    return CacheManager.entries[uri]
  }

  static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true })
    await FileSystem.makeDirectoryAsync(BASE_DIR)
    CacheManager.entries = {}
  }

  static async getCacheSize(): Promise<number> {
    const result = await FileSystem.getInfoAsync(BASE_DIR)
    if (!result.exists) throw new Error(`${BASE_DIR} not found`)
    return result.size
  }
}
