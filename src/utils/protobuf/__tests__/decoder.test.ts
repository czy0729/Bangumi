/*
 * @Author: czy0729
 * @Date: 2026-08-30 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 07:30:00
 *
 * decoder 纯函数测试：真实 protobufjs 编码构造字节, 验证自研解码与转换行为
 */
import protobuf from 'protobufjs'
import { decodePayload } from '../decoder'

const ANIME_PROTO_TEXT = `
syntax = "proto3";
message Anime {
  int32 i = 1;
  float s = 2;
  string ty = 6;
  repeated int32 o = 7;
  string ar = 9;
}
message Payload {
  repeated Anime payload = 1;
}
`

const BANGUMI_DATA_PROTO_TEXT = `
syntax = "proto3";
message BangumiData {
  int64 id = 1;
  string j = 2;
  Sites s = 5;
}
message Sites {
  int64 b = 1;
  int64 mal = 3;
}
message Payload {
  repeated BangumiData payload = 1;
}
`

/** 用真实 protobufjs 编码出 bin 字节 */
function encodeToBytes(protoText: string, payload: object[]) {
  const { root } = protobuf.parse(protoText)
  const message = root.lookupType('Payload')
  return message.encode(message.fromObject({ payload } as any)).finish()
}

describe('decodePayload', () => {
  it('bin 字节按数据集 schema 解码出业务数据', () => {
    const items = [
      { i: 1, s: 6.5, ty: 'TV', o: [1, 2, 3], ar: 'Key' },
      { i: 37519, ar: 'シャフト' }
    ]
    const bytes = encodeToBytes(ANIME_PROTO_TEXT, items)

    expect(decodePayload('anime', bytes)).toEqual(items)
  })

  it('float 字段按 float32 精度往返', () => {
    const bytes = encodeToBytes(ANIME_PROTO_TEXT, [{ i: 1, s: 6.1 }])

    const result = decodePayload<{ s: number }[]>('anime', bytes)
    // float32 无法精确表示 6.1, 与 JSON 全精度不同, 消费方需注意
    expect(result[0].s).toBeCloseTo(6.1, 5)
  })

  it('空数组字段解码后缺席 (proto3 不编码空 repeated)', () => {
    const bytes = encodeToBytes(ANIME_PROTO_TEXT, [{ i: 1, ty: 'TV', o: [] }])

    expect(decodePayload('anime', bytes)).toEqual([{ i: 1, ty: 'TV' }])
  })

  it('嵌套 message 与 int64 字段解码正确 (longs: Number 语义)', () => {
    const bytes = encodeToBytes(BANGUMI_DATA_PROTO_TEXT, [
      { id: 37519, j: '化物語', s: { b: 97592, mal: 35027 } },
      { id: 1, j: 'AIR' }
    ])

    expect(decodePayload('bangumi-data', bytes)).toEqual([
      { id: 37519, j: '化物語', s: { b: 97592, mal: 35027 } },
      { id: 1, j: 'AIR' }
    ])
  })

  it('unpacked 编码的 repeated int32 与 packed 等价 (兼容历史 bin)', () => {
    // 手工构造 unpacked: Payload 包装 + 字段 7 (o) 以 wire type 0 逐个出现
    const packed = encodeToBytes(ANIME_PROTO_TEXT, [{ i: 1, o: [10, 20] }])
    const unpacked = new Uint8Array([
      0x0a,
      6, // Payload 字段 1, 条目长度 6
      0x08,
      1, // i = 1
      0x38,
      10, // o = 10
      0x38,
      20 // o = 20
    ])

    expect(decodePayload('anime', unpacked)).toEqual(decodePayload('anime', packed))
  })

  it('同一 repeated 字段多段出现时追加而不是覆盖 (unpacked + 多段 packed 混现)', () => {
    const bytes = new Uint8Array([
      0x0a,
      10, // Payload 字段 1, 条目长度 10
      0x38,
      5, // o = 5 (unpacked)
      0x3a,
      2,
      10,
      20, // packed 段 1: [10, 20]
      0x3a,
      2,
      30,
      40 // packed 段 2: [30, 40]
    ])

    expect(decodePayload('anime', bytes)).toEqual([{ o: [5, 10, 20, 30, 40] }])
  })

  it('未知字段被跳过不报错 (前向兼容)', () => {
    // 条目内字段 99 wire type 0 varint + 正常字段
    const bytes = new Uint8Array([
      0x0a,
      5, // Payload 字段 1, 条目长度 5
      0x98,
      0x06,
      1, // 字段 99 = 1
      0x08,
      1 // i = 1
    ])

    expect(decodePayload('anime', bytes)).toEqual([{ i: 1 }])
  })

  it('字段 wire type 不匹配时跳过而不是误读', () => {
    // 字段 1 (int32 i) 以 wire type 2 出现: 视为未知字段跳过
    const bytes = new Uint8Array([
      0x0a,
      5, // Payload 字段 1, 条目长度 5
      0x0a,
      1,
      1, // 字段 1 wire type 2, 长度 1
      0x08,
      2 // i = 2
    ])

    expect(decodePayload('anime', bytes)).toEqual([{ i: 2 }])
  })

  it('bin 字节截断时抛出错误', () => {
    const bytes = encodeToBytes(ANIME_PROTO_TEXT, [{ i: 1 }])
    const truncated = bytes.slice(0, bytes.length - 1)

    expect(() => decodePayload('anime', truncated)).toThrow()
  })

  it('bin 字节损坏时抛出错误', () => {
    // field 1 wire type 5 (fixed32) 声明但长度不足
    expect(() => decodePayload('anime', new Uint8Array([0x0d, 1, 2]))).toThrow()
  })
})
