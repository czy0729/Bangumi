/*
 * @Author: czy0729
 * @Date: 2026-09-17 20:38:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-15 21:22:53
 *
 * initQueue / initFetch / fetchUserProgressAll 的语义:
 *  - initQueue true: 本次成功 (用户确实没有在看收藏时同样 true, 由 _ok 区分), 不会重新授权
 *  - initQueue false: 列表为空且本次没有拿到有效响应 (请求失败 / 授权过期), 走原有的重新授权分支
 *  - fetchUserProgressAll: 全量收视进度刷新, 节流时间戳仅在成功后写入, 失败允许下一周期重试
 *
 * 旧实现把「列表为空」直接当成授权过期的信号, 于是 0 在看用户每次冷启动都重新授权一次
 *
 * 父类链 (Action/Getters) 与测试无关且含重依赖, 直接替换为空类
 */
const mockNow = { value: 1750000000 }

jest.mock('expo-device', () => ({
  brand: '',
  deviceYearClass: 0,
  modelId: '',
  modelName: '',
  osVersion: '',
  totalMemory: 0
}))

jest.mock('../computed', () => ({ __esModule: true, default: class {} }))

jest.mock('@stores', () => ({
  _: { window: { height: 0, width: 0 } },
  systemStore: { setting: {}, advance: false },
  subjectStore: {
    fetchSubject: jest.fn(async () => true)
  },
  userStore: {
    isWebLogin: true,
    fetchCollection: jest.fn(),
    reOauth: jest.fn()
  }
}))

jest.mock('@utils', () => ({
  date: () => '',
  feedback: jest.fn(),
  getTimestamp: () => mockNow.value,
  info: jest.fn(),
  pick: () => ({}),
  postTask: () => {},
  queue: jest.fn(fetchs => Promise.all(fetchs.map(fn => fn()))),
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
  H1: 3600,
  M5: 300,
  MODEL_SETTING_INITIAL_PAGE: { getValue: () => '' },
  VERSION_GITHUB_RELEASE: '1.0.0',
  WEB: false
}))
jest.mock('@src/config', () => ({ IOS_IPA: false }))
// @styles 无 moduleNameMapper 映射, 需 virtual 声明
jest.mock('@styles', () => ({ HEADER_HEIGHT: 0, STATUS_BAR_HEIGHT: 0 }), { virtual: true })

import { subjectStore, userStore } from '@stores'
import Fetch from '../fetch'

const mockUserStore = userStore as unknown as {
  isWebLogin: boolean
  fetchCollection: jest.Mock
  reOauth: jest.Mock
}

