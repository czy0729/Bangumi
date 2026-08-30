/*
 * @Author: czy0729
 * @Date: 2026-08-30 23:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 03:33:38
 *
 * setStorage 延迟序列化与合并行为测试
 *  - mock 底层 getItem/setItem, 使用真实 JSON.stringify
 *  - 周期间隔 mock 为极长 (定时器不参与), 周期 flush 通过直接调用导出的 flushPendingStorage 驱动
 */
jest.mock('../utils', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}))

jest.mock('../ds', () => ({
  ...jest.requireActual('../ds'),
  // 定时器不参与测试, 周期 flush 由直接调用 flushPendingStorage 驱动
  LAZY_SET_STORAGE_INTERVAL: 3600000
}))

import { CACHE_MAP, PENDING_MAP, SIZE_MAP } from '../ds'
import { flushPendingStorage, getStorage, setStorage } from '../index'
import { getItem, setItem } from '../utils'

const LAZY_SET_STORAGE_SIZE = 1024 * 20

const setItemMock = setItem as jest.Mock
const getItemMock = getItem as jest.Mock

/** 大于 20KB 阈值的字符串数据 */
const bigData = () => ({ v: 'x'.repeat(LAZY_SET_STORAGE_SIZE + 1024) })

/** 等待 setTimeout(0) 小键 flush 执行 */
const tick = () => new Promise(resolve => setTimeout(resolve, 5))

beforeEach(() => {
  jest.clearAllMocks()
  setItemMock.mockResolvedValue(undefined)
  CACHE_MAP.clear()
  PENDING_MAP.clear()
  SIZE_MAP.clear()
})

describe('小键', () => {
  it('下一轮事件循环序列化并立即落盘 (脱离调用方同步路径)', async () => {
    setStorage('small', { a: 1 })
    // 登记阶段不落盘
    expect(setItemMock).not.toHaveBeenCalled()

    await tick()

    expect(setItemMock).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith('small', '{"a":1}')
  })

  it('同 key 连续保存合并为最后一次, 只序列化一次', async () => {
    const stringifySpy = jest.spyOn(JSON, 'stringify')

    setStorage('small', { v: 1 })
    setStorage('small', { v: 2 })
    setStorage('small', { v: 3 })

    await tick()

    expect(setItemMock).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith('small', '{"v":3}')
    expect(stringifySpy).toHaveBeenCalledTimes(1)
    stringifySpy.mockRestore()
  })

  it('不同 key 各自落盘', async () => {
    setStorage('a', { a: 1 })
    setStorage('b', { b: 2 })

    await tick()

    expect(setItemMock).toHaveBeenCalledTimes(2)
  })
})

describe('大键', () => {
  it('首次保存: tick 时序列化但不落盘, 进 CACHE_MAP 等 flush', async () => {
    setStorage('big', bigData())

    await tick()
    expect(setItemMock).not.toHaveBeenCalled()
    expect(CACHE_MAP.has('big')).toBe(true)

    await flushPendingStorage()
    expect(setItemMock).toHaveBeenCalledWith('big', expect.stringContaining('xxx'))
  })

  it('已知大键的后续保存延迟到周期 flush, 多次保存只序列化一次', async () => {
    const stringifySpy = jest.spyOn(JSON, 'stringify')

    // 首次: 学习为大键
    setStorage('big', bigData())
    await tick()
    await flushPendingStorage()

    stringifySpy.mockClear()

    // 已知大键: 多次保存合并, 直接调用的 flush 才序列化一次
    setStorage('big', { v: 1 })
    setStorage('big', { v: 2 })
    setStorage('big', { v: 3 })
    await tick()
    expect(stringifySpy).not.toHaveBeenCalled()

    await flushPendingStorage()
    expect(stringifySpy).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith('big', '{"v":3}')
    stringifySpy.mockRestore()
  })

  it('大键变小后在下一个周期自适应回小键路径', async () => {
    setStorage('key', bigData())
    await tick()
    await flushPendingStorage()
    setItemMock.mockClear()

    // 变小: 第一个周期按已知大键处理 (此时学习到新体积), 下次保存即回小键路径
    setStorage('key', { v: 'small' })
    await flushPendingStorage()
    expect(setItemMock).toHaveBeenCalledWith('key', '{"v":"small"}')
    setItemMock.mockClear()

    setStorage('key', { v: 'small2' })
    await tick()
    expect(setItemMock).toHaveBeenCalledWith('key', '{"v":"small2"}')
  })

  it('小键变大后自适应进 CACHE_MAP', async () => {
    setStorage('key', { v: 'small' })
    await tick()
    setItemMock.mockClear()

    setStorage('key', bigData())
    await tick()

    expect(setItemMock).not.toHaveBeenCalled()
    expect(CACHE_MAP.has('key')).toBe(true)
  })
})

describe('异常', () => {
  it('序列化抛异常 (循环引用) 不炸 flush, 也不落盘', async () => {
    const a: any = {}
    a.self = a
    setStorage('circular', a)

    await tick()
    expect(setItemMock).not.toHaveBeenCalled()
    expect(CACHE_MAP.size).toBe(0)
    expect(PENDING_MAP.size).toBe(0)
  })

  it('key 为空直接忽略', async () => {
    setStorage('', { a: 1 })

    await tick()
    expect(setItemMock).not.toHaveBeenCalled()
  })
})

describe('getStorage', () => {
  it('读取并反序列化', async () => {
    getItemMock.mockResolvedValue('{"a":1}')

    await expect(getStorage('k')).resolves.toEqual({ a: 1 })
  })

  it('解析失败返回 null', async () => {
    getItemMock.mockResolvedValue('not json')

    await expect(getStorage('k')).resolves.toBeNull()
  })
})
