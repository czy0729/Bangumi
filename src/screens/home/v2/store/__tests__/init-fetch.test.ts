/*
 * @Author: czy0729
 * @Date: 2026-09-17 20:38:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 21:20:00
 *
 * initQueue / initFetch 的语义:
 *  - initQueue true: 本次成功 (用户确实没有在看收藏时同样 true, 由 _ok 区分), 不会重新授权
 *  - initQueue false: 列表为空且本次没有拿到有效响应 (请求失败 / 授权过期), 走原有的重新授权分支
 *
 * 旧实现把「列表为空」直接当成授权过期的信号, 于是 0 在看用户每次冷启动都重新授权一次
 *
 * 父类链 (Action/Getters) 与测试无关且含重依赖, 直接替换为空类
 */
jest.mock('expo-device', () => ({
  brand: '',
  deviceYearClass: 0,
  modelId: '',
  modelName: '',
  osVersion: '',
  totalMemory: 0
}))

jest.mock('../computed', () => ({ __esModule: true, default: class {} }))
jest.mock('../action', () => ({ __esModule: true, default: class {} }))

jest.mock('@stores', () => ({
  _: { window: { height: 0, width: 0 } },
  systemStore: { setting: {}, advance: false },
  userStore: {
    isWebLogin: true,
    fetchCollection: jest.fn(),
    reOauth: jest.fn()
  }
}))

jest.mock('@utils', () => ({
  date: () => '',
  feedback: jest.fn(),
  getTimestamp: () => Math.floor(Date.now() / 1000),
  info: jest.fn(),
  pick: () => ({}),
  postTask: () => {},
  sortObject: () => ({})
}))

jest.mock('@utils/dev', () => ({
  logger: { info: jest.fn(), log: jest.fn(), warn: jest.fn(), error: jest.fn() }
}))

jest.mock('@utils/fetch', () => ({ t: jest.fn() }))
jest.mock('@utils/kv', () => ({ update: jest.fn() }))
jest.mock('@utils/proxy', () => ({ getProxyStrategy: () => ({ supporter: false }) }))
jest.mock('@utils/thirdParty/protobuf', () => ({ get: () => [] }))
jest.mock('@constants', () => ({
  D: 86400,
  DEVICE_MODEL_NAME: 'test',
  MODEL_SETTING_INITIAL_PAGE: { getValue: () => '' },
  VERSION_GITHUB_RELEASE: '1.0.0'
}))
jest.mock('@src/config', () => ({ IOS_IPA: false }))
// @styles 无 moduleNameMapper 映射, 需 virtual 声明
jest.mock('@styles', () => ({ HEADER_HEIGHT: 0, STATUS_BAR_HEIGHT: 0 }), { virtual: true })

import { userStore } from '@stores'
import ScreenHomeV2 from '../index'

const mockUserStore = userStore as unknown as {
  isWebLogin: boolean
  fetchCollection: jest.Mock
  reOauth: jest.Mock
}

/** 构造被测实例, keepInitQueue 为 true 时不覆盖真实的 initQueue 实现 */
function createContext(overrides: Record<string, unknown> = {}, keepInitQueue = false) {
  const $: any = new ScreenHomeV2()
  $.state = { progress: { fetching: false } }
  // 从未成功加载过 (flag 需要全量刷新分支)
  $.collection = { list: [], _loaded: 0 }
  $.fetchCollectionTimelines = jest.fn()
  $.fetchSubjectsQueue = jest.fn(async () => true)
  if (!keepInitQueue) $.initQueue = jest.fn(async () => true)
  Object.assign($, overrides)
  return $
}

beforeEach(() => {
  jest.clearAllMocks()
  mockUserStore.isWebLogin = true
  mockUserStore.reOauth.mockResolvedValue(true)
})

describe('initQueue', () => {
  it('本次成功但收藏为空 (_ok): 返回 true, 不进入队列', async () => {
    const $ = createContext({}, true)
    mockUserStore.fetchCollection.mockResolvedValue({ list: [], _ok: true })

    await expect($.initQueue()).resolves.toBe(true)
    expect($.fetchSubjectsQueue).not.toHaveBeenCalled()
  })

  it('请求失败 / 授权过期 (_ok 为 false): 返回 false', async () => {
    const $ = createContext({}, true)
    mockUserStore.fetchCollection.mockResolvedValue({ list: [], _ok: false })

    await expect($.initQueue()).resolves.toBe(false)
    expect($.fetchSubjectsQueue).not.toHaveBeenCalled()
  })

  it('无 _ok 的旧缓存且列表为空: 返回 false (落回原逻辑)', async () => {
    const $ = createContext({}, true)
    mockUserStore.fetchCollection.mockResolvedValue({ list: [] })

    await expect($.initQueue()).resolves.toBe(false)
  })

  it('有在看收藏: 进入队列', async () => {
    const $ = createContext({}, true)
    mockUserStore.fetchCollection.mockResolvedValue({
      list: [{ subject_id: 1 }],
      _ok: true
    })

    await expect($.initQueue()).resolves.toBe(true)
    expect($.fetchSubjectsQueue).toHaveBeenCalledTimes(1)
  })
})

describe('initFetch', () => {
  it('成功但确实没有在看收藏 (initQueue true): 不重新授权', async () => {
    const $ = createContext()

    await $.initFetch()

    expect($.initQueue).toHaveBeenCalledTimes(1)
    expect(mockUserStore.reOauth).not.toHaveBeenCalled()
    expect($.fetchCollectionTimelines).toHaveBeenCalled()
  })

  it('拿不到收藏数据 (initQueue false): 重新授权, 成功后重新拉取数据', async () => {
    const $ = createContext()
    $.initQueue = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true)

    await $.initFetch()

    expect(mockUserStore.reOauth).toHaveBeenCalledTimes(1)
    expect($.initQueue).toHaveBeenCalledTimes(2)
    expect($.fetchCollectionTimelines).toHaveBeenCalled()
  })

  it('已成功加载过且在看非空: 只刷新首屏 6 条, 不重新授权', async () => {
    const $ = createContext({
      collection: {
        list: [{ subject_id: 1 }],
        _loaded: Math.floor(Date.now() / 1000)
      },
      fetchCollectionTimelines: jest.fn(async () => true)
    })

    await $.initFetch()

    expect($.initQueue).toHaveBeenCalledWith(6)
    expect(mockUserStore.reOauth).not.toHaveBeenCalled()
  })
})