/** 构造被测实例, keepInitQueue 为 true 时不覆盖真实的 initQueue 实现 */
function createContext(overrides: Record<string, unknown> = {}, keepInitQueue: boolean = false) {
  const $: any = new Fetch()
  $.state = { progress: { fetching: false }, lastFetchedUserProgress: 0, lastFailedUserProgress: 0 }
  $.setState = jest.fn(data => Object.assign($.state, data))
  // 从未成功加载过 (flag 需要全量刷新分支)
  $.collection = { list: [], _loaded: 0 }
  $.fetchCollectionTimelines = jest.fn()
  $.clearListSnapshots = jest.fn()
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
  it('网络等待期间登录态切换: 返回 busy 且不驱动队列', async () => {
    const $ = createContext({}, true)
    let resolveCollection: (value: unknown) => void = () => {}
    mockUserStore.fetchCollection.mockImplementation(
      () =>
        new Promise(resolve => {
          resolveCollection = resolve
        })
    )
    $.fetchSubjectsQueue = jest.fn()

    const task = $.initQueue(undefined, undefined, 0)

    // 请求期间登录态切换 (resetQueue 自增代号)
    $.resetQueue()
    resolveCollection({ list: [{ subject_id: 1 }], _ok: true, _loaded: 1 })

    await expect(task).resolves.toBe('busy')
    expect($.fetchSubjectsQueue).not.toHaveBeenCalled()
  })

  it('本次成功但收藏为空 (_ok): 返回 true, 不进入队列', async () => {
    const $ = createContext({}, true)
    $.fetchSubjectsQueue = jest.fn(async () => true)
    mockUserStore.fetchCollection.mockResolvedValue({ list: [], _ok: true })

    await expect($.initQueue()).resolves.toBe(true)
    expect($.fetchSubjectsQueue).not.toHaveBeenCalled()
  })

  it('请求失败 / 授权过期 (_ok 为 false): 返回 false', async () => {
    const $ = createContext({}, true)
    $.fetchSubjectsQueue = jest.fn(async () => true)
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
    $.fetchSubjectsQueue = jest.fn(async () => true)
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

  it('队列忙碌 (initQueue busy): 不重新授权, 也不拉收藏时间线', async () => {
    const $ = createContext()
    $.initQueue = jest.fn(async () => 'busy')

    await $.initFetch()

    expect($.initQueue).toHaveBeenCalledTimes(1)
    expect(mockUserStore.reOauth).not.toHaveBeenCalled()
    expect($.fetchCollectionTimelines).not.toHaveBeenCalled()
  })

  it('拿不到收藏数据 (initQueue false): 重新授权, 成功后强制重建全量进度任务并重新拉取数据', async () => {
    const $ = createContext()
    $.initQueue = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true)
    const fetchUserProgressAllSpy = jest.spyOn($, 'fetchUserProgressAll')
    $.fetchUserProgress = jest.fn(async () => [])

    await $.initFetch()

    expect(mockUserStore.reOauth).toHaveBeenCalledTimes(1)
    // reOauth 后强制刷新 (refresh=true), 用新 token 重拉而不是复用旧任务
    expect(fetchUserProgressAllSpy).toHaveBeenNthCalledWith(1, false)
    expect(fetchUserProgressAllSpy).toHaveBeenNthCalledWith(2, true)
    expect($.initQueue).toHaveBeenCalledTimes(2)
    // reOauth 后的第二次队列传入新建的全量任务, 避免逐条目拉进度
    expect($.initQueue).toHaveBeenLastCalledWith(undefined, expect.anything(), expect.any(Number))
    expect($.fetchCollectionTimelines).toHaveBeenCalled()
  })

  it('已成功加载过且在看非空: 只刷新首屏 6 条, 不重新授权', async () => {
    const $ = createContext({
      collection: {
        list: [{ subject_id: 1 }],
        _loaded: mockNow.value
      },
      fetchCollectionTimelines: jest.fn(async () => true)
    })

    await $.initFetch()

    expect($.initQueue).toHaveBeenCalledWith(6, expect.anything(), expect.any(Number))
    expect(mockUserStore.reOauth).not.toHaveBeenCalled()
  })

  it('触发全量收视进度刷新, 并将结果传递给 initQueue', async () => {
    const $ = createContext({ isLogin: true })
    const task = Promise.resolve(true)
    $.fetchUserProgressAll = jest.fn(() => task)

    await $.initFetch()
    expect($.fetchUserProgressAll).toHaveBeenCalledWith(false)
    expect($.initQueue).toHaveBeenLastCalledWith(undefined, task, expect.any(Number))

    await $.initFetch(true)
    expect($.fetchUserProgressAll).toHaveBeenLastCalledWith(true)
  })
})

describe('fetchUserProgressAll', () => {
  it('未登录: 不请求', async () => {
    const $ = createContext({ isLogin: false })
    $.fetchUserProgress = jest.fn()

    await $.fetchUserProgressAll()

    expect($.fetchUserProgress).not.toHaveBeenCalled()
  })

  /** WEB 构建不支持全量 (fetchUserProgressV0 仅单条目), 拦截分支依赖构建期常量, 不在本文件覆盖 */
  it('首次调用: 无参全量拉取并记录时间戳', async () => {
    const $ = createContext({ isLogin: true })
    $.fetchUserProgress = jest.fn(async () => [])

    await expect($.fetchUserProgressAll()).resolves.toBe(true)
    expect($.fetchUserProgress).toHaveBeenCalledTimes(1)
    expect($.fetchUserProgress.mock.calls[0]).toHaveLength(0)
    expect($.state.lastFetchedUserProgress).toBe(mockNow.value)
  })

  it('1 小时内重复调用: 节流, 不再请求', async () => {
    const $ = createContext({
      isLogin: true,
      state: {
        progress: { fetching: false },
        lastFetchedUserProgress: mockNow.value - 100
      }
    })
    $.fetchUserProgress = jest.fn()

    await expect($.fetchUserProgressAll()).resolves.toBe(true)
    expect($.fetchUserProgress).not.toHaveBeenCalled()
  })

  it('refresh=true: 绕过节流强制拉取', async () => {
    const $ = createContext({
      isLogin: true,
      state: {
        progress: { fetching: false },
        lastFetchedUserProgress: mockNow.value - 100
      }
    })
    $.fetchUserProgress = jest.fn(async () => [])

    await expect($.fetchUserProgressAll(true)).resolves.toBe(true)
    expect($.fetchUserProgress).toHaveBeenCalledTimes(1)
  })

  it('并发调用: 复用进行中的请求, 不重复发', async () => {
    const $ = createContext({ isLogin: true })
    let resolveFetch: (value: unknown[]) => void = () => {}
    $.fetchUserProgress = jest.fn(() => new Promise(resolve => (resolveFetch = resolve)))

    const first = $.fetchUserProgressAll()
    const second = $.fetchUserProgressAll()
    expect($.fetchUserProgress).toHaveBeenCalledTimes(1)

    resolveFetch([])
    await expect(first).resolves.toBe(true)
    await expect(second).resolves.toBe(true)
    expect($.userProgressAllTask).toBeNull()
  })

  it('refresh=true: 不复用进行中的旧任务, 强制发起新请求', async () => {
    const $ = createContext({ isLogin: true })
    let resolveOld: (value: unknown[]) => void = () => {}
    $.fetchUserProgress = jest
      .fn()
      // 旧任务 (旧 token): 卡在请求中
      .mockImplementationOnce(() => new Promise(resolve => (resolveOld = resolve)))
      // 强制刷新: 新请求
      .mockImplementationOnce(async () => [])

    const first = $.fetchUserProgressAll(false)
    const second = $.fetchUserProgressAll(true)
    expect($.fetchUserProgress).toHaveBeenCalledTimes(2)

    resolveOld([])
    await expect(first).resolves.toBe(true)
    await expect(second).resolves.toBe(true)
    // 旧任务迟到的 finally 不会误清新任务的缓存标记
    expect($.userProgressAllTask).toBeNull()
  })

  it('API 错误体 (invalid_token): 视为失败, 写入失败时间戳', async () => {
    const $ = createContext({ isLogin: true })
    $.fetchUserProgress = jest.fn(async () => ({ code: 401, error: 'invalid_token' }))

    await expect($.fetchUserProgressAll()).resolves.toBe(false)
    expect($.state.lastFetchedUserProgress).toBe(0)
    expect($.state.lastFailedUserProgress).toBe(mockNow.value)
  })

  it('全量请求失败: 写入失败时间戳, 5 分钟抑制窗口内不重发', async () => {
    const $ = createContext({ isLogin: true })
    $.fetchUserProgress = jest.fn(async () => undefined)

    await expect($.fetchUserProgressAll()).resolves.toBe(false)
    expect($.state.lastFailedUserProgress).toBe(mockNow.value)

    // 抑制窗口内不再发请求
    mockNow.value += 100
    await expect($.fetchUserProgressAll()).resolves.toBe(false)
    expect($.fetchUserProgress).toHaveBeenCalledTimes(1)

    // 超过 5 分钟窗口后重发
    mockNow.value += 300
    await expect($.fetchUserProgressAll()).resolves.toBe(false)
    expect($.fetchUserProgress).toHaveBeenCalledTimes(2)
  })
})

