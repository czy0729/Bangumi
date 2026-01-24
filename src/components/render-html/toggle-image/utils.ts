/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:47:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-25 07:17:20
 */
import { fixedRemoteImageUrl } from '@utils'
import axios from '@utils/thirdParty/axios'
import { WEB } from '@constants'

const CACHE = new Map<string, number>()

/** 获取远程图片的大小 */
export function getSize(url: string): Promise<number> | number {
  if (WEB) return 0

  return new Promise(resolve => {
    if (CACHE.has(url)) {
      resolve(CACHE.get(url))
      return
    }

    axios
      // @ts-expect-error
      .head(fixedRemoteImageUrl(url))
      .then((response: { status: number; headers: { [x: string]: any } }) => {
        if (response?.status !== 200) {
          CACHE.set(url, 0)
          resolve(0)
          return
        }

        const length = response?.headers?.['content-length']
        const result = parseInt(String(length / 1024))
        CACHE.set(url, result)
        resolve(result)
      })
      .catch(() => {
        CACHE.set(url, 0)
        resolve(0)
      })
  })
}
