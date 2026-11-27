/*
 * @Author: czy0729
 * @Date: 2026-08-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 20:39:37
 *
 * 验证 fetchSubjectsQueue 的 progress 复位保障:
 * 任一请求 reject 时不能让 progress.fetching 卡在 true,
 * 否则后续下拉刷新会被 initFetch 入口拦截 ("正在刷新条目信息")
 *
 * 父类链 (Computed/State) 与测试无关且含装饰器, 直接替换为空类
 */
jest.mock('../computed', () => ({ __esModule: true, default: class {} }))

// 仅提供测试路径需要的成员
jest.mock('@utils', () => ({
  debounce: (fn: unknown) => fn,
  getTimestamp: () => 0,
  queue: async (fetchs: (() => unknown)[] = []) => Promise.all(fetchs.map(fn => fn())),
  updateVisibleBottom: jest.fn()
}))

jest.mock('@stores', () => ({
  _: { window: { height: 667 } },
  collectionStore: {},
  subjectStore: { fetchSubject: jest.fn(async () => true) },
  systemStore: { setting: {} },
  timelineStore: {},
  userStore: { isWebLogin: true }
}))

jest.mock('@utils/thirdParty/protobuf', () => ({
  decode: jest.fn(),
  get: jest.fn(() => [])
}))

jest.mock('@utils/fetch', () => ({ t: jest.fn() }))

import { subjectStore } from '@stores'
import Fetch from '../fetch'
import Ui from '../action/ui'

// 用例内会改写模块级桩, 结束后恢复默认实现
afterEach(() => {
  ;(subjectStore.fetchSubject as jest.Mock).mockReset()
  ;(subjectStore.fetchSubject as jest.Mock).mockImplementation(async () => true)
})

import type { UserCollectionItem } from '@utils/fetch.v0/types'

/** 构造最小收藏项 */
function makeItem(subjectId: number) {
  return { subject_id: subjectId } as UserCollectionItem
}

/** 构造被测实例: 真实 Fetch + 桩掉外部依赖 */
function createContext() {
  const $: any = new Fetch()

  // 保留真实实现 (箭头函数已绑定本实例), 供条目级用例使用
  $.realFetchSubject = $.fetchSubject

  $.state = {
    progress: {
      fetching: false,
      fetchingSubjectId1: 0,
      fetchingSubjectId2: 0,
      message: '',
      current: 0,
      total: 0
    }
  }
  $.sortList = (list: UserCollectionItem[]) => list
  $.fetchSubject = jest.fn(async () => true)
  $.clearListSnapshots = jest.fn()
  $.setState = jest.fn((partial: { progress?: Record<string, any> }) => {
    if (partial?.progress) Object.assign($.state.progress, partial.progress)
    return true
  })

  return $
}

