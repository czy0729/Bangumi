/*
 * @Author: czy0729
 * @Date: 2026-08-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 00:00:00
 */

/** 缩小上限常量以便在单测中触发数量超限淘汰 */
jest.mock('../ds', () => ({
  __esModule: true,
  BASE_DIR: '/cache/expo-image-cache/',
  LEGACY_BASE_DIR: '/legacy-cache/expo-image-cache/',
  MAX_CACHE_FILES: 2,
  MAX_CACHE_SIZE: 100,
  TMP_TTL: 24 * 60 * 60 * 1000
}))

jest.mock('../../file-system', () => ({
  FileSystem: {
    documentDirectory: '/cache/',
    makeDirectoryAsync: jest.fn(),
    readDirectoryAsync: jest.fn(),
    downloadAsync: jest.fn(),
    moveAsync: jest.fn(),
    getInfoAsync: jest.fn(),
    deleteAsync: jest.fn()
  }
}))

import { SHA1 } from '@utils/crypto'
import { logger } from '@utils/dev'
import { FileSystem } from '../../file-system'
import {
  classifyEntries,
  cleanupCache,
  getCacheNames,
  getEntry,
  invalidate,
  pickOverflow,
  resetSession,
  sizeFromHeaders
} from '../utils'

import type { CacheFile } from '../type'

/** 测试用文件系统 mock 访问器 */
interface FsMock {
  makeDirectoryAsync: jest.Mock
  readDirectoryAsync: jest.Mock
  downloadAsync: jest.Mock
  moveAsync: jest.Mock
  getInfoAsync: jest.Mock
  deleteAsync: jest.Mock
}

const fs = FileSystem as unknown as FsMock

const sha1 = (uri: string) => SHA1(uri)

beforeEach(() => {
  jest.resetAllMocks()
  resetSession()

  fs.makeDirectoryAsync.mockResolvedValue(undefined)
  fs.readDirectoryAsync.mockResolvedValue([])
  fs.moveAsync.mockResolvedValue(undefined)
  fs.deleteAsync.mockResolvedValue(undefined)
  fs.getInfoAsync.mockResolvedValue({ exists: false })
})

describe('getCacheNames', () => {
  it('sha1 主键 + 扩展名推导', () => {
    const uri = 'https://lain.bgm.tv/pic/cover/l/a.jpg'
    const { name, tmpName, path } = getCacheNames(uri)

    expect(name).toBe(`${sha1(uri)}.jpg`)
    expect(tmpName).toBe(`${sha1(uri)}.tmp`)
    expect(path).toBe(`/cache/expo-image-cache/${name}`)
  })

  it('query 不参与扩展名判定', () => {
    const uri = 'https://lain.bgm.tv/pic/b.png?v=2&t=3'
    expect(getCacheNames(uri).name.endsWith('.png')).toBe(true)
  })

  it('无扩展名默认 .jpg (含点号出现在 host 的情形)', () => {
    expect(getCacheNames('https://lain.bgm.tv/a/b').name.endsWith('.jpg')).toBe(true)
    expect(getCacheNames('https://a.b.c/d').name.endsWith('.jpg')).toBe(true)
  })
})

describe('classifyEntries', () => {
  it('分离有效文件与 tmp 残留', () => {
    const { files, tmps } = classifyEntries(['a.jpg', 'b.tmp', 'c.png'])

    expect([...files].sort()).toEqual(['a.jpg', 'c.png'])
    expect(tmps).toEqual(['b.tmp'])
  })

  it('空目录', () => {
    expect(classifyEntries([])).toEqual({ files: new Set(), tmps: [] })
  })
})

