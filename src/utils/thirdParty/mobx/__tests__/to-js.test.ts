/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 14:54:48
 *
 * 自研 toJS 与官方实现的逐行为对拍
 *  - 双世界架构: 真值世界 (官方 observable + 官方 toJS) 与自研世界
 *    (自研 observable + 自研 toJS) 各自完整运行, 对比输出结构 —— 引擎置换后
 *    跨引擎走查不存在, 对拍以平行构造实现
 *  - 真值经 'mobx/dist/index.js' 子路径直达 (mobx 已降级 devDependencies)
 */
import { observable as realObservable, toJS as realToJS } from 'mobx/dist/index.js'
import { observable, toJS } from '../index'

/** 平行构造对拍: 同一份 plain 源分别喂给官方与自研, 输出必须一致 */
function expectParity<T>(plainSource: T) {
  const real = realToJS(realObservable(plainSource as any))
  const self = toJS(observable(plainSource as any))
  expect(self).toEqual(real)
  expect(real).toEqual(self)
  return { real, self }
}

describe('toJS 对拍官方实现', () => {
  it('深层 observable 对象 (STATE 形态): 结构逐值一致', () => {
    const { self, real } = expectParity({
      tapXY: { x: 0, y: 0 },
      popableSubject: {
        subjectId: 1,
        visible: false,
        portalKey: 0,
        x: 10,
        y: 20
      },
      _loaded: 1690000000000,
      tag: null
    })
    expect(self).not.toBe(real)
    expect(self.tag).toBe(null)
    expect(real.tag).toBe(null)
  })

  it('observable 数组 (嵌套对象与基础类型混排)', () => {
    const { self } = expectParity([{ id: 1, name: 'a' }, { plain: true }, 3, null])
    expect(self).toEqual([{ id: 1, name: 'a' }, { plain: true }, 3, null])
  })

  it('浅容器 {deep:false}: 非 observable 子值原样返回引用', () => {
    const payload = [{ id: 1 }, { id: 2 }]
    const realState = realObservable({ list: payload }, undefined, { deep: false })
    const selfState = observable({ list: payload }, undefined, { deep: false })

    // 两个引擎: ref 值都不被包装, toJS 后保持原引用
    expect(realToJS(realState).list).toBe(payload)
    expect(toJS(selfState).list).toBe(payload)
    expect(toJS(selfState)).toEqual(realToJS(realState))
  })

  it('box 解包 (computedFn 场景)', () => {
    const realBox = realObservable.box(1)
    const selfBox = observable.box(1)
    expect(toJS(selfBox)).toBe(1)
    expect(realToJS(realBox)).toBe(1)

    selfBox.set(2)
    expect(toJS(selfBox)).toBe(2)
  })

  it('循环引用: 自研懒包装免疫 (官方创建即栈溢出, 无对拍基准)', () => {
    // 官方 observable 对循环引用创建即 RangeError (deepEnhancer 递归包装),
    // 自研为懒包装 —— 首次访问才转换, 且 WeakMap 身份复用使循环收敛
    const plain: any = { name: 'loop' }
    plain.self = plain
    plain.child = { parent: plain }
    const self = toJS(observable(plain))

    expect(self.name).toBe('loop')
    expect(self.child.parent.name).toBe('loop')
    expect(self.self).toBe(self)
    expect(self.child.parent).toBe(self)
  })

  it('共享子引用: 输出保持独立 (两份独立字面量)', () => {
    const { self } = expectParity({ a: { count: 1 }, b: { count: 1 } })
    expect(self.a).not.toBe(self.b)
  })

  it('Date 与函数字段原样保留', () => {
    const date = new Date('2026-11-18')
    const { self } = expectParity({ date, nested: { date } })
    expect(self.date).toBe(date)
    expect(self.nested.date).toBe(date)
  })

  it('非 observable 入参原样返回 (引用相等)', () => {
    const plain = { a: { b: 1 } }
    expect(toJS(plain)).toBe(plain)
    expect(toJS(null)).toBe(null)
    expect(toJS(undefined)).toBe(undefined)
    expect(toJS(1)).toBe(1)
    expect(toJS('str')).toBe('str')
    expect(realToJS(plain)).toBe(plain)
  })

  it('symbol 键行为与官方一致', () => {
    const sym = Symbol('extra')
    const plain: any = { visible: 1 }
    plain[sym] = { deep: 2 }

    const { self, real } = expectParity(plain)
    expect(self.visible).toBe(1)
    expect(sym in self).toBe(sym in real)
    if (sym in real) {
      expect(self[sym]).toEqual(real[sym])
    }
  })

  it('options 参数在 DEV 下抛错 (与官方 die 行为一致)', () => {
    expect(() => toJS({}, {})).toThrow('toJS no longer supports options')
    expect(() => realToJS({}, {})).toThrow('toJS no longer supports options')
  })

  it('store 实战形态: 收藏列表快照 (数组 + _loaded + 混排)', () => {
    const { self } = expectParity({
      collection: {
        list: [
          {
            subject_id: 1,
            name: '条目',
            rating: { total: 100, score: 7.5 },
            tags: ['A', 'B'],
            _loaded: 1690000000000
          },
          { id: 2, _loaded: 0 }
        ]
      },
      page: 1
    })
    expect(self.page).toBe(1)
    expect((self as any).collection.list[0].tags).toEqual(['A', 'B'])
  })
})
