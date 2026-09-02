/*
 * @Author: czy0729
 * @Date: 2026-09-02 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 07:30:00
 *
 * 自研解码器与 protobufjs 的差分验证：
 * 对全部真实数据集 bin, 逐数据集对比两条解码链路 (自研 vs parse+decode+toObject) 的输出深度相等
 */
import fs from 'fs'
import path from 'path'
import protobuf from 'protobufjs'
import { decodePayload } from '../decoder'
import { ITEM_SCHEMAS } from '../schemas'

import type { DataAssets } from '../types'

const ASSETS_DIR = path.resolve(__dirname, '../../../assets/proto')
const DATASETS = Object.keys(ITEM_SCHEMAS) as DataAssets[]

/** protobufjs 生产同款链路的解码输出 */
function decodeWithProtobufjs(name: DataAssets): unknown {
  const dir = path.join(ASSETS_DIR, name)
  const protoText = fs.readFileSync(path.join(dir, 'proto', 'index.proto'), 'utf-8')
  const bin = fs.readFileSync(path.join(dir, 'bin', 'index.bin'))

  const { root } = protobuf.parse(protoText)
  const message = root.lookupType('Payload')
  const decoded = message.decode(bin)
  return message.toObject(decoded, {
    longs: Number,
    enums: Number,
    bytes: String
  }).payload
}

describe('自研解码器与 protobufjs 差分验证', () => {
  it.each(DATASETS)('%s 输出与 protobufjs 一致', name => {
    const bin = fs.readFileSync(path.join(ASSETS_DIR, name, 'bin', 'index.bin'))

    expect(decodePayload(name, new Uint8Array(bin))).toEqual(decodeWithProtobufjs(name))
  })

  it('抽样条目字段语义抽查 (float 精度与 int64 转换来自真实数据)', () => {
    const bin = fs.readFileSync(path.join(ASSETS_DIR, 'bangumi-data', 'bin', 'index.bin'))
    const actual = decodePayload<{ id: number; j: string; s?: { b?: number } }[]>(
      'bangumi-data',
      new Uint8Array(bin)
    )
    const expected = decodeWithProtobufjs('bangumi-data') as typeof actual

    expect(actual.length).toBe(expected.length)
    expect(actual.length).toBeGreaterThan(100)
    // int64 → Number
    expect(actual.some(item => typeof item.id === 'number')).toBe(true)
    // 嵌套 message 缺省语义一致 (Sites 内缺席字段不出现)
    expect(actual.every(item => typeof item.s === 'object')).toBe(true)
    expect(actual.some(item => item.s && item.s.b === undefined)).toBe(true)
  })
})