describe('pickOverflow', () => {
  const file = (uri: string, time: number, size: number): CacheFile => ({ uri, time, size })

  it('未超限返回空', () => {
    const files = [file('a', 3, 10), file('b', 2, 10)]

    expect(pickOverflow(files, 2, 100)).toEqual([])
  })

  it('数量超限淘汰最旧', () => {
    const files = [file('new', 30, 10), file('mid', 20, 10), file('old', 10, 10)]
    const result = pickOverflow(files, 2, 100000)

    expect(result.map(item => item.uri)).toEqual(['old'])
  })

  it('容量超限淘汰最旧', () => {
    const files = [file('n1', 30, 10), file('n2', 20, 10), file('n3', 10, 10)]
    const result = pickOverflow(files, 100, 25)

    expect(result.map(item => item.uri)).toEqual(['n3'])
  })

  it('恰好等于上限保留全部', () => {
    const files = [file('a', 2, 50), file('b', 1, 50)]

    expect(pickOverflow(files, 2, 100)).toEqual([])
  })

  it('空数组', () => {
    expect(pickOverflow([], 2, 100)).toEqual([])
  })
})

describe('sizeFromHeaders', () => {
  it('标准 Content-Length', () => {
    expect(sizeFromHeaders({ 'Content-Length': '123' })).toBe(123)
  })

  it('小写 key 兼容', () => {
    expect(sizeFromHeaders({ 'content-length': '45' })).toBe(45)
  })

  it('缺失或非法返回 0', () => {
    expect(sizeFromHeaders()).toBe(0)
    expect(sizeFromHeaders({ 'Content-Length': 'abc' })).toBe(0)
    expect(sizeFromHeaders({ 'Content-Length': '-5' })).toBe(0)
  })
})

describe('CacheEntry.getPath', () => {
  const URI_A = 'https://lain.bgm.tv/pic/cover/a.jpg'

  it('索引构建时一次性清理旧版缓存目录 (孤儿迁移)', async () => {
    await getEntry(URI_A, {}).getPath()

    expect(fs.deleteAsync).toHaveBeenCalledTimes(1)
    expect(fs.deleteAsync).toHaveBeenCalledWith('/legacy-cache/expo-image-cache/', {
      idempotent: true
    })
  })

  it('磁盘命中: 零下载直接返回本地路径', async () => {
    fs.readDirectoryAsync.mockResolvedValue([`${sha1(URI_A)}.jpg`])

    const result = await getEntry(URI_A, {}).getPath()

    expect(result).toEqual({
      path: `/cache/expo-image-cache/${sha1(URI_A)}.jpg`,
      size: 0
    })
    expect(fs.downloadAsync).not.toHaveBeenCalled()
  })

  it('miss 下载成功: 写入后回填大小与索引', async () => {
    fs.downloadAsync.mockResolvedValue({ status: 200, headers: { 'Content-Length': '123' } })

    const result = await getEntry(URI_A, { headers: { Referer: 'https://bgm.tv/' } }).getPath()

    expect(fs.downloadAsync).toHaveBeenCalledWith(
      URI_A,
      `/cache/expo-image-cache/${sha1(URI_A)}.jpg.tmp`,
      { headers: { Referer: 'https://bgm.tv/' } }
    )
    expect(fs.moveAsync).toHaveBeenCalledWith({
      from: `/cache/expo-image-cache/${sha1(URI_A)}.jpg.tmp`,
      to: `/cache/expo-image-cache/${sha1(URI_A)}.jpg`
    })
    expect(result).toEqual({
      path: `/cache/expo-image-cache/${sha1(URI_A)}.jpg`,
      size: 123
    })

    // 同条目二次获取复用加载状态, 不再触发下载
    await getEntry(URI_A, {}).getPath()
    expect(fs.downloadAsync).toHaveBeenCalledTimes(1)
  })

  it('非 200 返回 undefined 且允许下次重试', async () => {
    fs.downloadAsync.mockResolvedValue({ status: 404, headers: {} })

    const entry = getEntry(URI_A, {})
    await expect(entry.getPath()).resolves.toBeUndefined()
    await expect(entry.getPath()).resolves.toBeUndefined()

    expect(fs.downloadAsync).toHaveBeenCalledTimes(2)
  })

  it('下载异常抛出且允许下次重试', async () => {
    fs.downloadAsync.mockRejectedValue(new Error('network down'))

    const entry = getEntry(URI_A, {})
    await expect(entry.getPath()).rejects.toThrow('network down')
    await expect(entry.getPath()).rejects.toThrow('network down')

    expect(fs.downloadAsync).toHaveBeenCalledTimes(2)
  })

  it('invalidate 后重新下载 (自愈闭环)', async () => {
    fs.downloadAsync.mockResolvedValue({ status: 200, headers: { 'Content-Length': '1' } })

    const entry = getEntry(URI_A, {})
    await entry.getPath()
    expect(fs.downloadAsync).toHaveBeenCalledTimes(1)

    invalidate(URI_A)
    // flush invalidate 内部的异步索引删除
    await new Promise(resolve => setTimeout(resolve, 0))

    await getEntry(URI_A, {}).getPath()
    expect(fs.downloadAsync).toHaveBeenCalledTimes(2)
  })

  it('resetSession 后索引重建', async () => {
    await getEntry(URI_A, {}).getPath()
    expect(fs.readDirectoryAsync).toHaveBeenCalledTimes(1)

    resetSession()
    await getEntry(URI_A, {}).getPath()
    expect(fs.readDirectoryAsync).toHaveBeenCalledTimes(2)
  })

  it('并发调用共享一次目录索引构建', async () => {
    await Promise.all([
      getEntry('https://a/x.jpg', {}).getPath(),
      getEntry('https://a/y.jpg', {}).getPath()
    ])

    expect(fs.readDirectoryAsync).toHaveBeenCalledTimes(1)
  })
})

