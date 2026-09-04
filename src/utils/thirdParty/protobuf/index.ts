/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 03:31:58
 *
 * native 端入口: 资源加载 (assets.ts) + 缓存去重 (cache.ts) + 解码 (decoder.ts)
 */
import { logger } from '../../dev'
import { loadBinBytes } from './assets'
import { get, runWithCache } from './cache'
import { convert } from './converters'
import { decodePayload } from './decoder'

export { get }

import type { Data, DataAssets } from './types'

const TAG = '@utils/thirdParty/protobuf'

/**
 * 解码数据
 *  - 同时多个同样的请求只执行第一次, 并发方共享同一个结果
 *  - 失败后下次调用可重试
 */
export const decode = async <T extends DataAssets>(name: T): Promise<Data[T]> =>
  runWithCache(name, async () => {
    try {
      const bytes = await loadBinBytes(name)
      if (!bytes.length) throw new Error('Error loading bin file')

      const data = convert(name, decodePayload(name, bytes))
      logger.log(TAG, 'decode', {
        name,
        length: Array.isArray(data) ? data.length : Object.keys(data).length
      })
      return data
    } catch (error) {
      logger.log(TAG, 'decode', 'Error decode file', { name })
      throw 'Error decode file'
    }
  })
