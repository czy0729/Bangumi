/*
 * @Author: czy0729
 * @Date: 2026-08-23 21:11:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:45:01
 *
 * 原生端 decode 集成测试：
 * 仅 mock 资源加载层（expo-asset / expo-file-system / fetch），
 * 使用真实 protobufjs 构造二进制数据，验证 proto 解析 → bin 解码 → 缓存全链路
 */
jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn((module: number) => ({
      localUri: `file://asset-${module}`,
      downloadAsync: jest.fn()
    }))
  }
}))

jest.mock('expo-file-system/legacy', () => ({
  readAsStringAsync: jest.fn(),
  EncodingType: { Base64: 'base64' }
}))

// 资源模块虚拟化，仅提供稳定 ID 供 Asset.fromModule 区分
jest.mock('@assets/proto/anime/proto/index.proto', () => 101, { virtual: true })
jest.mock('@assets/proto/anime/bin/index.bin', () => 102, { virtual: true })
jest.mock('@assets/proto/manga/proto/index.proto', () => 201, { virtual: true })
jest.mock('@assets/proto/manga/bin/index.bin', () => 202, { virtual: true })
jest.mock('@assets/proto/ja/proto/index.proto', () => 301, { virtual: true })
jest.mock('@assets/proto/ja/bin/index.bin', () => 302, { virtual: true })

import { fromByteArray } from 'base64-js'
import protobuf from 'protobufjs'
import { FileSystem } from '../../thirdParty/file-system'
import { cacheMap, promiseMap } from '../cache'
import { decode, get } from '../index'

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
  { i: 2, n: 'AIR' },
  { i: 37519, n: '化物語' }
]

/** 按生产同款链路（protobufjs 编码）构造 bin 数据的 base64 */
function encodeItemsToBase64(items: typeof ITEMS) {
  const { root } = protobuf.parse(PROTO_TEXT)
  const message = root.lookupType('Payload')
  const bytes = message.encode(message.fromObject({ payload: items })).finish()
  return fromByteArray(bytes)
}

function mockFetchText(text: string) {
  ;(global as any).fetch = jest.fn(() => Promise.resolve({ text: () => Promise.resolve(text) }))
}

beforeEach(() => {
  // clear 而非 reset：保留 jest.mock 工厂里的实现（如 Asset.fromModule）
  jest.clearAllMocks()
  cacheMap.clear()
  promiseMap.clear()
})

describe('decode 成功链路', () => {
  it('加载 proto/bin 并解码：返回数据、写入缓存、清除进行中状态、get 可同步读取', async () => {
    mockFetchText(PROTO_TEXT)
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(encodeItemsToBase64(ITEMS))

    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(cacheMap.get('anime')).toEqual(ITEMS)
    expect(promiseMap.has('anime')).toBe(false)
    expect(get('anime')).toEqual(ITEMS)
  })

  it('不同数据源分别解码、缓存互不影响', async () => {
    const mangaItems = [{ i: 9, n: '進撃の巨人' }]
    mockFetchText(PROTO_TEXT)
    ;(FileSystem.readAsStringAsync as any).mockImplementation(() =>
      Promise.resolve(encodeItemsToBase64(mangaItems))
    )

    await expect(decode('manga')).resolves.toEqual(mangaItems)
    expect(get('manga')).toEqual(mangaItems)
    expect(get('anime')).toBeUndefined()
  })
})

describe('decode 并发去重', () => {
  it('并发调用共享同一次解码，后续读取命中缓存且不再触发资源加载', async () => {
    mockFetchText(PROTO_TEXT)
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(encodeItemsToBase64(ITEMS))

    const first = decode('anime')
    const second = decode('anime')

    await expect(first).resolves.toEqual(ITEMS)
    await expect(second).resolves.toEqual(ITEMS)

    // 第三次直接命中缓存
    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(FileSystem.readAsStringAsync).toHaveBeenCalledTimes(1)
  })
})

describe('decode 字典类数据集', () => {
  const PAIR_PROTO_TEXT = `
syntax = "proto3";
message Pair {
  string k = 1;
  int32 v = 2;
}
message Payload {
  repeated Pair payload = 1;
}
`

  function encodePairsToBase64(pairs: { k: string; v: number }[]) {
    const { root } = protobuf.parse(PAIR_PROTO_TEXT)
    const message = root.lookupType('Payload')
    const bytes = message.encode(message.fromObject({ payload: pairs })).finish()
    return fromByteArray(bytes)
  }

  it('decode(ja) 将 Pair 数组还原为 Record', async () => {
    mockFetchText(PAIR_PROTO_TEXT)
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(
      encodePairsToBase64([
        { k: '86', v: 302189 },
        { k: 'AIR', v: 828 }
      ])
    )

    await expect(decode('ja')).resolves.toEqual({ 86: 302189, AIR: 828 })
    expect(get('ja')).toEqual({ 86: 302189, AIR: 828 })
  })
})

describe('decode 失败语义', () => {
  it('资源加载失败时 reject、不写缓存、清除进行中状态', async () => {
    ;(global as any).fetch = jest.fn(() => Promise.reject(new Error('network down')))
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(encodeItemsToBase64(ITEMS))

    await expect(decode('anime')).rejects.toBe('Error decode file')

    expect(promiseMap.has('anime')).toBe(false)
    expect(cacheMap.has('anime')).toBe(false)
    expect(get('anime')).toBeUndefined()
  })

  it('proto 内容为空时按失败处理', async () => {
    mockFetchText('')
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(encodeItemsToBase64(ITEMS))

    await expect(decode('anime')).rejects.toBe('Error decode file')
    expect(cacheMap.has('anime')).toBe(false)
  })

  it('失败时并发等待者一起 reject，不写缓存', async () => {
    let rejectFetch: (error: Error) => void
    ;(global as any).fetch = jest.fn(() => new Promise((_, reject) => (rejectFetch = reject)))
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(encodeItemsToBase64(ITEMS))

    const first = decode('anime')
    const second = decode('anime')
    rejectFetch!(new Error('network down'))

    await expect(first).rejects.toBe('Error decode file')
    await expect(second).rejects.toBe('Error decode file')
    expect(cacheMap.has('anime')).toBe(false)
  })

  it('失败后可重试：下次调用重新发起加载并成功解码', async () => {
    ;(global as any).fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('network down'))
      .mockImplementation(() => Promise.resolve({ text: () => Promise.resolve(PROTO_TEXT) }))
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(encodeItemsToBase64(ITEMS))

    await expect(decode('anime')).rejects.toBe('Error decode file')
    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(cacheMap.get('anime')).toEqual(ITEMS)
    expect((global as any).fetch).toHaveBeenCalledTimes(2)
  })
})
