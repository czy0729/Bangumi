/*
 * @Author: czy0729
 * @Date: 2024-03-06 11:38:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-06 11:38:59
 */
import SHA1 from 'crypto-js/sha1'
import * as FileSystem from 'expo-file-system'
import uniqueId from 'lodash.uniqueid'

export interface DownloadOptions {
  md5?: boolean
  headers?: { [name: string]: string }
}

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`

export class CacheEntry {
  uri: string

  options: DownloadOptions

  constructor(uri: string, options: DownloadOptions) {
    this.uri = uri
    this.options = options
  }

  async getPath(): Promise<
    | {
        path: string
        size: number
      }
    | undefined
  > {
    const { uri, options } = this
    const { path, exists, tmpPath, size } = await getCacheEntry(uri)
    if (exists) return { path, size }

    const result = await FileSystem.createDownloadResumable(uri, tmpPath, options).downloadAsync()
    // If the image download failed, we don't cache anything
    if (result && result.status !== 200) return undefined

    await FileSystem.moveAsync({ from: tmpPath, to: path })
    return { path, size }
  }
}

export default class CacheManager {
  static entries: { [uri: string]: CacheEntry } = {}

  static get(uri: string, options: DownloadOptions): CacheEntry {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri, options)
    }
    return CacheManager.entries[uri]
  }

  static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true })
    await FileSystem.makeDirectoryAsync(BASE_DIR)
  }

  static async getCacheSize(): Promise<number> {
    const result = await FileSystem.getInfoAsync(BASE_DIR)
    if (!result.exists) {
      throw new Error(`${BASE_DIR} not found`)
    }
    return result.size
  }
}

const getCacheEntry = async (
  uri: string
): Promise<{
  exists: boolean
  path: string
  tmpPath: string
  size: number
}> => {
  const filename = uri.substring(
    uri.lastIndexOf('/'),
    uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?')
  )
  const ext = filename.indexOf('.') === -1 ? '.jpg' : filename.substring(filename.lastIndexOf('.'))
  const path = `${BASE_DIR}${SHA1(uri)}${ext}`
  const tmpPath = `${BASE_DIR}${SHA1(uri)}-${uniqueId()}${ext}`

  // TODO: maybe we don't have to do this every time
  try {
    await FileSystem.makeDirectoryAsync(BASE_DIR)
  } catch (e) {
    // do nothing
  }

  const info = await FileSystem.getInfoAsync(path)
  const { exists, size } = info
  return { exists, path, tmpPath, size }
}
