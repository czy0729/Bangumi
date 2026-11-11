/*
 * @Author: czy0729
 * @Date: 2026-11-12 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 05:20:47
 *
 * 评分排序请求的并发代次: 同参数复用 / 参数变化作废旧链 / refresh 强制重拉
 */
const mockUserCollections = jest.fn()
const mockSortUserCollections = jest.fn()

jest.mock('../computed', () => ({ __esModule: true, default: class {} }))

jest.mock('@stores', () => ({
  _: { window: { height: 800 } },
  collectionStore: {
    userCollections: (...args: unknown[]) => mockUserCollections(...args),
    sortUserCollectionsByScore: (...args: unknown[]) => mockSortUserCollections(...args)
  },
  usersStore: {},
  userStore: {}
}))

jest.mock('@utils', () => ({ info: jest.fn() }))
jest.mock('@utils/dev', () => ({ logger: { error: jest.fn() } }))
jest.mock('../../ds', () => ({
  COMPONENT: 'User',
  DEFAULT_ORDER: '',
  DEFAULT_SUBJECT_TYPE: 2,
  TABS: [{ key: 'collect', title: '在看' }]
}))

import Fetch from '../fetch'

/** 构造被测实例: 真实 Fetch + 桩掉外部依赖 */
function createStore(username: string) {
  const $: Record<string, any> = new Fetch()
  $.state = { subjectType: 2, tag: '', scoreFetching: false }
  $.username = username
  $.type = 'collect'
  $.setState = jest.fn((partial: Record<string, unknown>) => Object.assign($.state, partial))
  $.fetchUserCollectionsNormal = jest.fn(async () => ({
    pagination: { page: 1, pageTotal: 1 }
  }))

  return $
}

beforeEach(() => {
  mockUserCollections.mockReset()
  mockSortUserCollections.mockReset()
  mockSortUserCollections.mockResolvedValue(true)
  mockUserCollections.mockReturnValue({
    list: [{ id: 1 }],
    pagination: { page: 1, pageTotal: 1 }
  })
})

describe('fetchUserCollectionsByScore', () => {
  it('同参数进行中只发起一次请求', async () => {
    const $ = createStore('same')
    let resolveTask: (value: unknown) => void
    $.fetchUserCollectionsNormal = jest.fn(
      () =>
        new Promise(resolve => {
          resolveTask = resolve
        })
    )

    const first = $.fetchUserCollectionsByScore()
    const second = $.fetchUserCollectionsByScore()

    resolveTask({ pagination: { page: 1, pageTotal: 1 } })
    await Promise.all([first, second])
    expect($.fetchUserCollectionsNormal).toHaveBeenCalledTimes(1)
  })

  it('参数变化后旧链停止, 不会用旧参数排序', async () => {
    const $ = createStore('switch')
    let resolveFirst: (value: unknown) => void
    $.fetchUserCollectionsNormal = jest.fn(
      () =>
        new Promise(resolve => {
          resolveFirst = resolve
        })
    )

    const first = $.fetchUserCollectionsByScore()
    $.state.subjectType = 4
    $.fetchUserCollectionsNormal = jest.fn(async () => ({
      pagination: { page: 1, pageTotal: 1 }
    }))
    const second = $.fetchUserCollectionsByScore()
    expect(second).not.toBe(first)

    resolveFirst({ pagination: { page: 1, pageTotal: 1 } })
    await first
    await second
    // 只有新链完成排序
    expect(mockSortUserCollections).toHaveBeenCalledTimes(1)
  })

  it('旧链作废时回滚全量标记, 切回旧参数会重新拉取', async () => {
    const $ = createStore('ghost')
    let resolveOld: (value: unknown) => void
    $.fetchUserCollectionsNormal = jest.fn(
      () =>
        new Promise(resolve => {
          resolveOld = resolve
        })
    )

    const old = $.fetchUserCollectionsByScore()
    $.state.subjectType = 4
    $.fetchUserCollectionsNormal = jest.fn(async () => ({
      pagination: { page: 1, pageTotal: 1 }
    }))
    const next = $.fetchUserCollectionsByScore()
    resolveOld({ pagination: { page: 1, pageTotal: 1 } })
    await old
    await next

    // 切回旧参数: 不能命中被作废链留下的全量标记
    $.state.subjectType = 2
    const before = ($.fetchUserCollectionsNormal as jest.Mock).mock.calls.length
    await $.fetchUserCollectionsByScore()
    expect(($.fetchUserCollectionsNormal as jest.Mock).mock.calls.length).toBe(before + 1)
  })

  it('旧链 abort 不会删掉同参数新链的标记', async () => {
    const $ = createStore('abort-owner')
    let resolveOld: (value: unknown) => void
    $.fetchUserCollectionsNormal = jest.fn(
      () =>
        new Promise(resolve => {
          resolveOld = resolve
        })
    )

    // A 卡在首个请求
    const old = $.fetchUserCollectionsByScore()

    // 切到 B 完成
    $.state.subjectType = 4
    $.fetchUserCollectionsNormal = jest.fn(async () => ({
      pagination: { page: 1, pageTotal: 1 }
    }))
    await $.fetchUserCollectionsByScore()

    // 切回 A 新建链并完成, 写入同 finger 标记
    $.state.subjectType = 2
    await $.fetchUserCollectionsByScore()

    // 旧链 A 恢复后作废, 不能删掉新链标记
    resolveOld({ pagination: { page: 1, pageTotal: 1 } })
    await old

    // 再次调用应命中标记, 只排序不重拉
    const before = ($.fetchUserCollectionsNormal as jest.Mock).mock.calls.length
    await $.fetchUserCollectionsByScore()
    expect(($.fetchUserCollectionsNormal as jest.Mock).mock.calls.length).toBe(before)
  })

  it('跨实例同参数时, 旧实例作废不删新实例标记', async () => {
    const $a = createStore('cross')
    const $b = createStore('cross')

    let resolveA: (value: unknown) => void
    $a.fetchUserCollectionsNormal = jest.fn(
      () =>
        new Promise(resolve => {
          resolveA = resolve
        })
    )

    const a = $a.fetchUserCollectionsByScore()
    // B 实例同参数完成
    await $b.fetchUserCollectionsByScore()

    // A 作废
    resolveA({ pagination: { page: 1, pageTotal: 1 } })
    await a

    // B 再次调用应命中标记, 不重拉
    const before = ($b.fetchUserCollectionsNormal as jest.Mock).mock.calls.length
    await $b.fetchUserCollectionsByScore()
    expect(($b.fetchUserCollectionsNormal as jest.Mock).mock.calls.length).toBe(before)
  })

  it('refresh 不复用已完成的全量结果, 会重新拉取', async () => {
    const $ = createStore('refresh')
    await $.fetchUserCollectionsByScore()
    expect($.fetchUserCollectionsNormal).toHaveBeenCalledTimes(1)
    expect(mockSortUserCollections).toHaveBeenCalledTimes(1)

    // 无 refresh: 命中全量缓存只重排
    await $.fetchUserCollectionsByScore()
    expect($.fetchUserCollectionsNormal).toHaveBeenCalledTimes(1)
    expect(mockSortUserCollections).toHaveBeenCalledTimes(2)

    // refresh: 跳过全量缓存重新拉取
    await $.fetchUserCollectionsByScore(true)
    expect($.fetchUserCollectionsNormal).toHaveBeenCalledTimes(2)
  })
})
