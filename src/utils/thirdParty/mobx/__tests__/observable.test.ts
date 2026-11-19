/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 14:54:46
 *
 * 自研 observable 与官方实现的逐行为对拍
 *  - 双世界架构: 真值世界 (官方 observable + 官方 autorun/action/runInAction)
 *    与自研世界 (自研全家桶) 各自完整运行
 *  - 关键维度: per-key 触发粒度、懒包装、赋值通知语义、浅响应/ref 语义、
 *    数组扩展方法 (replace)、键增删的容器级通知
 */
import {
  autorun as realAutorun,
  observable as realObservable,
  runInAction as realRunInAction
} from 'mobx/dist/index.js'
import {
  autorun,
  extendObservable,
  isObservable,
  isObservableArray,
  isObservableObject,
  observable,
  remove,
  runInAction
} from '../index'

/** 统计 autorun 在场景内的触发次数 (world: 自研 'self' / 官方 'real') */
function countRuns(world: 'self' | 'real', read: () => void, mutate: () => void): number {
  const _autorun = world === 'self' ? autorun : realAutorun
  let runs = 0
  const disposer = _autorun(() => {
    read()
    runs += 1
  })
  mutate()
  disposer()
  return runs
}

describe('observable 对拍官方实现', () => {
  it('对拍官方: per-key 粒度 (读 a 不因写 b 重算)', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const s = mk({ a: 1, b: 2 })
      return countRuns(
        world,
        () => void s.a,
        () => {
          s.b = 9
          s.a = 10
        }
      )
    }
    expect(scenario('self')).toBe(scenario('real'))
    expect(scenario('self')).toBe(2)
  })

  it('深嵌套急包装: 创建即转换容器且 identity 稳定', () => {
    const s = observable({ nested: { deep: { x: 1 } } })

    expect(isObservable(s.nested)).toBe(true)
    const again = s.nested
    expect(s.nested).toBe(again)
    expect(isObservable(s.nested.deep)).toBe(true)
    expect(s.nested.deep.x).toBe(1)
  })

  it('对拍官方: 对象赋值的等值判定 (enhancer 先包装, 容器按引用比较)', () => {
    // 官方 prepareNewValue 先 enhancer 包装再 equals (Object.is) 比较 ——
    // 赋新字面量总是通知, 与官方逐一对拍
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const s = mk({ obj: { x: 1 } })
      return countRuns(
        world,
        () => void s.obj,
        () => {
          s.obj = { x: 1 }
        }
      )
    }
    expect(scenario('self')).toBe(scenario('real'))
    expect(scenario('self')).toBe(2)
  })

  it('浅容器 {deep:false}: 子值不包装, 大数据保持原引用', () => {
    const payload = [{ id: 1 }, { id: 2 }]
    const s = observable({ list: payload }, undefined, { deep: false })

    expect(isObservable(s.list)).toBe(false)
    expect(s.list).toBe(payload)
  })

  it('ref 注解键 (ingestRef 模式): 值不包装且可触发', () => {
    const s = observable<{ list: unknown }>({ list: { init: true } })

    // ingestRef: remove + extendObservable(ref)
    remove(s, 'list')
    extendObservable(s, { list: [{ id: 1 }] }, { list: (observable as any).ref })

    expect(isObservable(s.list)).toBe(false)
    const runs = countRuns(
      'self',
      () => void s.list,
      () => {
        s.list = [{ id: 2 }]
      }
    )
    expect(runs).toBe(2)
  })

  it('对拍官方: runInAction 批处理内多次写只触发一次', () => {
    const scenario = (world: 'self' | 'real') => {
      const mk: any = world === 'self' ? observable : realObservable
      const ria: any = world === 'self' ? runInAction : realRunInAction
      const au: any = world === 'self' ? autorun : realAutorun
      const s = mk({ a: 1 })
      let runs = 0
      const disposer = au(() => {
        void s.a
        runs += 1
      })
      ria(() => {
        s.a = 2
        s.a = 3
      })
      disposer()
      return runs
    }
    expect(scenario('self')).toBe(scenario('real'))
    expect(scenario('self')).toBe(2)
  })

  it('数组: push / 索引写触发, map 回调拿到容器', () => {
    const arr = observable([{ id: 1 }, { id: 2 }] as any)

    expect(isObservableArray(arr)).toBe(true)
    expect(isObservable(arr[0])).toBe(true)

    const pushRuns = countRuns(
      'self',
      () => void arr.length,
      () => {
        arr.push({ id: 3 })
      }
    )
    expect(pushRuns).toBe(2)
    expect(arr.length).toBe(3)
    expect(isObservable(arr[2])).toBe(true)

    const indexRuns = countRuns(
      'self',
      () => void arr[0],
      () => {
        arr[0] = { id: 9 }
      }
    )
    expect(indexRuns).toBe(2)
    expect(isObservable(arr[0])).toBe(true)

    let sawObservable = false
    arr.forEach((item: unknown) => {
      if (isObservable(item)) sawObservable = true
    })
    expect(sawObservable).toBe(true)
    expect(arr.map((item: any) => item.id)).toEqual([9, 2, 3])
  })

  it('数组 replace (applyStateDiff 依赖): 整体替换内容', () => {
    const arr = observable([{ id: 1 }] as any)
    const runs = countRuns(
      'self',
      () => void arr.length,
      () => {
        arr.replace([{ id: 2 }, { id: 3 }])
      }
    )
    expect(runs).toBe(2)
    expect(arr.length).toBe(2)
    expect(arr.map((item: any) => item.id)).toEqual([2, 3])
    expect(isObservable(arr[0])).toBe(true)
  })

  it('extendObservable 动态注册新键', () => {
    const s = observable<Record<string, unknown>>({ a: 1 })
    const runs = countRuns(
      'self',
      () => void s.newKey,
      () => {
        extendObservable(s, { newKey: 'value' })
      }
    )
    expect(s.newKey).toBe('value')
    expect(runs).toBe(2)
  })

  it('remove 删除键并通知', () => {
    const s = observable({ a: 1, b: 2 })
    const runs = countRuns(
      'self',
      () => void s.b,
      () => {
        remove(s, 'b')
      }
    )
    expect(s.b).toBeUndefined()
    expect(runs).toBe(2)
  })

  it('isObservable 系列路由: 自研容器识别', () => {
    const selfObj = observable({ a: 1 })
    const selfArr = observable([{ a: 1 }] as any)

    expect(isObservable(selfObj)).toBe(true)
    expect(isObservable(selfArr)).toBe(true)
    expect(isObservableObject(selfObj)).toBe(true)
    expect(isObservableArray(selfArr)).toBe(true)
    expect(isObservable({})).toBe(false)
    expect(isObservableArray([])).toBe(false)
  })

  it('浅容器入库实测形态: store/index.ts 的 {deep:false} + 引用替换', () => {
    const parent = observable(Object.assign({}, { list: [] }), undefined, {
      deep: false
    }) as any
    expect(isObservable(parent)).toBe(true)

    const payload = { list: [1, 2, 3], _loaded: 1 }
    parent.list = payload
    expect(parent.list).toBe(payload)
  })

  it('box get/set 触发 (computedFn 场景)', () => {
    const box = observable.box(1)
    const runs = countRuns(
      'self',
      () => void box.get(),
      () => {
        box.set(2)
      }
    )
    expect(box.get()).toBe(2)
    expect(runs).toBe(2)
  })
})

