/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 21:44:58
 */
import { toByteArray } from 'base64-js'
import { Asset } from 'expo-asset'
import protobuf, { Reader } from 'protobufjs'
import { logger } from '../dev'
import { FileSystem } from '../thirdParty/file-system'
import { cacheMap, checkCache, get, isPromise, lockMap } from './utils'

import type { DataAssets, Decode } from './types'

export { get }

/**
 * 解码数据
 *  - 同时多个同样的请求只执行第一次
 *  - 完整保持你原逻辑
 */
export const decode: Decode = async name => {
  const result = checkCache(name)
  if (isPromise(result) || result !== true) return result

  return new Promise(async (resolve, reject) => {
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
      })

      cacheMap.set(name, payload)
      lockMap.set(name, false)
      logger.log('@utils/protobuf/decode', name, payload?.length)

      resolve(payload)
    } catch (error) {
      lockMap.set(name, false)
      logger.log('@utils/protobuf/decode', 'Error decode file', name)
      reject('Error decode file')
    }
  })
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
function getProtoModule(name: DataAssets) {
  switch (name) {
    case 'bangumi-data':
      return require('@assets/proto/bangumi-data/proto/index.proto')
    case 'anime':
      return require('@assets/proto/anime/proto/index.proto')
    case 'manga':
      return require('@assets/proto/manga/proto/index.proto')
    case 'game':
      return require('@assets/proto/game/proto/index.proto')
    case 'adv':
      return require('@assets/proto/adv/proto/index.proto')
    case 'catalog':
      return require('@assets/proto/catalog/proto/index.proto')
  }
}

function getBinModule(name: DataAssets) {
  switch (name) {
    case 'bangumi-data':
      return require('@assets/proto/bangumi-data/bin/index.bin')
    case 'anime':
      return require('@assets/proto/anime/bin/index.bin')
    case 'manga':
      return require('@assets/proto/manga/bin/index.bin')
    case 'game':
      return require('@assets/proto/game/bin/index.bin')
    case 'adv':
      return require('@assets/proto/adv/bin/index.bin')
    case 'catalog':
      return require('@assets/proto/catalog/bin/index.bin')
  }
}
