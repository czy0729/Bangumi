/*
 * @Author: czy0729
 * @Date: 2026-08-30 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:57
 *
 * decoder 纯函数测试：真实 protobufjs 编码构造字节, 验证解码与转换行为
 */
import protobuf from 'protobufjs'
import { decodePayload } from '../decoder'

const PROTO_TEXT = `
syntax = "proto3";
message Item {
  int32 i = 1;
  string n = 2;
  float s = 3;
  repeated int32 t = 4;
}
message Payload {
  repeated Item payload = 1;
}
`

const ITEMS = [
  { i: 1, n: 'CLANNAD', s: 6.5, t: [1, 2, 3] },
  { i: 2, n: 'AIR' },
  { i: 37519, n: '化物語' }
]

type ItemInput = {
  i?: number
  n?: string
  s?: number
  t?: number[]
}

/** 用生产同款链路编码出 bin 字节 */
function encodeItemsToBytes(items: ItemInput[]) {
  const { root } = protobuf.parse(PROTO_TEXT)
  const message = root.lookupType('Payload')
  return message.encode(message.fromObject({ payload: items } as any)).finish()
}

describe('decodePayload', () => {
  it('proto 文本 + bin 字节解码出业务数据', () => {
    const bytes = encodeItemsToBytes(ITEMS)

    expect(decodePayload(PROTO_TEXT, bytes)).toEqual(ITEMS)
  })

  it('float 字段按 float32 精度往返', () => {
    const bytes = encodeItemsToBytes([{ i: 1, s: 6.1 }])

    const result = decodePayload<{ s: number }[]>(PROTO_TEXT, bytes)
    // float32 无法精确表示 6.1, 与 JSON 全精度不同, 消费方需注意
    expect(result[0].s).toBeCloseTo(6.1, 5)
  })

  it('空数组字段解码后缺席 (proto3 不编码空 repeated)', () => {
    const bytes = encodeItemsToBytes([{ i: 1, n: 'a', t: [] }])

    expect(decodePayload(PROTO_TEXT, bytes)).toEqual([{ i: 1, n: 'a' }])
  })

  it('proto 文本非法时抛出原始错误', () => {
    expect(() => decodePayload('not a proto', new Uint8Array([1]))).toThrow()
  })

  it('bin 字节损坏时抛出原始错误', () => {
    expect(() => decodePayload(PROTO_TEXT, new Uint8Array([9, 9, 9, 9]))).toThrow()
  })
})
