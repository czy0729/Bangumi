/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 14:54:48
 *
 * 性能基准: 自研引擎 vs 官方 v6.12.3
 *  - 只实现了项目用到的接口子集, 官方的 spy / trace / interceptor /
 *    ObservableValue 对象 / devtools 命名等机制全部剥离, 逐项应有可测优势
 *  - 计时取 7 轮中位数 (预热 2 轮), 断言留 1.25x 噪声余量;
 *    包体为确定性断言 (官方 esm 202KB vs 自研源码合计)
 *  - 真值世界与自研世界各用完整自家实现, 引擎间无混用
 */
import {
  autorun as realAutorun,
  computed as realComputed,
  observable as realObservable,
  runInAction as realRunInAction,
  toJS as realToJS
} from 'mobx/dist/index.js'
import { readFileSync } from 'fs'
import { join } from 'path'
import { autorun, computed, observable, runInAction, toJS } from '../index'

/** 构造类 STATE 深层结构 */
function makeState() {
  const list: any[] = []
  for (let i = 0; i < 20; i++) {
    list.push({ id: i, name: 'item-' + i, tags: ['t' + i], score: i % 10 })
  }
  const state: Record<string, unknown> = { _loaded: 1690000000000 }
  for (let k = 0; k < 12; k++) {
    state['key' + k] = { visible: k % 2 === 0, count: k, tags: ['a', 'b'], list: list.slice(0, 10) }
  }
  state.list = list
  state.page = 1
  state.keyword = 'search'
  return state
}

/** 中位数计时 (预热 2 轮 + 7 轮) */
function bench(fn: () => void): number {
  for (let i = 0; i < 2; i++) fn()
  const times: number[] = []
  for (let i = 0; i < 7; i++) {
    const start = process.hrtime.bigint()
    fn()
    times.push(Number(process.hrtime.bigint() - start) / 1e6)
  }
  times.sort((a, b) => a - b)
  return times[3]
}

interface Row {
  name: string
  official: number
  self: number
  ratio: string
}

const rows: Row[] = []

function compare(name: string, official: () => void, self: () => void, margin = 1.25) {
  const o = bench(official)
  const s = bench(self)
  rows.push({
    name,
    official: Math.round(o * 100) / 100,
    self: Math.round(s * 100) / 100,
    ratio: (s / o).toFixed(2) + 'x'
  })
  return s <= o * margin
}

describe('性能基准: 自研引擎 vs 官方 v6.12.3', () => {
  afterAll(() => {
    console.log('\n=== 性能基准结果 (ms, 7 轮中位数, 越小越好) ===')
    rows.forEach(r => {
      console.log(
        r.name.padEnd(28) +
          'official: ' +
          String(r.official).padStart(8) +
          '  self: ' +
          String(r.self).padStart(8) +
          '  ratio: ' +
          r.ratio
      )
    })
  })

  it('对象容器创建 (深包装, 2000 次)', () => {
    const result = compare(
      'create deep state x2000',
      () => {
        for (let i = 0; i < 2000; i++) realObservable(makeState())
      },
      () => {
        for (let i = 0; i < 2000; i++) observable(makeState())
      }
    )
    expect(result).toBe(true)
  })

  it('已观察写入 + 通知 (200 轮 runInAction)', () => {
    const realS = realObservable(makeState())
    const selfS = observable(makeState())
    const result = compare(
      'tracked write x200 batches',
      () => {
        const s = realS
        const d = realAutorun(() => {
          void s.page
          void s.keyword
        })
        for (let i = 0; i < 200; i++) {
          realRunInAction(() => {
            s.page = i
            s.keyword = 'k' + i
          })
        }
        d()
      },
      () => {
        const s = selfS
        const d = autorun(() => {
          void s.page
          void s.keyword
        })
        for (let i = 0; i < 200; i++) {
          runInAction(() => {
            s.page = i
            s.keyword = 'k' + i
          })
        }
        d()
      }
    )
    expect(result).toBe(true)
  })

  it('computed 链重算 (4 级 x 300 批)', () => {
    const result = compare(
      'computed chain x300 batches',
      () => {
        const s = realObservable({ adjust: 1, base: 12, factor: 2 })
        const f1 = realComputed(() => s.base * s.adjust)
        const f2 = realComputed(() => Math.round(f1.get() * s.factor))
        const f3 = realComputed(() => f2.get() + s.factor)
        const f4 = realComputed(() => f3.get() * 1.1)
        const d = realAutorun(() => void f4.get())
        for (let i = 0; i < 300; i++) {
          realRunInAction(() => {
            s.adjust = (i % 10) + 1
          })
        }
        d()
      },
      () => {
        const s = observable({ adjust: 1, base: 12, factor: 2 })
        const f1 = computed(() => s.base * s.adjust)
        const f2 = computed(() => Math.round(f1.get() * s.factor))
        const f3 = computed(() => f2.get() + s.factor)
        const f4 = computed(() => f3.get() * 1.1)
        const d = autorun(() => void f4.get())
        for (let i = 0; i < 300; i++) {
          runInAction(() => {
            s.adjust = (i % 10) + 1
          })
        }
        d()
      }
    )
    expect(result).toBe(true)
  })

  it('toJS 快照 (1000 次)', () => {
    const realS = realObservable(makeState())
    const selfS = observable(makeState())
    const result = compare(
      'toJS snapshot x1000',
      () => {
        for (let i = 0; i < 1000; i++) realToJS(realS)
      },
      () => {
        for (let i = 0; i < 1000; i++) toJS(selfS)
      }
    )
    expect(result).toBe(true)
  })

  it('包体: 自研源码合计 < 官方 esm 的 25% (确定性断言)', () => {
    const official = readFileSync(
      join(__dirname, '../../../../../node_modules/mobx/dist/mobx.esm.js')
    ).length
    const mobxDir = join(__dirname, '..')
    const selfFiles = [
      'engine.ts',
      'observable.ts',
      'computed.ts',
      'action.ts',
      'reaction.ts',
      'to-js.ts',
      'index.ts'
    ]
    let selfSize = 0
    selfFiles.forEach(f => {
      selfSize += readFileSync(join(mobxDir, f)).length
    })
    console.log(
      '\n=== 包体 (esm 源码字节) ===\n' +
        'official: ' +
        official +
        '  self: ' +
        selfSize +
        '  (' +
        ((selfSize / official) * 100).toFixed(1) +
        '%)'
    )
    expect(selfSize).toBeLessThan(official * 0.25)
  })
})
