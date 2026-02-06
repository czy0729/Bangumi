/*
 * @Author: czy0729
 * @Date: 2024-04-17 17:24:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 07:49:48
 */
import SHA1 from 'crypto-js/sha1'
import { TaskQueue } from '../../scheduler/task-queue'
import { FileSystem } from '../file-system'
import { BASE_DIR } from './ds'

import type { DownloadOptions } from './type'

const fsQueue = new TaskQueue(3)

export class CacheEntry {
  uri: string
  options: DownloadOptions

  private loading?: Promise<
    | {
        path: string
        size: number
      }
    | undefined
  >

  constructor(uri: string, options: DownloadOptions) {
    this.uri = uri
    this.options = options
  }

  getPath(): Promise<
    | {
        path: string
        size: number
      }
    | undefined
  > {
    if (this.loading) return this.loading

    this.loading = fsQueue.run(async () => {
      const { uri, options } = this
      const { path, exists, tmpPath, size } = await getCacheEntry(uri)

      if (exists) return { path, size }

      const result = await FileSystem.createDownloadResumable(uri, tmpPath, options).downloadAsync()

      if (!result || result.status !== 200) return undefined

      await FileSystem.moveAsync({
        from: tmpPath,
        to: path
      })

      return {
        path,
        size
      }
    })

    return this.loading
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
  const hash = SHA1(uri).toString()

  const filename = uri.substring(
    uri.lastIndexOf('/'),
    uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?')
  )
  const ext = filename.indexOf('.') === -1 ? '.jpg' : filename.substring(filename.lastIndexOf('.'))

  const path = `${BASE_DIR}${hash}${ext}`
  const tmpPath = `${BASE_DIR}${hash}.tmp`

  // 目录创建失败可以忽略（并发下常见）
  try {
    await FileSystem.makeDirectoryAsync(BASE_DIR)
  } catch {}

  const info = await FileSystem.getInfoAsync(path)

  // @ts-expect-error expo typing
  const { exists, size } = info

  return {
    exists,
    path,
    tmpPath,
    size
  }
}
