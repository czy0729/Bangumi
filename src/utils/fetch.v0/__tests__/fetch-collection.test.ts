/*
 * @Author: czy0729
 * @Date: 2026-09-17 20:41:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 21:20:00
 *
 * fetchCollectionV0 的两个语义必须解耦:
 *  - _loaded 是缓存新鲜度时间戳, 语义与历史一致 (无论成败都是本次请求时间), 持久化后决定 6 天全量刷新
 *  - _ok 是本次响应是否有效 (拿到过数组, 空数组也算成功), 用于区分「确实没有在看收藏」与「请求失败 / 授权过期」
 *
 * 曾经上层只能靠「列表为空」猜测授权过期, 于是 0 在看用户每次冷启动都重新授权
 */
jest.mock('@utils', () => ({
  getTimestamp: () => 1700000000
}))

jest.mock('../utils', () => ({
  request: jest.fn()
}))

jest.mock('../../async', () => ({
  syncSystemStore: () => ({ advance: false })
}))

import { fetchCollectionV0 } from '../index'
import { request } from '../utils'

const mockRequest = request as jest.Mock

/** 构造一条 v0 收藏项 */
function makeItem(subjectId: number) {
  return {
    subject_id: subjectId,
    subject_type: 2,
    ep_status: 1,
    vol_status: 0,
    updated_at: '2024-01-01T00:00:00+08:00',
    subject: {
      id: subjectId,
      name: 'name',
      name_cn: '中文名',
      eps: 12,
      total_episodes: 12,
      date: '2024-01-01',
      images: {},
      collection: {}
    }
  }
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchCollectionV0', () => {
  it('响应体没有 data (授权过期): _ok 为 false, _loaded 不受影响', async () => {
    mockRequest.mockResolvedValue({ error: 'invalid_token' })

    const result = await fetchCollectionV0('test')

    expect(result.list).toEqual([])
    expect(result._ok).toBe(false)
    expect(result._loaded).toBe(1700000000)
  })

  it('请求抛错: _ok 为 false, _loaded 不受影响', async () => {
    mockRequest.mockRejectedValue(new Error('network'))

    const result = await fetchCollectionV0('test')

    expect(result.list).toEqual([])
    expect(result._ok).toBe(false)
    expect(result._loaded).toBe(1700000000)
  })

  it('成功但没有收藏: _ok 为 true, list 为空', async () => {
    mockRequest.mockResolvedValue({
      data: [],
      total: 0
    })

    const result = await fetchCollectionV0('test')

    expect(result.list).toEqual([])
    expect(result._ok).toBe(true)
    expect(result._loaded).toBe(1700000000)
  })

  it('成功且有收藏: _ok 为 true, list 有数据', async () => {
    // 第一个请求是动画分类, 其余类型返回空
    mockRequest
      .mockResolvedValueOnce({
        data: [makeItem(1)],
        total: 1
      })
      .mockResolvedValue({
        data: [],
        total: 0
      })

    const result = await fetchCollectionV0('test')

    expect(result.list).toHaveLength(1)
    expect(result.list[0].subject_id).toBe(1)
    expect(result._ok).toBe(true)
    expect(result._loaded).toBe(1700000000)
  })

  it('部分类型失败但有一个成功: _ok 仍为 true (只判授权是否有效)', async () => {
    mockRequest
      .mockResolvedValueOnce({
        data: [],
        total: 0
      })
      .mockResolvedValue({})

    const result = await fetchCollectionV0('test')

    expect(result._ok).toBe(true)
  })
})
