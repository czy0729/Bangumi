/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-14 11:59:36
 */
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import protobuf, { Reader } from 'protobufjs'
import { toByteArray } from 'base64-js'
import { cacheMap, checkCache, get, isPromise, lockMap, log } from './utils'
import { DataAssets, Decode } from './types'

export { get }

/**
 * 解码数据
 *  - 同时多个同样的请求, 只会触发第一次请求, 后到的会持续等待到 promise 返回
 *  - 请求过的结果会缓存
 * */
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
      log('decode', name, payload?.length)

      resolve(payload)
    } catch (error) {
      lockMap.set(name, false)
      log('decode', 'Error decode file', name)

      reject('Error decode file')
    }
  })
}

/** 读取本地 .proto */
async function loadProtoFile(name: DataAssets) {
  try {
    let local: string | number
    if (name === 'anime') {
      local = require('@assets/proto/anime/index.proto')
    } else if (name === 'bangumi-data') {
      local = require('@assets/proto/bangumi-data/index.proto')
    }

    // 加载 proto 文件的资源模块
    const protoAsset = Asset.fromModule(local)

    // 如果 proto 文件未下载到本地，则先下载
    if (!protoAsset.localUri) await protoAsset.downloadAsync()

    const response = await fetch(protoAsset.localUri)
    return response.text()
  } catch (error) {
    log('loadProtoFile', 'Error loading proto file', name)
    return ''
  }
}

/** 读取本地 .bin */
async function loadBinFile(name: DataAssets) {
  try {
    let local: string | number
    if (name === 'anime') {
      local = require('@assets/proto/anime/index.bin')
    } else if (name === 'bangumi-data') {
      local = require('@assets/proto/bangumi-data/index.bin')
    }

    // 加载 proto 文件的资源模块
    const protoAsset = Asset.fromModule(local)

    // 如果 proto 文件未下载到本地，则先下载
    if (!protoAsset.localUri) await protoAsset.downloadAsync()

    return FileSystem.readAsStringAsync(protoAsset.localUri, {
      encoding: FileSystem.EncodingType.Base64
    })
  } catch (error) {
    log('loadBinFile', 'Error loading bin file', name)
    return ''
  }
}
