/*
 * @Author: czy0729
 * @Date: 2026-09-17 20:40:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 21:20:00
 *
 * userStore.fetchCollection 保持历史判据不变:
 *  - null: 新列表为空且本地已有 >= 2 条 (疑似 access_token 过期), 不覆盖本地缓存
 *  - 对象: 其余情况一律落库, 包含「请求成功但用户确实 0 在看」与「本次请求失败且本地不足 2 条」
 *
 * 本次新增的 _ok 标记只是原样透传, 供首页 v2 区分「成功但为空」, 不参与这里的分支
 */
jest.mock('../computed', () => ({ __esModule: true, default: class {} }))

jest.mock('../init', () => ({
  __esModule: true,
  DEFAULT_SCOPE: 'anime',
  LOADED: {},
  NAMESPACE: 'User',
  STATE: {}
}))

jest.mock('../common', () => ({
  cheerioPMDetailV2: jest.fn(),
  cheerioPMParams: jest.fn(),
  cheerioPMV2: jest.fn(),
  cheerioTags: jest.fn(),
  cheerioUserSetting: jest.fn()
}))

jest.mock('@utils', () => ({
  getTimestamp: () => 1700000000,
  HTMLDecode: (value: string) => value,
  HTMLTrim: (value: string) => value
}))

jest.mock('@utils/fetch', () => ({
  __esModule: true,
  default: jest.fn(),
  fetchHTML: jest.fn()
}))

jest.mock('@utils/fetch.v0', () => ({
  fetchCollectionSingleV0: jest.fn(),
  fetchCollectionV0: jest.fn(),
  fetchUserProgressV0: jest.fn()
}))

jest.mock('@utils/kv', () => ({
  onlines: jest.fn(),
  report: jest.fn()
}))

jest.mock('@constants', () => ({}))

import { fetchCollectionV0 } from '@utils/fetch.v0'
import Fetch from '../fetch'

const mockFetchCollectionV0 = fetchCollectionV0 as jest.Mock

/** 构造被测实例, localList 为本地已有缓存 */
function createContext(localList: any[] = []) {
  const $: any = new Fetch()
  $.myId = 'test'
  $.collection = {
    list: localList,
    _loaded: 1700000000
  }
  $.setState = jest.fn()
  $.save = jest.fn()
  return $
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchCollection', () => {
  it('新列表为空且本地已有 >= 2 条: 返回 null 且不覆盖本地缓存', async () => {
    const $ = createContext([{ subject_id: 1 }, { subject_id: 2 }])
    mockFetchCollectionV0.mockResolvedValue({
      list: [],
      _ok: false,
      _loaded: 1700000000
    })

    await expect($.fetchCollection()).resolves.toBeNull()
    expect($.setState).not.toHaveBeenCalled()
    expect($.save).not.toHaveBeenCalled()
  })

  it('新列表为空且本地不足 2 条: 仍然落库 (沿用历史行为)', async () => {
    const $ = createContext([{ subject_id: 1 }])
    const collection = {
      list: [],
      _ok: false,
      _loaded: 1700000000
    }
    mockFetchCollectionV0.mockResolvedValue(collection)

    await expect($.fetchCollection()).resolves.toBe(collection)
    expect($.setState).toHaveBeenCalledWith({ collection })
  })

  it('成功但确实没有在看收藏: 返回空集合 (带 _ok) 并落库', async () => {
    const $ = createContext()
    const collection = {
      list: [],
      _ok: true,
      _loaded: 1700000000
    }
    mockFetchCollectionV0.mockResolvedValue(collection)

    await expect($.fetchCollection()).resolves.toBe(collection)
    expect($.setState).toHaveBeenCalledWith({ collection })
  })

  it('有在看收藏: 返回集合并落库', async () => {
    const $ = createContext()
    const collection = {
      list: [{ subject_id: 1 }],
      _ok: true,
      _loaded: 1700000000
    }
    mockFetchCollectionV0.mockResolvedValue(collection)

    await expect($.fetchCollection()).resolves.toBe(collection)
    expect($.setState).toHaveBeenCalledTimes(1)
  })
})
