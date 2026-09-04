/*
 * @Author: czy0729
 * @Date: 2026-08-23 21:11:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 07:30:00
 *
 * Web 端 decode 集成测试：
 * fetch 拉 bin 字节，走自研解码与共享缓存逻辑
 */
import protobuf from 'protobufjs'
import { cacheMap, promiseMap } from '../cache'
import { decode } from '../index.web'

const ANIME_PROTO_TEXT = `
syntax = "proto3";
message Anime {
  int32 i = 1;
  string ty = 6;
}
message Payload {
  repeated Anime payload = 1;
}
`

const PAIR_PROTO_TEXT = `
syntax = "proto3";
message Pair {
  string k = 1;
  string v = 2;
}
message Payload {
  repeated Pair payload = 1;
}
`

const ITEMS = [
  { i: 1, ty: 'CLANNAD' },
  { i: 2, ty: 'AIR' }
]

/** 构造与生产同款的 bin 二进制 */
function encodeToBytes(protoText: string, payload: object[]) {
  const { root } = protobuf.parse(protoText)
  const message = root.lookupType('Payload')
  return new Uint8Array(message.encode(message.fromObject({ payload } as any)).finish())
}

function mockFetchSuccess(protoText: string, items: object[]) {
  const bytes = encodeToBytes(protoText, items)
  ;(global as any).fetch = jest.fn(() =>
    Promise.resolve({
      // finish() 在 Node 下返回池化 Buffer，需拷贝出精确大小的 ArrayBuffer
      arrayBuffer: () => Promise.resolve(bytes.slice().buffer)
    })
  )
}

beforeEach(() => {
  jest.clearAllMocks()
  cacheMap.clear()
  promiseMap.clear()
})

describe('decode (web) 成功链路', () => {
  it('加载并解码：返回数据、写入缓存、清除进行中状态', async () => {
    mockFetchSuccess(ANIME_PROTO_TEXT, ITEMS)

    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(cacheMap.get('anime')).toEqual(ITEMS)
    expect(promiseMap.has('anime')).toBe(false)
  })

  it('命中缓存后不再发起请求', async () => {
    mockFetchSuccess(ANIME_PROTO_TEXT, ITEMS)
    await decode('anime')

    const calls = (global as any).fetch.mock.calls.length
    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect((global as any).fetch.mock.calls.length).toBe(calls)
  })

  it('并发调用共享同一次请求', async () => {
    mockFetchSuccess(ANIME_PROTO_TEXT, ITEMS)

    const first = decode('anime')
    const second = decode('anime')

    await expect(first).resolves.toEqual(ITEMS)
    await expect(second).resolves.toEqual(ITEMS)
    // 并发共享一次解码, 只拉取一份 bin
    expect((global as any).fetch).toHaveBeenCalledTimes(1)
  })

  it('decode(katakana) 将 Pair 数组还原为 Record', async () => {
    mockFetchSuccess(PAIR_PROTO_TEXT, [{ k: 'マギカ', v: 'Magica' }])

    await expect(decode('katakana')).resolves.toEqual({ マギカ: 'Magica' })
    expect(cacheMap.get('katakana')).toEqual({ マギカ: 'Magica' })
  })
})

describe('decode (web) 失败语义', () => {
  it('fetch 失败时 reject、不写缓存、清除进行中状态', async () => {
    ;(global as any).fetch = jest.fn(() => Promise.reject(new Error('network down')))

    await expect(decode('anime')).rejects.toBe('Error decode file')
    expect(promiseMap.has('anime')).toBe(false)
    expect(cacheMap.has('anime')).toBe(false)
  })

  it('bin 数据损坏导致解码失败时同样不写缓存', async () => {
    ;(global as any).fetch = jest.fn(() =>
      Promise.resolve({
        // 不是有效 Payload 编码
        arrayBuffer: () => Promise.resolve(new Uint8Array([9, 9, 9, 9]).buffer)
      })
    )

    await expect(decode('anime')).rejects.toBe('Error decode file')
    expect(promiseMap.has('anime')).toBe(false)
    expect(cacheMap.has('anime')).toBe(false)
  })

  it('失败后可重试：下次调用重新发起请求并成功解码', async () => {
    const bytes = encodeToBytes(ANIME_PROTO_TEXT, ITEMS)
    let shouldFail = true
    ;(global as any).fetch = jest.fn(() => {
      if (shouldFail) return Promise.reject(new Error('network down'))
      return Promise.resolve({
        arrayBuffer: () => Promise.resolve(bytes.slice().buffer)
      })
    })

    await expect(decode('anime')).rejects.toBe('Error decode file')

    shouldFail = false
    await expect(decode('anime')).resolves.toEqual(ITEMS)
    expect(cacheMap.get('anime')).toEqual(ITEMS)
  })
})
