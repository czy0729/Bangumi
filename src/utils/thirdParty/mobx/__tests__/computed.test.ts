/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 14:54:45
 *
 * 自研 computed 与官方实现的逐行为对拍
 *  - 双世界架构: 真值世界 (官方 computed + 官方 observable) 与自研世界
 *    (自研全家桶) 各自完整运行, 断言以官方探针实测值为真值
 *  - 已实测官方基准: 工厂 set 后重算 [2,10]; 实例字段 evals=3; computed 链
 *    runs=2/after=55; 订阅 afterSame=1/afterChanged=2; 对象字段赋值 rr=3
 */
import {
  autorun as realAutorun,
  computed as realComputed,
  observable as realObservable,
  runInAction as realRunInAction
} from 'mobx/dist/index.js'
import { autorun, computed, observable, runInAction } from '../index'

describe('computed 对拍官方实现', () => {
  it('对拍官方: 工厂 .get() 与依赖重算', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const cp: any = world === 'self' ? computed : realComputed
      const s = mk({ count: 1 })
      const doubled = cp(() => s.count * 2)
      const first = doubled.get()
      s.count = 5
      return [first, doubled.get()]
    }
    expect(scenario('self')).toEqual(scenario('real'))
    expect(scenario('self')).toEqual([2, 10])
  })

  it('对拍官方: 实例字段 computed 按实例缓存 (官方实测 evals=3)', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const cp: any = world === 'self' ? computed : realComputed
      let evals = 0
      class Store {
        state = mk({ base: 2 })
        doubled = cp(() => {
          evals += 1
          return this.state.base * 2
        })
      }
      const s1 = new Store()
      const s2 = new Store()
      const a1 = s1.doubled.get()
      const a2 = s1.doubled.get()
      const b1 = s2.doubled.get()
      return { a1, a2, b1, evals, cached: a1 === a2 }
    }
    const real = scenario('real')
    const self = scenario('self')
    expect(self).toEqual(real)
    expect(self).toEqual({ a1: 4, a2: 4, b1: 4, evals: 3, cached: true })
  })

  it('对拍官方: computed 链 (theme fontSize 式逐级派生, 官方 runs=2/after=55)', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const cp: any = world === 'self' ? computed : realComputed
      const ria: any = world === 'self' ? runInAction : realRunInAction
      const au: any = world === 'self' ? autorun : realAutorun
      const s = mk({ adjust: 1, base: 12 })

      const fontSize = cp(() => s.base * s.adjust)
      const fontSize2 = cp(() => Math.round(fontSize.get() * 1.5))
      const fontSize3 = cp(() => fontSize2.get() + 1)

      let runs = 0
      const disposer = au(() => {
        void fontSize3.get()
        runs += 1
      })
      ria(() => {
        s.adjust = 2
        s.adjust = 3
      })
      const after = fontSize3.get()
      disposer()
      return { runs, after }
    }
    expect(scenario('self')).toEqual(scenario('real'))
    expect(scenario('self')).toEqual({ runs: 2, after: 55 })
  })

  it('对拍官方: 订阅内的 computed 依赖收集 (afterSame=1/afterChanged=2)', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const cp: any = world === 'self' ? computed : realComputed
      const ria: any = world === 'self' ? runInAction : realRunInAction
      const au: any = world === 'self' ? autorun : realAutorun
      const s = mk({ percent: 40 })
      const percentText = cp(() => s.percent + '%')

      let renders = 0
      const disposer = au(() => {
        void percentText.get()
        renders += 1
      })
      ria(() => {
        s.percent = 40
      })
      const afterSame = renders
      ria(() => {
        s.percent = 41
      })
      const afterChanged = renders
      disposer()
      return { afterSame, afterChanged }
    }
    expect(scenario('self')).toEqual(scenario('real'))
    expect(scenario('self')).toEqual({ afterSame: 1, afterChanged: 2 })
  })

  it('对拍官方: computed 对象字段赋值通知 (官方实测 rr=3, strict warn 下仍通知)', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const cp: any = world === 'self' ? computed : realComputed
      const s = mk({ obj: { x: 1 } })
      const o = cp(() => s.obj)
      const au: any = world === 'self' ? autorun : realAutorun
      let rr = 0
      const disposer = au(() => {
        void o.get()
        rr += 1
      })
      s.obj = { x: 1 }
      s.obj = { x: 2 }
      disposer()
      return rr
    }
    expect(scenario('self')).toBe(scenario('real'))
    expect(scenario('self')).toBe(3)
  })

  it('等值门控: Object.is 语义 (原引用不通知, 新引用通知)', () => {
    const s = observable({ list: [1, 2] })
    let runs = 0
    const disposer = autorun(() => {
      void s.list
      runs += 1
    })

    const same = s.list
    s.list = same
    expect(runs).toBe(1)
    s.list = [1, 2]
    expect(runs).toBe(2)
    disposer()
  })

  it('异常透传: computation 抛错在 .get() 复现且状态可恢复', () => {
    const s = observable({ n: 0 })
    const boom = computed(() => {
      if (s.n > 0) throw new Error('boom-' + s.n)
      return s.n
    })
    expect(boom.get()).toBe(0)
    s.n = 1
    expect(() => boom.get()).toThrow('boom-1')
    s.n = -1
    expect(boom.get()).toBe(-1)
  })

  it('工厂 computed 挂起语义: 有订阅时缓存, 无订阅时重算', () => {
    const s = observable({ n: 1 })
    let evals = 0
    const c = computed(() => {
      evals += 1
      return s.n * 10
    })

    // 无订阅: 每次 get 重算 (官方 untracked 分支同款)
    c.get()
    c.get()
    expect(evals).toBe(2)

    // 建立订阅: 进入缓存模式
    const disposer = autorun(() => void c.get())
    s.n = 2
    const a = c.get()
    const b = c.get()
    disposer()
    expect(a).toBe(20)
    expect(b).toBe(20)
    expect(evals).toBeGreaterThan(2)
  })
})
