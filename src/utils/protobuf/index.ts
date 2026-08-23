/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-23 21:53:49
 */
import { toByteArray } from 'base64-js'
import { Asset } from 'expo-asset'
import protobuf, { Reader } from 'protobufjs'
import { logger } from '../dev'
import { FileSystem } from '../thirdParty/file-system'
import { cacheMap, checkCache, get, isPromise, lockMap } from './utils'

export { get }

import type { Data, DataAssets } from './types'

/**
 * 解码数据
 *  - 同时多个同样的请求只执行第一次
 *  - 完整保持你原逻辑
 */
export const decode = async <T extends DataAssets>(name: T): Promise<Data[T]> => {
  const result = checkCache(name)

  // 并发等待中: 复用同一个等待 Promise
  if (isPromise<Data[T]>(result)) return result

  // 命中缓存
  if (result !== true) return result

  try {
    const text = await loadProtoFile(name)
    if (!text) throw new Error('Error loading proto file')

    const { root } = protobuf.parse(text)
    const message = root.lookupType('Payload')

    const base64String = await loadBinFile(name)
    if (!base64String) throw new Error('Error loading bin file')

    const uint8Array = new Uint8Array(toByteArray(base64String))
    const reader = new Reader(uint8Array)
    const decodedMessage = message.decode(reader)

    const { payload } = message.toObject(decodedMessage, {
      longs: Number,
      enums: Number,
      bytes: String
    }) as { payload: Data[T] }

    cacheMap.set(name, payload)
    lockMap.set(name, false)
    logger.log('@utils/protobuf/decode', name, (payload as { length?: number }).length)

    return payload
  } catch (error) {
    lockMap.set(name, false)
    logger.log('@utils/protobuf/decode', 'Error decode file', name)
    throw 'Error decode file'
  }
}

/** 读取本地 .proto */
async function loadProtoFile(name: DataAssets) {
  try {
    const module = getProtoModule(name)
    const asset = Asset.fromModule(module)

    if (!asset.localUri) await asset.downloadAsync()
    const response = await fetch(asset.localUri)
    return response.text()
  } catch (error) {
    logger.log('@utils/protobuf/loadProtoFile', 'Error loading proto file', name)
    return ''
  }
}

/** 读取本地 .bin */
async function loadBinFile(name: DataAssets) {
  try {
    const module = getBinModule(name)
    const asset = Asset.fromModule(module)

    if (!asset.localUri) await asset.downloadAsync()

    return FileSystem.readAsStringAsync(asset.localUri, {
      encoding: FileSystem.EncodingType.Base64
    })
  } catch (error) {
    logger.log('@utils/protobuf/loadBinFile', 'Error loading bin file', name)
    return ''
  }
}

// 惰性 require，按需加载对应的 proto/bin
function getProtoModule(name: DataAssets): number {
  switch (name) {
    case 'bangumi-data':
      return require('@assets/proto/bangumi-data/proto/index.proto') as number
    case 'anime':
      return require('@assets/proto/anime/proto/index.proto') as number
    case 'manga':
      return require('@assets/proto/manga/proto/index.proto') as number
    case 'game':
      return require('@assets/proto/game/proto/index.proto') as number
    case 'adv':
      return require('@assets/proto/adv/proto/index.proto') as number
    case 'catalog':
      return require('@assets/proto/catalog/proto/index.proto') as number
    default:
      throw new Error(`Unknown data assets name: ${name}`)
  }
}

function getBinModule(name: DataAssets): number {
  switch (name) {
    case 'bangumi-data':
      return require('@assets/proto/bangumi-data/bin/index.bin') as number
    case 'anime':
      return require('@assets/proto/anime/bin/index.bin') as number
    case 'manga':
      return require('@assets/proto/manga/bin/index.bin') as number
    case 'game':
      return require('@assets/proto/game/bin/index.bin') as number
    case 'adv':
      return require('@assets/proto/adv/bin/index.bin') as number
    case 'catalog':
      return require('@assets/proto/catalog/bin/index.bin') as number
    default:
      throw new Error(`Unknown data assets name: ${name}`)
  }
}
