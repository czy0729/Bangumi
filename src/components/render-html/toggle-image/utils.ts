/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:47:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 15:47:10
 */
import { fixedRemoteImageUrl } from '@utils'
import { ensureCacheLimit } from '@utils/cache'
import { axios } from '@utils/thirdParty'
import { WEB } from '@constants'

/** 图片体积缓存上限 */
const CACHE_LIMIT = 500

const CACHE = new Map<string, number>()

/** 记录图片体积 (KB), 超出上限按插入顺序淘汰最早条目 */
function memoSize(url: string, value: number) {
  CACHE.set(url, value)
  ensureCacheLimit(CACHE, CACHE_LIMIT)
}

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
          memoSize(url, 0)
          resolve(0)
          return
        }

        const length = response?.headers?.['content-length']
        const result = parseInt(String(Number(length) / 1024))
        memoSize(url, result)
        resolve(result)
      })
      .catch(() => {
        memoSize(url, 0)
        resolve(0)
      })
  })
}
