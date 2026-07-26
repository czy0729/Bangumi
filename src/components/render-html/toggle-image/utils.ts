/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:47:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 15:47:10
 */
import { fixedRemoteImageUrl } from '@utils'
import { axios } from '@utils/thirdParty'
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
      .head(fixedRemoteImageUrl(url))
      .then(response => {
        if (response?.status !== 200) {
          CACHE.set(url, 0)
          resolve(0)
          return
        }

        const length = response?.headers?.['content-length']
        const result = parseInt(String(Number(length) / 1024))
        CACHE.set(url, result)
        resolve(result)
      })
      .catch(() => {
        CACHE.set(url, 0)
        resolve(0)
      })
  })
}
