/*
 * @Author: czy0729
 * @Date: 2024-04-17 17:24:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 17:27:41
 */
import SHA1 from 'crypto-js/sha1'
import * as FileSystem from 'expo-file-system'
import uniqueId from 'lodash.uniqueid'
import { DownloadOptions } from './type'
import { BASE_DIR } from './ds'

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

    await FileSystem.moveAsync({
      from: tmpPath,
      to: path
    })

    return {
      path,
      size
    }
  }
}

export const getCacheEntry = async (
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
  } catch (e) {}

  const info = await FileSystem.getInfoAsync(path)

  // @ts-expect-error
  const { exists, size } = info
  return {
    exists,
    path,
    tmpPath,
    size
  }
}