describe('fetchSubjectsQueue', () => {
  it('请求失败时也必须复位 progress (finally 兜底)', async () => {
    const $ = createContext()
    $.fetchSubject.mockRejectedValueOnce(new Error('network'))
    $.fetchSubject.mockImplementation(async () => {
      // 队列执行期间 fetching 应处于开启状态
      expect($.state.progress.fetching).toBe(true)
      return true
    })

    const list = [makeItem(1), makeItem(2)]
    await expect($.fetchSubjectsQueue(list)).resolves.toBe(true)

    expect($.state.progress.fetching).toBe(false)
    expect($.state.progress.fetchingSubjectId1).toBe(0)
    expect($.state.progress.fetchingSubjectId2).toBe(0)
  })

  it('正常完成后复位 progress', async () => {
    const $ = createContext()
    const list = [makeItem(1), makeItem(2)]

    await expect($.fetchSubjectsQueue(list)).resolves.toBe(true)

    expect($.fetchSubject).toHaveBeenCalledTimes(2)
    expect($.state.progress.fetching).toBe(false)
    expect($.state.progress.fetchingSubjectId1).toBe(0)
    expect($.state.progress.fetchingSubjectId2).toBe(0)
  })

  it('队列过程中写入真实 current/total', async () => {
    const $ = createContext()
    const totals: number[] = []
    const advances: number[] = []
    const setState = $.setState
    $.setState = jest.fn((partial: { progress?: Record<string, any> }) => {
      const result = setState(partial)
      if (typeof partial?.progress?.current === 'number') advances.push(partial.progress.current)
      return result
    })

    // 乱序完成 (真实 pLimit 并发下完成顺序不保证): 1 最慢, 3 最快
    const delays: Record<number, number> = { 1: 30, 2: 20, 3: 0 }
    $.fetchSubject.mockImplementation(async (subjectId: number) => {
      await new Promise(resolve => setTimeout(resolve, delays[subjectId]))
      // 任务执行期间读到的进度快照
      totals.push($.state.progress.total)
      return true
    })

    const list = [makeItem(1), makeItem(2), makeItem(3)]
    await expect($.fetchSubjectsQueue(list)).resolves.toBe(true)

    // total 为本次入队条目数
    expect(totals).toEqual([3, 3, 3])
    // 忽略首尾复位写入的 0 后, 推进值必须恰好是 1..total:
    // 出现重复值说明累加被覆盖 (例如任务开始时读 state 再回写), 缺失说明有条目没计入
    expect(advances.filter(value => value > 0).sort((a, b) => a - b)).toEqual([1, 2, 3])

    // 结束后整体复位
    expect($.state.progress.current).toBe(0)
    expect($.state.progress.total).toBe(0)
  })

  it('count 截断时 total 为实际入队条目数', async () => {
    const $ = createContext()
    const seen: number[] = []
    $.fetchSubject.mockImplementation(async () => {
      seen.push($.state.progress.total)
      return true
    })

    const list = [makeItem(1), makeItem(2), makeItem(3)]
    await expect($.fetchSubjectsQueue(list, 2)).resolves.toBe(true)

    expect($.fetchSubject).toHaveBeenCalledTimes(2)
    expect(seen).toEqual([2, 2])
  })

  it('progress.fetching 中返回独立忙碌标记', async () => {
    const $ = createContext()
    $.state.progress.fetching = true

    // 不能返回 false (上层会当成授权过期), 也不能返回 true (上层会当成真的跑过队列)
    await expect($.fetchSubjectsQueue([makeItem(1)])).resolves.toBe('busy')
    expect($.fetchSubject).not.toHaveBeenCalled()
  })

  it('队列结束后清理列表快照', async () => {
    const $ = createContext()

    await expect($.fetchSubjectsQueue([makeItem(1)])).resolves.toBe(true)
    expect($.clearListSnapshots).toHaveBeenCalledTimes(1)
  })

  it('队列被作废后不写进度、不复位、不清理快照', async () => {
    const $ = createContext()
    let release: (value: boolean) => void = () => {}
    $.fetchSubject.mockImplementation(
      () =>
        new Promise<boolean>(resolve => {
          release = resolve
        })
    )

    const task = $.fetchSubjectsQueue([makeItem(1)])
    $.resetQueue()

    // 模拟新一轮队列已经开始
    $.state.progress.fetching = true
    $.state.progress.total = 5
    const callsAfterReset = $.setState.mock.calls.length

    release(true)
    await expect(task).resolves.toBe(true)

    // 旧队列不能再写 current、复位 fetching、清快照
    expect($.setState).toHaveBeenCalledTimes(callsAfterReset)
    expect($.state.progress.fetching).toBe(true)
    expect($.state.progress.total).toBe(5)
    expect($.state.progress.current).toBe(0)
    expect($.clearListSnapshots).not.toHaveBeenCalled()
  })

  it('fetchSubject 被作废后不写条目指示位', async () => {
    const $ = createContext()
    $.subject = () => ({ _loaded: 0 })
    $.fetchUserProgress = jest.fn(async () => {
      // 请求期间发生登录态切换
      $.resetQueue()
      return true
    })

    await expect($.realFetchSubject(1, 0, true)).resolves.toBe(true)

    // 作废前已占用的指示位保持原值, 不会被旧队列清零
    expect($.state.progress.fetchingSubjectId2).toBe(1)
    expect($.state.progress.fetchingSubjectId1).toBe(0)
  })

  it('空列表不进入 fetching', async () => {
    const $ = createContext()

    await expect($.fetchSubjectsQueue([])).resolves.toBe(true)
    expect($.state.progress.fetching).toBe(false)
    expect($.fetchSubject).not.toHaveBeenCalled()
  })
})

describe('itemToggleExpand', () => {
  it('展开请求跨登录态切换后不清零指示位', async () => {
    const $: any = new Ui()
    $.state = {
      progress: { fetchingSubjectId1: 0, fetchingSubjectId2: 0 },
      item: {}
    }
    $.save = jest.fn()
    $.setState = jest.fn((partial: { progress?: Record<string, any> }) => {
      if (partial?.progress) Object.assign($.state.progress, partial.progress)
      return true
    })
    $.$Item = () => ({ expand: false })
    $.fetchUserProgress = jest.fn()

    let release: (value: boolean) => void = () => {}
    ;(subjectStore.fetchSubject as jest.Mock).mockImplementation(
      () =>
        new Promise<boolean>(resolve => {
          release = resolve
        })
    )

    $.itemToggleExpand(1)

    // 展开即占用指示位
    expect($.state.progress.fetchingSubjectId2).toBe(1)

    // 请求期间登录态切换, 旧请求结束后不能清零新队列的槽位
    $.resetQueue()
    release(true)
    await new Promise(resolve => setTimeout(resolve, 0))

    expect($.state.progress.fetchingSubjectId2).toBe(1)
  })
})
