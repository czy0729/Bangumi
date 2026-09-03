/*
 * @Author: czy0729
 * @Date: 2026-08-23 13:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 02:42:11
 *
 * Store Legacy / 主实现 差分等价测试
 * 同一输入序列分别驱动两版实现, 断言状态内容、返回值、副作用序列一致
 */
import { autorun, isObservable, observable, toJS } from 'mobx'
import StoreModern from '../index'
import LegacyStore from '../legacy'
import * as storeUtils from '../utils'

// 覆盖 jest.setup.js 的精简 mobx mock, 差分测试需要真实实现
jest.mock('mobx', () => jest.requireActual('mobx'))

const FIXED_TS = 1700000000

jest.mock('@src/config', () => ({
  __esModule: true,
  DEV: false
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockSetStorage = jest.fn((_key: string, _data: unknown) => Promise.resolve())
const mockStorageMap = new Map<string, unknown>()

jest.mock('../../storage', () => ({
  __esModule: true,
  setStorage: (key: string, data: unknown) => {
    mockStorageMap.set(key, data)
    return mockSetStorage(key, data)
  }
}))

jest.mock('../../storage/utils', () => ({
  __esModule: true,
  getItem: (key: string) =>
    Promise.resolve(mockStorageMap.has(key) ? JSON.stringify(mockStorageMap.get(key)) : null)
}))

const mockFetch = jest.fn()

jest.mock('../../fetch', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockFetch(...args),
  queue: (fns: (() => unknown)[]) => Promise.all(fns.map(fn => fn()))
}))

const mockFetchSubjectV0 = jest.fn()

jest.mock('../../fetch.v0', () => ({
  __esModule: true,
  fetchSubjectV0: (...args: unknown[]) => mockFetchSubjectV0(...args)
}))

jest.mock('../../utils', () => ({
  __esModule: true,
  getTimestamp: () => FIXED_TS,
  omit: (obj: Record<string, unknown>, keys: string[]) => {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
  }
}))

jest.mock('@constants/data', () => ({
  ...jest.requireActual('@constants/data'),
  LIST_EMPTY: {
    list: [],
    pagination: { page: 0, pageTotal: 0 },
    _list: []
  }
}))

import type { WritableState } from '../types'
/** 与子类 store 实际形态一致的种子状态 */
const createState = () =>
  observable({
    loading: false,
    count: 0,
    subject: {} as Record<string, unknown>,
    list: [] as unknown[],
    map: {} as Record<string, unknown>
  })

type SeedState = ReturnType<typeof createState>

/** 读取实例状态的类型化视图 */
const seedOf = (store: { state: unknown }) => store.state as SeedState

/** fetch 入库后的条目形状(用于断言) */
type FetchedSubject = { name: string; tags: { id: number }[] }

const createPair = () => ({
  v1: new LegacyStore<SeedState>(createState()),
  v2: new StoreModern<SeedState>(createState())
})

const expectSameState = (v1: { state: unknown }, v2: { state: unknown }) =>
  expect(toJS(v1.state)).toEqual(toJS(v2.state))

beforeEach(() => {
  mockFetch.mockReset()
  mockFetchSubjectV0.mockReset()
  mockSetStorage.mockClear()
  mockStorageMap.clear()
})

describe('normalizeFetchConfig', () => {
  it('字符串配置产出 url 形态', () => {
    expect(storeUtils.normalizeFetchConfig('https://api')).toEqual({ url: 'https://api' })
  })

  it('对象配置保留原字段', () => {
    const config = { url: 'https://api', method: 'POST' as const, info: '测试' }
    expect(storeUtils.normalizeFetchConfig(config)).toEqual(config)
  })
})

describe('buildMergeData', () => {
  it('数组 + 列表模式包裹 ListEmpty', () => {
    expect(storeUtils.buildMergeData([{ id: 1 }], true)).toMatchObject({
      list: [{ id: 1 }],
      pagination: { page: 0, pageTotal: 0 },
      _loaded: FIXED_TS
    })
  })

  it('数组非列表模式原样返回', () => {
    expect(storeUtils.buildMergeData([1, 2])).toEqual([1, 2])
  })

  it('对象附加 _loaded', () => {
    expect(storeUtils.buildMergeData({ name: 'a' })).toEqual({ name: 'a', _loaded: FIXED_TS })
  })
})

describe('buildStorageKey', () => {
  it.each([
    ['ns', undefined, 'ns|state'],
    ['ns', 'key', 'ns|key|state'],
    [undefined, undefined, 'undefined|state'],
    [undefined, 'key', 'undefined|key|state']
  ])('(%j, %j) 产出为 %j', (ns, key, expected) => {
    expect(storeUtils.buildStorageKey(ns, key)).toBe(expected)
  })
})

describe('plainClone', () => {
  it('嵌套对象与数组深拷贝且互不共享引用', () => {
    const source = { a: { b: [1, { c: 2 }] } }
    const cloned = storeUtils.plainClone(source)

    expect(cloned).toEqual(source)
    expect(cloned).not.toBe(source)
    expect(cloned.a.b[1]).not.toBe(source.a.b[1])
  })

  it('原始值与其余引用类型原样返回', () => {
    const date = new Date(0)
    expect(storeUtils.plainClone(date)).toBe(date)
    expect(storeUtils.plainClone(1)).toBe(1)
    expect(storeUtils.plainClone(null)).toBe(null)
  })
})

describe('deepEqual', () => {
  it('同一引用返回 true', () => {
    const obj = { a: 1 }
    expect(storeUtils.deepEqual(obj, obj)).toBe(true)
  })

  it('相同原始值返回 true', () => {
    expect(storeUtils.deepEqual(1, 1)).toBe(true)
    expect(storeUtils.deepEqual('foo', 'foo')).toBe(true)
    expect(storeUtils.deepEqual(true, true)).toBe(true)
  })

  it('不同原始值返回 false', () => {
    expect(storeUtils.deepEqual(1, 2)).toBe(false)
    expect(storeUtils.deepEqual('foo', 'bar')).toBe(false)
    expect(storeUtils.deepEqual(true, false)).toBe(false)
  })

  it('NaN 与 NaN 相等 (SameValueZero)', () => {
    expect(storeUtils.deepEqual(NaN, NaN)).toBe(true)
  })

  it('-0 与 +0 相等 (SameValueZero)', () => {
    expect(storeUtils.deepEqual(-0, +0)).toBe(true)
  })

  it('null 与 null 相等', () => {
    expect(storeUtils.deepEqual(null, null)).toBe(true)
  })

  it('undefined 与 undefined 相等', () => {
    expect(storeUtils.deepEqual(undefined, undefined)).toBe(true)
  })

  it('null 与 undefined 不等', () => {
    expect(storeUtils.deepEqual(null, undefined)).toBe(false)
  })

  it('原始值与对象不等', () => {
    expect(storeUtils.deepEqual(1, { 0: 1 })).toBe(false)
    expect(storeUtils.deepEqual('a', ['a'])).toBe(false)
  })

  it('类型不同返回 false (array vs object)', () => {
    expect(storeUtils.deepEqual([1], { 0: 1 })).toBe(false)
  })

  it('空对象相等', () => {
    expect(storeUtils.deepEqual({}, {})).toBe(true)
  })

  it('空数组相等', () => {
    expect(storeUtils.deepEqual([], [])).toBe(true)
  })

  it('相同 key-value 的对象相等', () => {
    expect(storeUtils.deepEqual({ a: 1, b: 'x' }, { a: 1, b: 'x' })).toBe(true)
  })

  it('值不同的对象不等', () => {
    expect(storeUtils.deepEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('key 数量不同的对象不等', () => {
    expect(storeUtils.deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  })

  it('key 名不同的对象不等', () => {
    expect(storeUtils.deepEqual({ a: 1 }, { b: 1 })).toBe(false)
  })

  it('嵌套对象相等', () => {
    const a = { x: { y: { z: [1, 2, 3] } } }
    const b = { x: { y: { z: [1, 2, 3] } } }
    expect(storeUtils.deepEqual(a, b)).toBe(true)
  })

  it('嵌套对象不等', () => {
    const a = { x: { y: 1 } }
    const b = { x: { y: 2 } }
    expect(storeUtils.deepEqual(a, b)).toBe(false)
  })

  it('相同元素的数组相等', () => {
    expect(storeUtils.deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('长度不同的数组不等', () => {
    expect(storeUtils.deepEqual([1, 2], [1, 2, 3])).toBe(false)
  })

  it('元素不同的数组不等', () => {
    expect(storeUtils.deepEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  it('数组嵌套对象相等', () => {
    expect(storeUtils.deepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true)
  })

  it('数组嵌套对象不等', () => {
    expect(storeUtils.deepEqual([{ a: 1 }], [{ a: 2 }])).toBe(false)
  })

  it('混合结构相等', () => {
    const a = {
      list: [
        { id: 1, tags: ['a', 'b'] },
        { id: 2, tags: [] }
      ],
      total: 2
    }
    const b = {
      list: [
        { id: 1, tags: ['a', 'b'] },
        { id: 2, tags: [] }
      ],
      total: 2
    }
    expect(storeUtils.deepEqual(a, b)).toBe(true)
  })

  it('Date 按值比较', () => {
    const date = new Date(0)
    expect(storeUtils.deepEqual(date, date)).toBe(true)
    expect(storeUtils.deepEqual(new Date(0), new Date(0))).toBe(true)
    expect(storeUtils.deepEqual(new Date(0), new Date(1))).toBe(false)
    expect(storeUtils.deepEqual(new Date(0), 0)).toBe(false)
  })

  it('RegExp 按值比较', () => {
    expect(storeUtils.deepEqual(/a/gi, /a/gi)).toBe(true)
    expect(storeUtils.deepEqual(/a/gi, /a/g)).toBe(false)
  })

  it('自引用环形对象相等', () => {
    const a: Record<string, unknown> = { name: 'x' }
    a.self = a
    const b: Record<string, unknown> = { name: 'x' }
    b.self = b
    expect(storeUtils.deepEqual(a, b)).toBe(true)
  })

  it('互指环形对象相等', () => {
    const a: Record<string, unknown> = { name: 'x' }
    a.child = { parent: a, list: [a] }
    const b: Record<string, unknown> = { name: 'x' }
    b.child = { parent: b, list: [b] }
    expect(storeUtils.deepEqual(a, b)).toBe(true)
  })

  it('环形结构不同的对象不等', () => {
    const a: Record<string, unknown> = { name: 'x' }
    a.self = a
    const b: Record<string, unknown> = { name: 'x' }
    b.self = { other: b }
    expect(storeUtils.deepEqual(a, b)).toBe(false)
  })

  it('mobx observable array 与等价 plain array 相等', () => {
    const obsArr = observable([1, { a: 2 }, [3]])
    expect(storeUtils.deepEqual(obsArr, [1, { a: 2 }, [3]])).toBe(true)
    expect(storeUtils.deepEqual(obsArr, [1, { a: 2 }, [4]])).toBe(false)
    expect(storeUtils.deepEqual(obsArr, observable([1, { a: 2 }, [3]]))).toBe(true)
    expect(storeUtils.deepEqual(obsArr, { 0: 1 })).toBe(false)
  })

  it('mobx observable object 与等价 plain object 相等', () => {
    const obsObj = observable({ a: 1, list: [1, 2] })
    expect(storeUtils.deepEqual(obsObj, { a: 1, list: [1, 2] })).toBe(true)
    expect(storeUtils.deepEqual(obsObj, { a: 1, list: [1, 3] })).toBe(false)
    expect(storeUtils.deepEqual(obsObj, observable({ a: 1, list: [1, 2] }))).toBe(true)
    expect(storeUtils.deepEqual(observable({}), {})).toBe(true)
  })

  it('lodash.isequal 行为对齐: 典型 store state', () => {
    const state = {
      list: [{ id: 1, title: 'a', data: { count: 10 } }],
      _loaded: 12345,
      extra: undefined
    }
    const same = {
      list: [{ id: 1, title: 'a', data: { count: 10 } }],
      _loaded: 12345,
      extra: undefined
    }
    const diff = {
      list: [{ id: 1, title: 'b', data: { count: 10 } }],
      _loaded: 12345,
      extra: undefined
    }
    expect(storeUtils.deepEqual(state, same)).toBe(true)
    expect(storeUtils.deepEqual(state, diff)).toBe(false)
  })
})

describe('ingestRef', () => {
  it('注册的键不再深度代理, 后续赋值保持原始对象', () => {
    const target = observable({ existing: {} as Record<string, unknown> }) as Record<
      string,
      unknown
    >
    const payload = { deep: { nested: [1] } }

    storeUtils.ingestRef(target, 'fresh', payload)

    expect(isObservable(target.fresh)).toBe(false)
    expect(target.fresh).toBe(payload)
  })

  it('已存在键会被移除后以 ref 重建', () => {
    const target = observable({ key: { old: true } }) as Record<string, unknown>
    const payload = { new: true }

    storeUtils.ingestRef(target, 'key', payload)

    expect(isObservable(target.key)).toBe(false)
    expect(target.key).toBe(payload)
  })
})

describe('applyStateDiff', () => {
  const applyPatches = (initial: object, patches: object[]) => {
    const target = observable(JSON.parse(JSON.stringify(initial)) as object)
    patches.forEach(patch => {
      storeUtils.applyStateDiff(target as WritableState, patch)
    })
    return toJS(target)
  }

  it('新增键注册(含嵌套对象)', () => {
    expect(applyPatches({}, [{ extra: { deep: [1, 2] } }])).toEqual({
      extra: { deep: [1, 2] }
    })
  })

  it('基本类型更新', () => {
    expect(applyPatches({ count: 0, name: 'x' }, [{ count: 1 }, { name: 'y' }])).toEqual({
      count: 1,
      name: 'y'
    })
  })

  it('相同引用跳过写入', () => {
    const shared = { id: 1 }
    expect(applyPatches({ item: shared }, [{ item: shared }])).toEqual({ item: shared })
  })

  it('observable 数组原地替换', () => {
    expect(applyPatches({ arr: [1, 2] }, [{ arr: [3, 4, 5] }])).toEqual({ arr: [3, 4, 5] })
  })

  it('对象逐键增量合并保留未声明子键', () => {
    expect(applyPatches({ obj: { keep: 1, drop: 2 } }, [{ obj: { keep: 9, add: 3 } }])).toEqual({
      obj: { keep: 9, drop: 2, add: 3 }
    })
  })

  it('null 与原始类型目标整体替换', () => {
    expect(
      applyPatches({ nil: null, str: 'raw' }, [
        { nil: { from: 'null' } },
        { str: { from: 'string' } }
      ])
    ).toEqual({ nil: { from: 'null' }, str: { from: 'string' } })
  })

  it('连续混合操作序列', () => {
    expect(
      applyPatches({ n: 0 }, [
        { n: 1 },
        { created: { items: [] } },
        { created: { items: [7] } },
        { n: null },
        { created: null },
        { recreated: [8] }
      ])
    ).toEqual({ n: null, created: null, recreated: [8] })
  })
})

describe('Store 实例差分', () => {
  it('setState 序列后状态一致', () => {
    const { v1, v2 } = createPair()
    v1.setState({ count: 5, subject: { name: 'x' } })
    v2.setState({ count: 5, subject: { name: 'x' } })
    expectSameState(v1, v2)
  })

  it('clearState 已有键与新键行为一致', () => {
    const { v1, v2 } = createPair()
    v1.clearState('count', 99)
    v2.clearState('count', 99)
    v1.clearState('brandNew', { a: 1 })
    v2.clearState('brandNew', { a: 1 })
    expectSameState(v1, v2)
    expect((toJS(v1.state as SeedState) as Record<string, unknown>).brandNew).toEqual({ a: 1 })
  })

  it('getState 三种调用形态返回一致', () => {
    const { v1, v2 } = createPair()
    v1.setState({ map: { k1: 'v1' } })
    v2.setState({ map: { k1: 'v1' } })
    expect(v1.getState('count')).toBe(v2.getState('count'))
    expect(v1.getState('map', 'k1')).toBe(v2.getState('map', 'k1'))
    expect(v1.getState('map', 'missing', '默认')).toBe(v2.getState('map', 'missing', '默认'))
  })

  it('setStorage 写入键一致且 getStorage 往返一致', async () => {
    const { v1, v2 } = createPair()
    await v1.setStorage('accessToken', { token: 't1' }, 'NS')
    await v2.setStorage('accessToken', { token: 't1' }, 'NS')

    const keys = mockSetStorage.mock.calls.map(call => call[0])
    expect(keys.filter(key => key.startsWith('NS')).length).toBeGreaterThanOrEqual(2)
    expect(new Set(keys.filter(key => key.startsWith('NS'))).size).toBe(1)

    expect(await v1.getStorage('accessToken', 'NS')).toEqual({ token: 't1' })
    expect(await v2.getStorage('accessToken', 'NS')).toEqual({ token: 't1' })
  })

  it('getStorage 单参历史形态与缺省回退一致', async () => {
    const { v1, v2 } = createPair()
    expect(await v1.getStorage('nothing')).toEqual(await v2.getStorage('nothing'))
    expect(await v2.getStorage('nothing')).toEqual({})
  })

  it('saveStorage 排除键后写入一致', async () => {
    const { v1, v2 } = createPair()
    v1.setState({ count: 3 })
    v2.setState({ count: 3 })
    const r1 = await v1.saveStorage('NS2', { count: true })
    const r2 = await v2.saveStorage('NS2', { count: true })
    expect(r1).toEqual(r2)
    expectSameState(v1, v2)
  })

  it('readStorage 批量读取入库一致', async () => {
    const { v1, v2 } = createPair()
    mockStorageMap.set('NS3|count|state', 42)
    mockStorageMap.set('NS3|loading|state', true)
    await v1.readStorage(['count', 'loading'], 'NS3')
    await v2.readStorage(['count', 'loading'], 'NS3')
    expectSameState(v1, v2)
    expect(seedOf(v1).count).toBe(42)
    expect(seedOf(v1).loading).toBe(true)
  })

  it('fetch 字符串配置 + 单键浅响应入库', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValueOnce({ name: 'a', value: 1 })
    const r1 = await v1.fetch('https://api/subject', 'subject')
    mockFetch.mockResolvedValueOnce({ name: 'a', value: 1 })
    const r2 = await v2.fetch('https://api/subject', 'subject')

    expect(r1).toEqual(r2)
    expectSameState(v1, v2)

    // [预期差异] 浅响应: Legacy 深度代理入库数据, 主实现以 ref 挂载原始对象
    expect(isObservable(seedOf(v1).subject)).toBe(true)
    expect(isObservable(seedOf(v2).subject)).toBe(false)
  })

  it('fetch 对象配置 + 元组 stateKey + 列表模式', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValueOnce([{ id: 1 }])
    const r1 = await v1.fetch({ url: 'https://api/list', info: '列表' }, ['map', 1], {
      list: true
    })
    mockFetch.mockResolvedValueOnce([{ id: 1 }])
    const r2 = await v2.fetch({ url: 'https://api/list', info: '列表' }, ['map', 1], {
      list: true
    })

    expect(r1).toEqual(r2)
    expect(r2).toMatchObject({
      list: [{ id: 1 }],
      pagination: { page: 0, pageTotal: 0 },
      _loaded: FIXED_TS
    })
    expectSameState(v1, v2)
    const mapSnapshot = toJS(v2.state.map as SeedState['map']) as Record<
      string,
      Record<string, unknown>
    >
    expect(mapSnapshot['1']).toMatchObject({ list: [{ id: 1 }] })
  })

  it('请求配置包含 retryCb 重试回调', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValue({ ok: 1 })
    await v1.fetch('https://api', 'count')
    await v2.fetch('https://api', 'count')
    const config1 = mockFetch.mock.calls[0][0] as { retryCb: unknown; url: string }
    const config2 = mockFetch.mock.calls[1][0] as { retryCb: unknown; url: string }
    expect(typeof config1.retryCb).toBe('function')
    expect(typeof config2.retryCb).toBe('function')
    expect(config1.url).toBe(config2.url)
  })

  it('条目信息降级走 fetchSubjectV0 且结果一致', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValueOnce({})
    mockFetchSubjectV0.mockResolvedValueOnce({ id: 9, url: 'legacy' })
    const r1 = await v1.fetch({ url: 'https://api/subject', info: '条目信息' }, 'subject')
    mockFetch.mockResolvedValueOnce({})
    mockFetchSubjectV0.mockResolvedValueOnce({ id: 9, url: 'legacy' })
    const r2 = await v2.fetch({ url: 'https://api/subject', info: '条目信息' }, 'subject')

    expect(mockFetchSubjectV0).toHaveBeenCalledTimes(2)
    expect(r1).toEqual(r2)
    expectSameState(v1, v2)
  })

  it('error 缓存保护: 已加载数据不被覆盖', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValueOnce({ name: 'cached' })
    await v1.fetch('https://api', 'subject')
    mockFetch.mockResolvedValueOnce({ name: 'cached' })
    await v2.fetch('https://api', 'subject')

    mockFetch.mockResolvedValue({ error: 'token 过期' })
    const r1 = await v1.fetch('https://api', 'subject')
    const r2 = await v2.fetch('https://api', 'subject')

    expect(r1).toEqual(r2)
    expectSameState(v1, v2)
    expect((seedOf(v1).subject as FetchedSubject).name).toBe('cached')
  })

  it('error 缓存保护: 元组形式同样生效', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValueOnce([{ id: 1 }])
    await v1.fetch('https://api', ['map', 1], { list: true })
    mockFetch.mockResolvedValueOnce([{ id: 1 }])
    await v2.fetch('https://api', ['map', 1], { list: true })

    mockFetch.mockResolvedValue({ error: 'denied' })
    await v1.fetch('https://api', ['map', 1], { list: true })
    await v2.fetch('https://api', ['map', 1], { list: true })
    expectSameState(v1, v2)
  })

  it('storage 开关触发本地化且键名一致', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValue({ ok: 1 })
    await v1.fetch('https://api', 'subject', { storage: true, namespace: 'NSF' })
    await v2.fetch('https://api', 'subject', { storage: true, namespace: 'NSF' })

    const keys = mockSetStorage.mock.calls.map(call => call[0]) as string[]
    expect(keys.filter(key => key === 'NSF|subject|state').length).toBe(2)
  })

  it('元组入库: 同一父键连续两次成功 fetch 均触发订阅且兄弟键保留', async () => {
    // 未在 STATE 预置的父键 brand —— 覆盖惰性创建路径
    type BrandState = SeedState & { brand: Record<string, Record<string, unknown>> }
    const v1 = new LegacyStore<BrandState>(createState() as unknown as BrandState)
    const v2 = new StoreModern<BrandState>(createState() as unknown as BrandState)

    const stateOf = (store: { state: unknown }) => store.state as BrandState

    // 订阅读取容器键集合: 容器内任何键增删都必须触发
    let c1 = 0
    let c2 = 0
    autorun(() => {
      void Object.keys(stateOf(v2).brand ?? {})
      c2 += 1
    })
    autorun(() => {
      void Object.keys(stateOf(v1).brand ?? {})
      c1 += 1
    })

    mockFetch.mockResolvedValueOnce([{ id: 7 }])
    await v1.fetch('https://api', ['brand', 7], { list: true })
    mockFetch.mockResolvedValueOnce([{ id: 7 }])
    await v2.fetch('https://api', ['brand', 7], { list: true })

    expectSameState(v1, v2)

    // 第二次同父键不同内键的 fetch
    const before2 = c2
    mockFetch.mockResolvedValueOnce([{ id: 8 }])
    await v2.fetch('https://api', ['brand', 8], { list: true })

    // 回归断言: 主实现第二次 fetch 必须再次触发订阅(修复前静默失效)
    expect(c2).toBeGreaterThan(before2)

    const before1 = c1
    mockFetch.mockResolvedValueOnce([{ id: 8 }])
    await v1.fetch('https://api', ['brand', 8], { list: true })
    expect(c1).toBeGreaterThan(before1)

    expectSameState(v1, v2)
    const brandV2 = toJS(stateOf(v2).brand) as Record<string, unknown>
    expect(Object.keys(brandV2).sort()).toEqual(['7', '8'])
  })

  it('[预期差异] ref 键 setState 为整体替换且触发订阅; Legacy 保持逐键合并', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValue({ name: 'a', keep: 1 })
    await v1.fetch('https://api', 'subject')
    await v2.fetch('https://api', 'subject')

    let fired = 0
    autorun(() => {
      void seedOf(v2).subject
      fired += 1
    })
    const before = fired

    v2.setState({ subject: { name: 'b' } })
    expect(fired).toBeGreaterThan(before)
    // 主实现: current 不可观测 → 整体替换, 旧子键不保留
    expect(seedOf(v2).subject).toEqual({ name: 'b' })

    v1.setState({ subject: { name: 'b' } })
    // Legacy: 可观测容器 → 逐键合并, 旧子键 keep 保留
    expect(toJS(seedOf(v1).subject)).toEqual({ name: 'b', keep: 1, _loaded: FIXED_TS })
  })

  it('[预期差异] 单键二次部分载荷: Legacy 合并保留旧子键, 主实现整体替换', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValueOnce({ a: 1, b: 2 })
    await v1.fetch('https://api', 'subject')
    mockFetch.mockResolvedValueOnce({ b: 99 })
    await v1.fetch('https://api', 'subject')
    mockFetch.mockResolvedValueOnce({ a: 1, b: 2 })
    await v2.fetch('https://api', 'subject')
    mockFetch.mockResolvedValueOnce({ b: 99 })
    await v2.fetch('https://api', 'subject')

    // Legacy: 逐键合并
    expect(toJS(seedOf(v1).subject)).toEqual({ a: 1, b: 99, _loaded: FIXED_TS })
    // 主实现: 整体替换
    expect(seedOf(v2).subject).toEqual({ b: 99, _loaded: FIXED_TS })
  })

  it('toJS 缺失键兜底导出全状态, 修改完全隔离(含 ref 成员)', async () => {
    const { v2 } = createPair()
    mockFetch.mockResolvedValue({ name: 'n1' })
    await v2.fetch('https://api', 'subject')

    const snapshot = v2.toJS<SeedState>('missing')
    expect(snapshot.subject.name).toBe('n1')

    snapshot.count = 999
    snapshot.subject = { name: '改掉' }
    expect(seedOf(v2).count).toBe(0)
    expect((seedOf(v2).subject as FetchedSubject).name).toBe('n1')
  })

  it('[不变量] fetch 后数据变更必然触发订阅', async () => {
    const { v1, v2 } = createPair()

    // 注意: toJS 是 untracked 的, 必须直接读取属性才能建立依赖
    let c1 = 0
    let c2 = 0
    autorun(() => {
      void (seedOf(v1).subject as FetchedSubject | undefined)?.name
      void (seedOf(v1).subject as FetchedSubject & { _loaded?: number })?._loaded
      c1 += 1
    })
    autorun(() => {
      void (seedOf(v2).subject as FetchedSubject | undefined)?.name
      void (seedOf(v2).subject as FetchedSubject & { _loaded?: number })?._loaded
      c2 += 1
    })

    mockFetch.mockResolvedValue({ name: 'n1' })
    await v1.fetch('https://api', 'subject')
    await v2.fetch('https://api', 'subject')

    expect(c1).toBeGreaterThan(1)
    expect(c2).toBeGreaterThan(1)

    // 二次请求内容变化仍需触发
    const before1 = c1
    const before2 = c2
    mockFetch.mockResolvedValue({ name: 'n2' })
    await v1.fetch('https://api', 'subject')
    await v2.fetch('https://api', 'subject')
    expect(c1).toBeGreaterThan(before1)
    expect(c2).toBeGreaterThan(before2)
    expectSameState(v1, v2)
  })

  it('[不变量] toJS 返回独立副本, 修改不影响状态', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValue({ name: 'n1', tags: [{ id: 1 }] })
    await v1.fetch('https://api', 'subject')
    await v2.fetch('https://api', 'subject')

    // 对两版返回值都做嵌套修改
    const snapshot1 = v1.toJS<FetchedSubject>('subject')
    snapshot1.name = '改掉'
    snapshot1.tags[0].id = 999

    const snapshot2 = v2.toJS<FetchedSubject>('subject')
    snapshot2.name = '改掉'
    snapshot2.tags[0].id = 999

    // 两侧状态都必须保持原值
    expectSameState(v1, v2)
    expect(seedOf(v2).subject.name).toBe('n1')
    const raw2 = seedOf(v2).subject as unknown as FetchedSubject
    expect(raw2.tags[0].id).toBe(1)
  })

  it('toJS 内容两版一致(含浅响应入库数据)', async () => {
    const { v1, v2 } = createPair()
    mockFetch.mockResolvedValue({ name: 'n1', nested: { deep: [1, 2, 3] } })
    await v1.fetch('https://api', 'subject')
    await v2.fetch('https://api', 'subject')

    expect(v1.toJS('subject')).toEqual(v2.toJS('subject'))
    expect(v2.toJS('subject')).toEqual({
      name: 'n1',
      nested: { deep: [1, 2, 3] },
      _loaded: FIXED_TS
    })
  })

  it('isEqual 引用相等/内容相等/内容不同三态一致', () => {
    const { v1, v2 } = createPair()
    const shared = { a: 1, _loaded: 1 }
    const sameDiffLoaded = { a: 1, _loaded: 999 }
    const different = { a: 2, _loaded: 1 }

    expect(v1.isEqual(shared, shared)).toBe(true)
    expect(v2.isEqual(shared, shared)).toBe(true)
    expect(v1.isEqual(shared, sameDiffLoaded)).toBe(true)
    expect(v2.isEqual(shared, sameDiffLoaded)).toBe(true)
    expect(v1.isEqual(shared, different)).toBe(false)
    expect(v2.isEqual(shared, different)).toBe(false)
  })

  it('withLoading 标志时序一致并透传返回值', async () => {
    const { v1, v2 } = createPair()
    const seq1: boolean[] = []
    const seq2: boolean[] = []
    autorun(() => {
      seq1.push(v1.state.loading)
    })
    autorun(() => {
      seq2.push(v2.state.loading)
    })

    const fn = async (...args: unknown[]) => `${String(args[0])}-ok`
    const wrapped1 = v1.withLoading('loading', fn)
    const wrapped2 = v2.withLoading('loading', fn)
    const r1 = await wrapped1('a')
    const r2 = await wrapped2('a')

    expect(r1).toBe(r2)
    expect(seq1[0]).toBe(false)
    expect(seq2[0]).toBe(false)
    expect(seq1).toContain(true)
    expect(seq2).toContain(true)
    expect(seq1[seq1.length - 1]).toBe(false)
    expect(seq2[seq2.length - 1]).toBe(false)
  })

  describe('fetchQueueUnique', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('同一回调仅执行一次, 不同回调均执行, 执行顺序一致', async () => {
      const { v1, v2 } = createPair()
      const order1: string[] = []
      const order2: string[] = []
      const cb1a = async () => void order1.push('a')
      const cb1b = async () => void order1.push('b')
      const cb2a = async () => void order2.push('a')
      const cb2b = async () => void order2.push('b')

      v1.fetchQueueUnique([cb1a, cb1b])
      v2.fetchQueueUnique([cb2a, cb2b])
      await Promise.resolve()

      v1.fetchQueueUnique([cb1a])
      v2.fetchQueueUnique([cb2a])

      jest.advanceTimersByTime(5000)
      await Promise.resolve()
      await Promise.resolve()

      expect(order1).toEqual(['a', 'b'])
      expect(order2).toEqual(['a', 'b'])

      // [问题][已知未修] 延迟基数 200 * _memoFetched.size 随生命周期只增不减,
      // 长会话后首批请求延迟可达数秒, 属 V1 遗留行为, 两版保持一致等待决策修复
    })
  })
})
