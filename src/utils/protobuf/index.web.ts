/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 23:25:29
 */
import protobuf, { Reader } from 'protobufjs'
import { cacheMap, checkCache, get, isPromise, lockMap, log } from './utils'
import { Decode } from './types'

export { get }

/**
 * 解码数据
 *  - 同时多个同样的请求, 只会触发第一次请求, 后到的会持续等待到 promise 返回
 *  - 请求过的结果会缓存
 * */
export const decode: Decode = name => {
  const result = checkCache(name)
  if (isPromise(result) || result !== true) return result

  return new Promise((resolve, reject) => {
    const protoFile = `assets/proto/${name}/proto/index.proto`
    fetch(protoFile)
      .then(response => response.text())
      .then(text => {
        const { root } = protobuf.parse(text)
        const message = root.lookupType('Payload')

        const binFile = `assets/proto/${name}/bin/index.bin`
        fetch(binFile)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => {
            const reader = Reader.create(new Uint8Array(arrayBuffer))
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
          })
          .catch(() => {
            reject('Error loading bin file')
          })
          .finally(() => {
            lockMap.set(name, false)
          })
      })
      .catch(() => {
        reject('Error loading proto file')
        lockMap.set(name, false)
      })
  })
}
