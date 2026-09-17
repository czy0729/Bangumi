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

// 仅提供测试路径需要的 queue (顺序执行, 语义与并发版一致)
jest.mock('@utils', () => ({
  queue: async (fetchs: (() => unknown)[] = []) => Promise.all(fetchs.map(fn => fn()))
}))

jest.mock('@utils/thirdParty/protobuf', () => ({
  decode: jest.fn(),
  get: jest.fn(() => [])
}))

import Fetch from '../fetch'

import type { UserCollectionItem } from '@utils/fetch.v0/types'

/** 构造最小收藏项 */
function makeItem(subjectId: number) {
  return { subject_id: subjectId } as UserCollectionItem
}

/** 构造被测实例: 真实 Fetch + 桩掉外部依赖 */
function createContext() {
  const $: any = new Fetch()

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

  it('progress.fetching 中拒绝新队列', async () => {
    const $ = createContext()
    $.state.progress.fetching = true

    await expect($.fetchSubjectsQueue([makeItem(1)])).resolves.toBe(false)
    expect($.fetchSubject).not.toHaveBeenCalled()
  })

  it('空列表不进入 fetching', async () => {
    const $ = createContext()

    await expect($.fetchSubjectsQueue([])).resolves.toBe(true)
    expect($.state.progress.fetching).toBe(false)
    expect($.fetchSubject).not.toHaveBeenCalled()
  })
})
