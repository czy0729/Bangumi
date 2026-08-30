/*
 * @Author: czy0729
 * @Date: 2026-08-30 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:24
 *
 * 双平台共用的纯解码逻辑: proto 文本 + bin 字节 → 业务数据
 * 不涉及任何资源加载 / 缓存 / 日志
 */
import protobuf, { Reader } from 'protobufjs'

/**
 * 解码 payload
 *  - 与运行时资源加载端约定: 数据集一律为 message Payload { repeated XXX payload = 1; } 包装
 *  - toObject 转换参数与运行时保持一致
 * */
export function decodePayload<T>(protoText: string, bytes: Uint8Array): T {
  const { root } = protobuf.parse(protoText)
  const message = root.lookupType('Payload')

  const decodedMessage = message.decode(new Reader(bytes))
  const { payload } = message.toObject(decodedMessage, {
    longs: Number,
    enums: Number,
    bytes: String
  }) as { payload: T }

  return payload
}