describe('容器边界 (官方不可对拍: 栈溢出 / 语义不同)', () => {
  it('Map/Set/Promise/类实例原样返回, 不进代理', () => {
    class Boxed {
      value = 1
    }
    const set = new Set([1])
    const map = new Map([['a', 1]])
    const promise = Promise.resolve(1)
    const instance = new Boxed()
    const s = observable({ set, map, promise, instance })

    expect(s.set).toBe(set)
    expect(s.map).toBe(map)
    expect(s.promise).toBe(promise)
    expect(s.instance).toBe(instance)
    expect(isObservable(s.set)).toBe(false)
    // 内部槽完整: 被代理后这些调用会抛 incompatible receiver
    expect(s.set.has(1)).toBe(true)
    expect(s.map.get('a')).toBe(1)
    expect(s.instance.value).toBe(1)
  })

  it('同一 raw target 每次得到独立容器 (模块级常量不跨 store 共享)', () => {
    const rawObj = { a: 1 }
    const proxyObj = observable(rawObj)
    const proxyObj2 = observable(rawObj)
    expect(proxyObj2).not.toBe(proxyObj)
    expect(proxyObj.a).toBe(1)
    expect(proxyObj2.a).toBe(1)

    const rawArr = [1]
    const proxyArr = observable(rawArr)
    const proxyArr2 = observable(rawArr)
    expect(proxyArr2).not.toBe(proxyArr)
    expect(proxyArr).toEqual([1])
    expect(proxyArr2).toEqual([1])
  })

  it('raw target 不再具有 observable 身份', () => {
    const rawArr = [1]
    const proxyArr = observable(rawArr)
    expect(isObservable(rawArr)).toBe(false)
    expect(isObservableArray(rawArr)).toBe(false)
    expect(isObservableArray(proxyArr)).toBe(true)
  })

  it('数组自引用: inFlight 路径表闭合身份 (官方创建即栈溢出)', () => {
    const self: any[] = []
    self.push(self)
    const p = observable(self) as any
    expect(p[0]).toBe(p)
    expect(isObservable(p[0])).toBe(true)
  })

  it('共享子引用: 兄弟属性各自独立容器 (官方 per-property 语义)', () => {
    const shared = { x: 1 }
    const list = observable([shared, shared]) as any
    expect(isObservable(list[0])).toBe(true)
    expect(isObservable(list[1])).toBe(true)
    expect(list[0]).not.toBe(list[1])
    expect(list[0]).toEqual(list[1])
  })
})
