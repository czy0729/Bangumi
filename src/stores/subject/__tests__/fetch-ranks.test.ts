/*
 * @Author: czy0729
 * @Date: 2026-11-12 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 00:00:00
 *
 * fetchRanks: 缓存命中 / 云端快照复用 / 快照过期回退 v0 / 失败保留旧分数
 */
const mockNow = 1000000
const mockGets = jest.fn()
const mockRequest = jest.fn()

jest.mock('../computed', () => ({ __esModule: true, default: class {} }))

jest.mock('@utils', () => ({
  getTimestamp: () => mockNow,
  HTMLTrim: (value: string) => value,
  omit: (obj: object, keys: string[]) => {
    const next = { ...obj } as Record<string, unknown>
    keys.forEach(key => delete next[key])
    return next
  },
  queue: async (fetchs: (() => unknown)[] = []) => Promise.all(fetchs.map(fn => fn()))
}))

jest.mock('@utils/bucket', () => ({ getBucketId: () => 0 }))
jest.mock('@utils/fetch', () => ({ fetchHTML: jest.fn(), xhrCustom: jest.fn() }))
jest.mock('@utils/fetch.v0', () => ({ request: (...args: unknown[]) => mockRequest(...args) }))
jest.mock('@utils/kv', () => ({
  get: jest.fn(),
  gets: (...args: unknown[]) => mockGets(...args)
}))
jest.mock('@constants', () => new Proxy({}, { get: () => '' }))
jest.mock('../../timeline', () => ({ __esModule: true, default: {} }))
jest.mock('../common', () => ({}))

import Fetch from '../fetch'

/** 构造被测实例: 真实 Fetch + 桩掉外部依赖 */
function createStore() {
  const $: Record<string, any> = new Fetch()
  $.state = { rank: {}, nsfw: {} }
  $.setState = jest.fn((partial: Record<string, unknown>) => {
    Object.assign($.state, partial)
    return true
  })
  $.save = jest.fn()
  $.rank = jest.fn((subjectId: number) => $.state.rank[subjectId] || { _loaded: false })
  $.ratingScore = jest.fn(() => 0)
  $.ratingRank = jest.fn(() => 0)
  $.subjectV2 = jest.fn(() => undefined)
  $.subject = jest.fn(() => undefined)

  return $
}

beforeEach(() => {
  mockGets.mockReset()
  mockRequest.mockReset()
  mockRequest.mockResolvedValue({})
})

describe('fetchRanks', () => {
  it('24h 内命中缓存时不发起请求', async () => {
    const $ = createStore()
    $.state.rank = { 1: { s: 8, _loaded: mockNow - 100 } }

    await $.fetchRanks([1])
    expect(mockGets).not.toHaveBeenCalled()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('云端快照新鲜时直接复用并同步 nsfw', async () => {
    const $ = createStore()
    mockGets.mockResolvedValue({
      subject_1: { rating: { score: 8.2, rank: 120 }, ts: mockNow - 100, nsfw: true }
    })

    await $.fetchRanks([1])
    expect(mockRequest).not.toHaveBeenCalled()
    expect($.state.rank[1]).toMatchObject({ s: 8.2, r: 120 })
    expect($.state.nsfw[1]).toBe(true)
  })

  it('快照缺少 ts 时回退 v0', async () => {
    const $ = createStore()
    mockGets.mockResolvedValue({ subject_1: { rating: { score: 8 } } })
    mockRequest.mockResolvedValue({ rating: { score: 9, rank: 50 }, nsfw: true })

    await $.fetchRanks([1])
    expect(mockRequest).toHaveBeenCalledTimes(1)
    expect($.state.rank[1]).toMatchObject({ s: 9, r: 50, _loaded: mockNow })
    expect($.state.nsfw[1]).toBe(true)
  })

  it('刷新失败时保留旧分数, 不用更旧的本地评分覆盖', async () => {
    const $ = createStore()
    $.state.rank = { 1: { s: 7, r: 300, _loaded: mockNow - 100000 } }
    $.ratingScore = jest.fn(() => 6)
    $.ratingRank = jest.fn(() => 900)
    mockGets.mockResolvedValue(null)
    mockRequest.mockResolvedValue({})

    await $.fetchRanks([1])
    expect($.state.rank[1]).toMatchObject({ s: 7, r: 300 })
  })
})
