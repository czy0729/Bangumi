/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:11:54
 */
import protobuf, { Reader } from 'protobufjs'
import { logger } from '../dev'
import { cacheMap, checkCache, get, isPromise, lockMap } from './utils'

import type { Data, DataAssets } from './types'

export { get }

const TAG = '@utils/protobuf'

/**
 * 解码数据
 *  - 同时多个同样的请求, 只会触发第一次请求, 后到的会持续等待到 promise 返回
 *  - 请求过的结果会缓存
 * */
export const decode = async <T extends DataAssets>(name: T): Promise<Data[T]> => {
  const result = checkCache(name)

  // 并发等待中: 复用同一个等待 Promise
  if (isPromise<Data[T]>(result)) return result

  // 命中缓存
  if (result !== true) return result

  try {
    const protoResponse = await fetch(`assets/proto/${name}/proto/index.proto`)
    const text = await protoResponse.text()

    const { root } = protobuf.parse(text)
    const message = root.lookupType('Payload')

    const binResponse = await fetch(`assets/proto/${name}/bin/index.bin`)
    const arrayBuffer = await binResponse.arrayBuffer()

    const decodedMessage = message.decode(Reader.create(new Uint8Array(arrayBuffer)))
    const { payload } = message.toObject(decodedMessage, {
      longs: Number,
      enums: Number,
      bytes: String
    }) as { payload: Data[T] }

    cacheMap.set(name, payload)
    logger.log(TAG, 'decode', name, (payload as { length?: number }).length)

    return payload
  } catch (error) {
    logger.log(TAG, 'decode', 'Error decode file', name)
    throw 'Error decode file'
  } finally {
    lockMap.set(name, false)
  }
}
