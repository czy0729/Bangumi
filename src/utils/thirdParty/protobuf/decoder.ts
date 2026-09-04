/*
 * @Author: czy0729
 * @Date: 2026-08-30 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 07:30:00
 *
 * 双平台共用的纯解码逻辑: bin 字节 → 业务数据
 * 基于 wire.ts 的读取器与 schemas.ts 的 schema 表自研实现, 不依赖 protobufjs
 * 不涉及任何资源加载 / 缓存 / 日志
 */
import { ITEM_SCHEMAS } from './schemas'
import { utf8Decode, WireReader } from './wire'

import type { Schema } from './schemas'
import type { DataAssets } from './types'

/**
 * 解码单个 message, 字段在线上才写入属性 (与 toObject defaults:false 语义一致)
 *  - 未知字段按 wire type 跳过, wire type 不匹配的字段同样跳过
 * */
function decodeMessage(reader: WireReader, schema: Schema): Record<string, unknown> {
  const item: Record<string, unknown> = {}

  while (reader.pos < reader.len) {
    const tag = reader.uint32()
    const wireType = tag & 7
    const fieldNo = tag >>> 3
    if (!fieldNo) throw new RangeError('illegal tag: field number 0')

    const field = schema[fieldNo]
    if (!field) {
      reader.skip(wireType)
      continue
    }

    switch (field.type) {
      // proto3 无 presence 的标量: 线上出现的默认值 (0 / -0 / '') 不写入, 与 protobufjs 一致
      case 'int32': {
        if (wireType === 0) {
          const value = reader.int32()
          if (value) item[field.key] = value
          else delete item[field.key]
        } else reader.skip(wireType)
        break
      }

      case 'int64': {
        if (wireType === 0) {
          const value = reader.int64()
          if (value) item[field.key] = value
          else delete item[field.key]
        } else reader.skip(wireType)
        break
      }

      case 'float': {
        if (wireType === 5) {
          const value = reader.float()
          if (!Object.is(value, 0)) item[field.key] = value
          else delete item[field.key]
        } else reader.skip(wireType)
        break
      }

      case 'string': {
        if (wireType === 2) {
          const value = utf8Decode(reader.bytes(reader.uint32()))
          if (value.length) item[field.key] = value
          else delete item[field.key]
        } else reader.skip(wireType)
        break
      }

      case 'int32[]': {
        if (wireType === 0) {
          ;((item[field.key] as number[] | undefined) ||= []).push(reader.int32())
        } else if (wireType === 2) {
          // 多段 packed / unpacked 混现时追加, 与 protobufjs 一致
          const arr = (item[field.key] as number[] | undefined) || []
          const end = reader.uint32() + reader.pos
          if (end > reader.len) throw new RangeError('index out of range')
          const prevLen = reader.len
          reader.len = end
          while (reader.pos < end) arr.push(reader.int32())
          reader.len = prevLen
          if (arr.length) item[field.key] = arr
        } else {
          reader.skip(wireType)
        }
        break
      }

      case 'message':
      case 'message[]': {
        if (wireType !== 2 || !field.schema) {
          reader.skip(wireType)
          break
        }
        const child = decodeBounded(reader, field.schema)
        if (field.type === 'message') item[field.key] = child
        else ((item[field.key] as Record<string, unknown>[] | undefined) ||= []).push(child)
        break
      }
    }
  }

  return item
}

/** 解码带长度前缀的子 message, 期间临时收紧可读上界 */
function decodeBounded(reader: WireReader, schema: Schema): Record<string, unknown> {
  const length = reader.uint32()
  const end = reader.pos + length
  if (end > reader.len) throw new RangeError('index out of range')

  const prevLen = reader.len
  reader.len = end
  const child = decodeMessage(reader, schema)
  reader.len = prevLen
  return child
}

/**
 * 解码 payload
 *  - 与运行时资源加载端约定: 数据集一律为 message Payload { repeated XXX payload = 1; } 包装
 *  - 输出与 protobufjs toObject({ longs: Number, enums: Number, bytes: String }) 一致:
 *    proto3 默认值 (0 / '') 不在输出中, 空 repeated 字段缺席
 *
 * @param name 数据集名, 决定条目 schema
 * @param bytes bin 字节
 * */
export function decodePayload<T>(name: DataAssets, bytes: Uint8Array): T {
  const schema = ITEM_SCHEMAS[name]
  if (!schema) throw new Error(`unknown data asset ${name}`)

  const reader = new WireReader(bytes)
  const payload: Record<string, unknown>[] = []

  while (reader.pos < reader.len) {
    const tag = reader.uint32()
    const wireType = tag & 7
    const fieldNo = tag >>> 3
    if (!fieldNo) throw new RangeError('illegal tag: field number 0')

    if (fieldNo === 1 && wireType === 2) {
      payload.push(decodeBounded(reader, schema))
    } else {
      reader.skip(wireType)
    }
  }

  return payload as T
}
