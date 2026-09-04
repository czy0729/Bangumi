/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 03:32:10
 *
 * web 端入口: fetch 资源 + 缓存去重 (cache.ts) + 解码 (decoder.ts)
 */
import { logger } from '../../dev'
import { get, runWithCache } from './cache'
import { convert } from './converters'
import { decodePayload } from './decoder'

export { get }

import type { Data, DataAssets } from './types'

const TAG = '@utils/thirdParty/protobuf'

/**
 * 解码数据
 *  - 同时多个同样的请求, 只会触发第一次请求, 并发方共享同一个结果
 *  - 请求过的结果会缓存, 失败后下次调用可重试
 * */
export const decode = async <T extends DataAssets>(name: T): Promise<Data[T]> =>
  runWithCache(name, async () => {
    try {
      const binResponse = await fetch(`assets/proto/${name}/bin/index.bin`)
      const bytes = new Uint8Array(await binResponse.arrayBuffer())

      const data = convert(name, decodePayload(name, bytes))
      logger.log(TAG, 'decode', {
        name,
        length: Array.isArray(data) ? data.length : Object.keys(data).length
      })
      return data
    } catch (error) {
      logger.log(TAG, 'decode', 'Error decode file', name)
      throw 'Error decode file'
    }
  })
