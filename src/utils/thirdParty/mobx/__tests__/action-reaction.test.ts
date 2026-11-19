/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 14:54:43
 *
 * 自研 action / runInAction / autorun 与官方实现的逐行为对拍
 */
import {
  action as realAction,
  autorun as realAutorun,
  observable as realObservable,
  runInAction as realRunInAction
} from 'mobx/dist/index.js'
import { action, autorun, observable, runInAction } from '../index'

describe('action 对拍官方实现', () => {
  it('对拍官方: action 内多次写合并为一次触发 (官方 runs=2)', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const ac: any = world === 'self' ? action : realAction
      const au: any = world === 'self' ? autorun : realAutorun
      const s = mk({ a: 1 })
      let runs = 0
      const disposer = au(() => {
        void s.a
        runs += 1
      })
      const bump = ac(() => {
        s.a = 2
        s.a = 3
      })
      bump()
      disposer()
      return runs
    }
    expect(scenario('self')).toBe(scenario('real'))
    expect(scenario('self')).toBe(2)
  })

  it('对拍官方: runInAction 返回值透传', () => {
    const self = runInAction(() => 'ok-self')
    const real = realRunInAction(() => 'ok-real')
    expect(self).toBe('ok-self')
    expect(real).toBe('ok-real')
  })

  it('对拍官方: action 异常向上抛出且状态已生效', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const ac: any = world === 'self' ? action : realAction
      const s = mk({ a: 1 })
      try {
        ac(() => {
          s.a = 42
          throw new Error('boom')
        })()
        return 'no-throw'
      } catch (e: any) {
        return (e.message === 'boom' ? 'boom' : 'wrong') + ':' + s.a
      }
    }
    expect(scenario('self')).toBe(scenario('real'))
    expect(scenario('self')).toBe('boom:42')
  })

  it('action 内嵌套 runInAction 收敛', () => {
    const s = observable({ a: 1 })
    let runs = 0
    const disposer = autorun(() => {
      void s.a
      runs += 1
    })
    action(() => {
      s.a = 2
      runInAction(() => {
        s.a = 3
      })
    })()
    expect(runs).toBe(2)
    expect(s.a).toBe(3)
    disposer()
  })
})

describe('autorun 对拍官方实现', () => {
  it('对拍官方: 立即执行一次 + 依赖切换后重跑', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const au: any = world === 'self' ? autorun : realAutorun
      const s = mk({ flag: false, aName: 'a', bName: 'b' })
      const seen: string[] = []
      const disposer = au(() => {
        seen.push(s.flag ? s.aName : s.bName)
      })
      s.flag = true
      s.aName = 'a2'
      disposer()
      return { seen, count: seen.length }
    }
    const real = scenario('real')
    const self = scenario('self')
    expect(self).toEqual(real)
    expect(self.count).toBe(3)
  })

  it('对拍官方: dispose 后不再触发', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const au: any = world === 'self' ? autorun : realAutorun
      const s = mk({ a: 1 })
      let runs = 0
      const disposer = au(() => {
        void s.a
        runs += 1
      })
      disposer()
      s.a = 2
      return runs
    }
    expect(scenario('self')).toBe(scenario('real'))
    expect(scenario('self')).toBe(1)
  })

  it('顺序收敛 (官方批次语义)', () => {
    const s = observable({ a: 1, b: 1 })
    const log: string[] = []
    const disposer = autorun(() => {
      log.push(s.a + '-' + s.b)
    })
    action(() => {
      s.a = 2
    })()
    action(() => {
      s.b = 2
    })()
    expect(log).toEqual(['1-1', '2-1', '2-2'])
    disposer()
  })

  it('suppress 复位: 出错 action 结束后 reaction 异常恢复上报', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const s = observable({ a: 1, boom: false })
      const disposer = autorun(() => {
        if (s.boom) throw new Error('reaction boom')
        void s.a
      })

      expect(() =>
        action(() => {
          s.a = 2
          throw new Error('action boom')
        })()
      ).toThrow('action boom')

      s.boom = true
      const reported = errorSpy.mock.calls.some(call =>
        String(call[0]).includes('uncaught error in')
      )
      expect(reported).toBe(true)
      disposer()
    } finally {
      errorSpy.mockRestore()
    }
  })
})
