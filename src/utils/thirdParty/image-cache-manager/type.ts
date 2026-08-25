/*
 * @Author: czy0729
 * @Date: 2024-04-17 17:21:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 15:39:46
 */
/** 图片下载附加选项 */
export type DownloadOptions = {
  md5?: boolean
  headers?: {
    [name: string]: string
  }
}

/** 缓存文件元信息 (cleanup 淘汰决策用) */
export type CacheFile = {
  uri: string
  time: number
  size: number
}