describe('cleanupCache', () => {
  it('未超限: 不做全量 stat 与删除, 输出会话汇总', async () => {
    fs.readDirectoryAsync.mockResolvedValue(['a.jpg'])

    await cleanupCache()

    expect(fs.getInfoAsync).not.toHaveBeenCalled()
    expect(fs.deleteAsync).not.toHaveBeenCalled()
    expect(logger.warn).toHaveBeenCalledWith(
      'ImageCache',
      expect.stringContaining('hits='),
      'cleanup none'
    )
  })

  it('回收超过 TTL 的 tmp 残留', async () => {
    const nowSec = Math.floor(Date.now() / 1000)
    fs.readDirectoryAsync.mockResolvedValue(['a.jpg', 'stale.tmp', 'fresh.tmp'])
    fs.getInfoAsync.mockImplementation(async (uri: string) => {
      if (uri.endsWith('stale.tmp')) return { exists: true, modificationTime: nowSec - 25 * 3600 }
      if (uri.endsWith('fresh.tmp')) return { exists: true, modificationTime: nowSec }

      return { exists: true, modificationTime: nowSec, size: 10 }
    })

    await cleanupCache()

    const removed = fs.deleteAsync.mock.calls.map(call => call[0])
    expect(removed).toContain('/cache/expo-image-cache/stale.tmp')
    expect(removed).not.toContain('/cache/expo-image-cache/fresh.tmp')
    expect(removed).not.toContain('/cache/expo-image-cache/a.jpg')
  })

  it('数量超限: 全量 stat 后按最旧淘汰并同步索引', async () => {
    const nowSec = Math.floor(Date.now() / 1000)
    fs.readDirectoryAsync.mockResolvedValue(['f1.jpg', 'f2.jpg', 'f3.jpg'])
    // f1 最旧, f3 最新
    fs.getInfoAsync.mockImplementation(async (uri: string) => ({
      exists: true,
      modificationTime: nowSec - (4 - Number(uri.match(/f(\d)/)?.[1])),
      size: 10
    }))

    await cleanupCache()

    // MAX_CACHE_FILES=2: f3/f2 保留, f1 最旧被淘汰
    const removed = fs.deleteAsync.mock.calls.map(call => call[0])
    expect(removed).toEqual(['/cache/expo-image-cache/f1.jpg'])
  })

  it('目录读取失败走错误日志且不抛出', async () => {
    fs.readDirectoryAsync.mockRejectedValue(new Error('boom'))

    await expect(cleanupCache()).resolves.toBeUndefined()
    expect(logger.error).toHaveBeenCalled()
  })
})
