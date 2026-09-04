/*
 * @Author: czy0729
 * @Date: 2026-08-23 21:11:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 13:06:58
 *
 * 原生端 decode 集成测试：
 * 仅 mock 资源加载层（expo-asset / expo-file-system），
 * 使用真实 protobufjs 构造二进制数据，验证 bin 解码 → 缓存全链路
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
jest.mock('@assets/proto/anime/bin/index.bin', () => 102, { virtual: true })
jest.mock('@assets/proto/manga/bin/index.bin', () => 202, { virtual: true })
jest.mock('@assets/proto/ja/bin/index.bin', () => 302, { virtual: true })

import { Asset } from 'expo-asset'
import protobuf from 'protobufjs'
import { fromByteArray } from '../../base64'
import { FileSystem } from '../../file-system'
import { cacheMap, promiseMap } from '../cache'
import { decode, get } from '../index'

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

const MANGA_PROTO_TEXT = `
syntax = "proto3";
message Manga {
  int32 i = 1;
  string d = 9;
}
message Payload {
  repeated Manga payload = 1;
}
`

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

const ITEMS = [
  { i: 1, ty: 'CLANNAD' },
  { i: 2, ty: 'AIR' },
  { i: 37519, ty: '化物語' }
]

/** 按生产同款链路（protobufjs 编码）构造 bin 数据的 base64 */
function encodeToBase64(protoText: string, payload: object[]) {
  const { root } = protobuf.parse(protoText)
  const message = root.lookupType('Payload')
  const bytes = message.encode(message.fromObject({ payload } as any)).finish()
  return fromByteArray(bytes)
}

beforeEach(() => {
  // clear 而非 reset：保留 jest.mock 工厂里的实现（如 Asset.fromModule）
  jest.clearAllMocks()
  cacheMap.clear()
  promiseMap.clear()
})

describe('decode 成功链路', () => {
  it('加载 bin 并解码：返回数据、写入缓存、清除进行中状态、get 可同步读取', async () => {
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(
      encodeToBase64(ANIME_PROTO_TEXT, ITEMS)
    )

    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(cacheMap.get('anime')).toEqual(ITEMS)
    expect(promiseMap.has('anime')).toBe(false)
    expect(get('anime')).toEqual(ITEMS)
  })

  it('不同数据源分别解码、缓存互不影响', async () => {
    const mangaItems = [{ i: 9, d: '進撃の巨人' }]
    ;(FileSystem.readAsStringAsync as any).mockImplementation((uri: string) =>
      Promise.resolve(
        String(uri).includes('asset-202')
          ? encodeToBase64(MANGA_PROTO_TEXT, mangaItems)
          : encodeToBase64(ANIME_PROTO_TEXT, ITEMS)
      )
    )

    await expect(decode('manga')).resolves.toEqual(mangaItems)
    expect(get('manga')).toEqual(mangaItems)
    expect(get('anime')).toBeUndefined()
  })
})

describe('decode 并发去重', () => {
  it('并发调用共享同一次解码，后续读取命中缓存且不再触发资源加载', async () => {
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(
      encodeToBase64(ANIME_PROTO_TEXT, ITEMS)
    )

    const first = decode('anime')
    const second = decode('anime')

    await expect(first).resolves.toEqual(ITEMS)
    await expect(second).resolves.toEqual(ITEMS)

    // 第三次直接命中缓存
    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(Asset.fromModule as any).toHaveBeenCalledTimes(1)
    expect(FileSystem.readAsStringAsync).toHaveBeenCalledTimes(1)
  })
})

describe('decode 字典类数据集', () => {
  it('decode(ja) 将 Pair 数组还原为 Record', async () => {
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue(
      encodeToBase64(PAIR_PROTO_TEXT, [
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
    ;(FileSystem.readAsStringAsync as any).mockRejectedValue(new Error('disk down'))

    await expect(decode('anime')).rejects.toBe('Error decode file')

    expect(promiseMap.has('anime')).toBe(false)
    expect(cacheMap.has('anime')).toBe(false)
    expect(get('anime')).toBeUndefined()
  })

  it('bin 数据为空时按失败处理', async () => {
    ;(FileSystem.readAsStringAsync as any).mockResolvedValue('')

    await expect(decode('anime')).rejects.toBe('Error decode file')
    expect(cacheMap.has('anime')).toBe(false)
  })

  it('失败时并发等待者一起 reject，不写缓存', async () => {
    let rejectRead: (error: Error) => void
    ;(FileSystem.readAsStringAsync as any).mockImplementation(
      () => new Promise((_, reject) => (rejectRead = reject))
    )

    const first = decode('anime')
    const second = decode('anime')
    rejectRead!(new Error('disk down'))

    await expect(first).rejects.toBe('Error decode file')
    await expect(second).rejects.toBe('Error decode file')
    expect(cacheMap.has('anime')).toBe(false)
  })

  it('失败后可重试：下次调用重新发起加载并成功解码', async () => {
    ;(FileSystem.readAsStringAsync as any)
      .mockRejectedValueOnce(new Error('disk down'))
      .mockResolvedValue(encodeToBase64(ANIME_PROTO_TEXT, ITEMS))

    await expect(decode('anime')).rejects.toBe('Error decode file')
    await expect(decode('anime')).resolves.toEqual(ITEMS)

    expect(cacheMap.get('anime')).toEqual(ITEMS)
    expect(FileSystem.readAsStringAsync).toHaveBeenCalledTimes(2)
  })
})
