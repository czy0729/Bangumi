/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 01:55:12
 */
import protobuf, { Reader } from 'protobufjs'
import { Decode, Get } from './types'

/** 缓存结果 */
const cacheMap = new Map<string, any>()

/** 锁定 */
const lockMap = new Map<string, boolean>()

/**
 * 解码数据
 *  - 同时多个同样的请求, 只会触发第一次请求, 后到的会持续等待到 promise 返回
 *  - 请求过的结果会缓存
 * */
export const decode: Decode = name => {
  if (name !== 'bangumi-data') return null

  if (cacheMap.has(name)) return cacheMap.get(name)

  if (!lockMap.has(name)) {
    lockMap.set(name, true)
  } else {
    const waitingPromise = new Promise(resolve => {
      const interval = setInterval(() => {
        if (!lockMap.get(name)) {
          clearInterval(interval)
          resolve(cacheMap.get(name))
        }
      }, 800)
    })
    return waitingPromise
  }

  return new Promise((resolve, reject) => {
    const protoFile = `assets/proto/${name}/index.proto`
    fetch(protoFile)
      .then(response => response.text())
      .then(text => {
        const { root } = protobuf.parse(text)
        const message = root.lookupType('Payload')

        const binFile = `assets/proto/${name}/index.bin`
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
            resolve(payload)
          })
          .catch(() => {
            reject('Error loading binary file')
          })
          .finally(() => {
            lockMap.set(name, false)
          })
      })
      .catch(() => {
        reject('Error loading proto file:')
        lockMap.set(name, false)
      })
  })
}

/** 获取数据 */
export const get: Get = name => {
  return cacheMap.get(name)
}
