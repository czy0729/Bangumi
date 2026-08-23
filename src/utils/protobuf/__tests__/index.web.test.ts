/*
 * @Author: czy0729
 * @Date: 2026-08-23 21:11:10
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-23 21:11:10
 *
 * Web 端 decode 集成测试：
 * fetch 拉 proto 文本与 bin 字节，走真实 protobufjs 解码与共享缓存逻辑
 */
import protobuf from 'protobufjs'
import { decode } from '../index.web'
import { cacheMap, lockMap } from '../utils'

const PROTO_TEXT = `
syntax = "proto3";
message Item {
  int32 i = 1;
  string n = 2;
}
message Payload {
  repeated Item payload = 1;
}
`

const ITEMS = [
  { i: 1, n: 'CLANNAD' },
  { i: 2, n: 'AIR' }
]

/** 构造与生产同款的 bin 二进制 */
function encodeItemsToBytes(items: typeof ITEMS) {
  const { root } = protobuf.parse(PROTO_TEXT)
  const message = root.lookupType('Payload')
  return message.encode(message.fromObject({ payload: items })).finish()
}

function mockFetchSuccess(items: typeof ITEMS) {
  const bytes = encodeItemsToBytes(items)
  ;(global as any).fetch = jest.fn((url: string) => {
    if (String(url).endsWith('proto/index.proto')) {
      return Promise.resolve({ text: () => Promise.resolve(PROTO_TEXT) })
    }
    // finish() 在 Node 下返回池化 Buffer，需拷贝出精确大小的 ArrayBuffer
    return Promise.resolve({
      arrayBuffer: () => Promise.resolve(new Uint8Array(bytes).buffer)
    })
  })
}

beforeEach(() => {
  jest.clearAllMocks()
  cacheMap.clear()
  lockMap.clear()
})

describe('decode (web) 成功链路', () => {
  it('加载并解码：返回数据、写入缓存、释放锁', async () => {
    mockFetchSuccess(ITEMS)

    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(cacheMap.get('anime')).toEqual(ITEMS)
    expect(lockMap.get('anime')).toBe(false)
  })

  it('命中缓存后不再发起请求', async () => {
    mockFetchSuccess(ITEMS)
    await decode('anime')

    const calls = (global as any).fetch.mock.calls.length
    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect((global as any).fetch.mock.calls.length).toBe(calls)
  })
})

describe('decode (web) 失败语义', () => {
  it('fetch 失败时 reject 并在 finally 中释放锁', async () => {
    ;(global as any).fetch = jest.fn(() => Promise.reject(new Error('network down')))

    await expect(decode('anime')).rejects.toBe('Error decode file')
    expect(lockMap.get('anime')).toBe(false)
    expect(cacheMap.has('anime')).toBe(false)
  })

  it('bin 数据损坏导致解码失败时同样释放锁', async () => {
    ;(global as any).fetch = jest.fn((url: string) => {
      if (String(url).endsWith('proto/index.proto')) {
        return Promise.resolve({ text: () => Promise.resolve(PROTO_TEXT) })
      }
      // 合法 proto 但内容不是有效 Payload 编码
      return Promise.resolve({
        arrayBuffer: () => Promise.resolve(new Uint8Array([9, 9, 9, 9]).buffer)
      })
    })

    await expect(decode('anime')).rejects.toBe('Error decode file')
    expect(lockMap.get('anime')).toBe(false)
    expect(cacheMap.has('anime')).toBe(false)
  })
})
