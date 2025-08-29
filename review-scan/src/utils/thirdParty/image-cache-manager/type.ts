/*
 * @Author: czy0729
 * @Date: 2024-04-17 17:21:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 17:21:39
 */
export interface DownloadOptions {
  md5?: boolean
  headers?: {
    [name: string]: string
  }
}
