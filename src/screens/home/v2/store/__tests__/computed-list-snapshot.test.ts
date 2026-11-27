/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 首页列表快照: 刷新期间返回同一份快照, 空表不写快照, key 随用户与收藏批次变化
 *
 * 父类链 (Air) 含装饰器, 直接替换为空类
 */
jest.mock('../computed/air', () => ({ __esModule: true, default: class {} }))
jest.mock('../utils', () => ({
  getSubjectFilterName: () => '',
  matchFilter: () => true,
  sortByIds: (list: unknown[]) => list
}))
jest.mock('@stores', () => ({
  _: { window: { height: 667 } },
  calendarStore: { onAir: {}, onAirLocal: () => ({}), onAirUser: () => ({}) },
  systemStore: { setting: { homeTabs: [], showGame: false } },
  userStore: { collection: { list: [] }, isLimit: false }
}))

import { autorun, observable } from 'mobx'
import List from '../computed/list'

/** 构造被测实例: 真实 List + 桩掉外部依赖 */
function createContext() {
  const $: any = new List()

  $.state = { progress: { fetching: true } }
  $.userId = 'u1'
  $.collection = { list: [], _loaded: 100 }
  $.games = { list: [], _loaded: 100 }
  $.computeCollection = jest.fn(() => ({
    list: [{ subject_id: 1 }],
    pagination: { page: 1, pageTotal: 1 },
    _loaded: 100
  }))

  return $
}

/** 空列表数据 */
function emptyCollection() {
  return {
    list: [],
    pagination: { page: 1, pageTotal: 1 },
    _loaded: 100
  }
}

beforeEach(() => {
  new List().clearListSnapshots()
})

describe('currentCollection 快照', () => {
  it('刷新期间返回同一份快照, 收藏变化不立即反映到列表', () => {
    const $ = createContext()
    const first = $.currentCollection('动画')

    // 模拟刷新队列过程中收藏被替换
    $.computeCollection.mockReturnValue(emptyCollection())

    expect($.currentCollection('动画')).toBe(first)
    expect(first.list).toHaveLength(1)
  })

  it('空表不写快照', () => {
    const $ = createContext()
    $.computeCollection.mockReturnValue(emptyCollection())

    expect($.currentCollection('动画').list).toHaveLength(0)
    expect($.currentCollection('动画').list).toHaveLength(0)

    // 没有快照命中, 每次都重新计算
    expect($.computeCollection).toHaveBeenCalledTimes(2)
  })

  it('换用户或换收藏批次后不命中旧快照', () => {
    const $ = createContext()
    const first = $.currentCollection('动画')

    $.collection = { list: [], _loaded: 200 }
    expect($.currentCollection('动画')).not.toBe(first)

    $.userId = 'u2'
    expect($.currentCollection('动画')).not.toBe(first)
  })

  it('清理后重新计算', () => {
    const $ = createContext()
    const first = $.currentCollection('动画')
    $.clearListSnapshots()

    expect($.currentCollection('动画')).not.toBe(first)
  })

  it('非刷新期间不写快照', () => {
    const $ = createContext()
    $.state.progress.fetching = false

    const first = $.currentCollection('动画')
    expect($.currentCollection('动画')).not.toBe(first)
    expect($.computeCollection).toHaveBeenCalledTimes(2)
  })

  it('刷新结束并清理快照后列表回到真实收藏', () => {
    const $ = createContext()
    $.state = observable({ progress: { fetching: true } })

    const seen: { list: unknown[] }[] = []
    const dispose = autorun(() => seen.push($.currentCollection('动画')))

    // 刷新中: 列表来自快照
    expect(seen[seen.length - 1].list).toHaveLength(1)

    // 刷新队列结束: 进度复位 + 清理快照
    $.computeCollection.mockReturnValue(emptyCollection())
    $.state.progress.fetching = false
    $.clearListSnapshots()

    // 观察者收到重算结果, 不再是刷新期间的快照
    expect(seen[seen.length - 1].list).toHaveLength(0)
    dispose()
  })

  it('刷新未结束但快照被清理时, 也直接拿真实收藏', () => {
    const $ = createContext()
    const snapshot = $.currentCollection('动画')

    $.computeCollection.mockReturnValue(emptyCollection())
    $.clearListSnapshots()

    // fetching 仍为 true, 快照 miss 后不再返回旧列表
    expect($.currentCollection('动画')).not.toBe(snapshot)
    expect($.currentCollection('动画').list).toHaveLength(0)
  })
})