describe('initQueue 等待全量进度', () => {
  it('全量任务超时 3 秒: 队列按未刷新继续, 不被阻塞', async () => {
    jest.useFakeTimers()
    try {
      const $ = createContext({}, true)
      $.fetchSubjectsQueue = jest.fn(async () => true)
      mockUserStore.fetchCollection.mockResolvedValue({ list: [{ subject_id: 1 }], _ok: true })

      const promise = $.initQueue(undefined, new Promise<boolean>(() => {}))
      jest.advanceTimersByTime(3000)
      await expect(promise).resolves.toBe(true)
      expect($.fetchSubjectsQueue).toHaveBeenCalledWith([{ subject_id: 1 }], undefined, false)
    } finally {
      jest.useRealTimers()
    }
  })

  it('全量任务及时返回: 结果作为跳过判定', async () => {
    const $ = createContext({}, true)
    $.fetchSubjectsQueue = jest.fn(async () => true)
    mockUserStore.fetchCollection.mockResolvedValue({ list: [{ subject_id: 1 }], _ok: true })

    await expect($.initQueue(undefined, Promise.resolve(true))).resolves.toBe(true)
    expect($.fetchSubjectsQueue).toHaveBeenCalledWith([{ subject_id: 1 }], undefined, true)
  })
})

describe('fetchSubjectsQueue 单条目进度与全量刷新去重', () => {
  /** 条目数据始终过期, 保证 fetchSubject 进入拉取分支 */
  function createQueueContext() {
    return createContext({
      isLogin: true,
      sortList: (list: unknown[]) => list,
      subject: () => ({ _loaded: 0 }),
      fetchUserProgress: jest.fn(async () => true)
    }) as any & { fetchUserProgress: jest.Mock }
  }

  it('skipUserProgress=true (全量刷新成功): 队列内单条目进度跳过', async () => {
    const $ = createQueueContext()

    await $.fetchSubjectsQueue([{ subject_id: 1 }], undefined, true)

    expect($.fetchUserProgress).not.toHaveBeenCalled()
    expect(subjectStore.fetchSubject).toHaveBeenCalledTimes(1)
  })

  it('skipUserProgress=false (全量未成功): 单条目进度照常请求', async () => {
    const $ = createQueueContext()

    await $.fetchSubjectsQueue([{ subject_id: 1 }], undefined, false)

    expect($.fetchUserProgress).toHaveBeenCalledTimes(1)
    expect($.fetchUserProgress).toHaveBeenCalledWith(1)
    expect(subjectStore.fetchSubject).toHaveBeenCalledTimes(1)
  })
})
