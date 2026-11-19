/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * observable 容器: proxy + per-key atom 实现
 *  - 深包装 (默认) / 浅包装 ({deep: false}) / ref 注解, 写入独立副本不污染调用方
 *  - 数组 replace / remove / clear 与原生变更方法; 对象 remove / extendObservable
 *  - 循环引用经 in-flight 路径表闭合身份
 *  - 对齐 mobx v6.12.3, 对拍见 __tests__/
 */
import { Atom, checkIfStateModificationsAreAllowed } from './engine'

import type { IAtom } from './engine'

/** 自研容器标识: 经 WeakMap 挂靠在容器 (proxy) 身份上, 不污染 target 键空间 */
const adminMap = new WeakMap<object, Admin>()

/**
 * 急包装递归的 in-flight 路径表: raw → 构建中的容器
 *  - 命中 = 当前递归路径上的循环引用, 返回同容器闭合身份
 *  - 子树完成即移除: 兄弟属性对同一 raw 各自得到独立容器 (官方 per-property 语义)
 */
const inFlight = new Map<object, object>()

/** observable.ref 注解标记 (utils/store/utils.ts 的浅响应入库依赖此形态) */
const REF_ANNOTATION = { __mobxMiniAnnotation: 'ref' } as const

interface ObjectAdmin {
  kind: 'object'
  atom: IAtom
  keyAtoms: Map<PropertyKey, IAtom>
  refKeys: Set<string>
  deep: boolean
  target: Record<string, unknown>
}

interface ArrayAdmin {
  kind: 'array'
  atom: IAtom
  deep: boolean
  target: unknown[]
  /** 方法包装器缓存 (官方 arrayExtensions 为模块级稳定引用, 免每次访问分配闭包) */
  methods: Map<string, (...args: any[]) => unknown>
}

interface BoxAdmin {
  kind: 'box'
  atom: IAtom
  deep: boolean
  value: unknown
}

type Admin = ObjectAdmin | ArrayAdmin | BoxAdmin

function adminOf(value: unknown): Admin | null {
  if (value === null || typeof value !== 'object') return null
  return adminMap.get(value) ?? null
}

/** 自研容器判定 */
export function isObservableSelf(value: unknown): boolean {
  return adminOf(value) !== null
}

/** 供 facade 体系 (toJS 等) 识别自研容器 */
export function getSelfAdmin(value: unknown): Admin | null {
  return adminOf(value)
}

/** Object 构造函数的字符串形态 (官方 isPlainObject 的判定基准) */
const PLAIN_OBJECT_STRING = Object.toString()

/** 官方 isPlainObject: 按原型链判定, class 实例 / Map / Set / Promise / TypedArray 均不在内 */
function isPlainObjectValue(value: object): boolean {
  const proto = Object.getPrototypeOf(value)
  // 普通对象与 Object.create(null) 的快路径
  if (proto === null || proto === Object.prototype) return true
  const protoConstructor = Object.prototype.hasOwnProperty.call(proto, 'constructor')
    ? (proto as { constructor?: unknown }).constructor
    : undefined
  return (
    typeof protoConstructor === 'function' && protoConstructor.toString() === PLAIN_OBJECT_STRING
  )
}

/** 可深包装的 plain 容器: 数组与 plain object, 其余 (Date/RegExp/Map/Set/Promise/类实例) 原样保留 */
function isPlainContainer(value: unknown): boolean {
  if (value === null || typeof value !== 'object') return false
  if (isObservableSelf(value)) return false
  if (Array.isArray(value)) return true
  return isPlainObjectValue(value)
}

/**
 * 官方 enhancer: 深模式包装 plain 子值, 其余原样
 *  - 循环引用经 inFlight 闭合 (官方此场景创建即栈溢出)
 *  - 兄弟属性对同一 raw 各自新建 (官方 per-property 语义, 无跨键别名)
 */
function enhance(value: unknown, deep: boolean): unknown {
  if (!deep || !isPlainContainer(value)) return value
  const existing = inFlight.get(value as object)
  if (existing) return existing
  return Array.isArray(value)
    ? createArrayContainer(value as unknown[], true)
    : createObjectContainer(value as Record<string, unknown>, true)
}

function keyAtomOf(admin: ObjectAdmin, key: PropertyKey): IAtom {
  let atom = admin.keyAtoms.get(key)
  if (!atom) {
    atom = new Atom(String(key))
    admin.keyAtoms.set(key, atom)
  }
  return atom
}

function createObjectContainer(source: Record<string, unknown>, deep: boolean) {
  // 独立副本: observable 的写入不能污染调用方传入的对象 (模块级 STATE / LIST_EMPTY 常量)
  const target: Record<string, unknown> = { ...source }
  const admin: ObjectAdmin = {
    kind: 'object',
    atom: new Atom('ObservableObject'),
    keyAtoms: new Map(),
    refKeys: new Set(),
    deep,
    target
  }

  const proxy = new Proxy(target, {
    get(t, key) {
      // symbol 走原始读取 (迭代器/内建符号不参与响应式)
      if (typeof key === 'symbol') return t[key as any]
      keyAtomOf(admin, key).reportObserved()
      return t[key]
    },
    set(t, key, value) {
      if (typeof key === 'symbol') {
        t[key as any] = value
        return true
      }
      const atom = keyAtomOf(admin, key)
      // 官方 prepareNewValue_ 同款: 等值门控之前先做严格模式检查
      checkIfStateModificationsAreAllowed(atom)
      // 新键判定必须用自有键 (官方 keysAtom 语义): 'toString' 等原型键赋值也是新增
      const isNewKey = !Object.prototype.hasOwnProperty.call(t, key)
      const isRef = admin.refKeys.has(key)
      const next = isRef ? value : enhance(value, deep)
      // 官方 ObservableValue: equals (comparer.default = Object.is) 相等即 UNCHANGED 不通知
      if (!Object.is(t[key], next)) {
        t[key] = next
        atom.reportChanged()
        // 新键增删必须同时报告容器级 atom (Object.keys / for-in 订阅依赖它, 官方 keysAtom 语义)
        if (isNewKey) admin.atom.reportChanged()
      }
      return true
    },
    has(t, key) {
      if (typeof key !== 'symbol') {
        // 自有键观察 per-key atom; 原型键/缺失键观察容器级 atom
        // (避免 'toString' in obj 这类查询创建无意义 keyAtom)
        if (Object.prototype.hasOwnProperty.call(t, key)) {
          keyAtomOf(admin, key).reportObserved()
        } else {
          admin.atom.reportObserved()
        }
      }
      return key in t
    },
    deleteProperty(t, key) {
      if (typeof key !== 'symbol') {
        // 官方 delete_ 对缺失键 no-op: 幂等 delete 不产生假通知
        if (Object.prototype.hasOwnProperty.call(t, key)) {
          const atom = keyAtomOf(admin, key)
          checkIfStateModificationsAreAllowed(atom)
          atom.reportChanged()
          admin.atom.reportChanged()
        }
      }
      delete t[key as any]
      return true
    },
    ownKeys(t) {
      admin.atom.reportObserved()
      return Reflect.ownKeys(t)
    }
  })
  adminMap.set(proxy, admin)

  // 急包装 (官方 enhancer 同款): 创建即递归转换子值; inFlight 路径表闭合循环引用
  if (deep) {
    inFlight.set(source, proxy)
    try {
      for (const key of Object.keys(target)) {
        target[key] = enhance(target[key], true)
      }
    } finally {
      inFlight.delete(source)
    }
  }
  return proxy
}

const ARRAY_MUTATORS = new Set([
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
  'fill',
  'copyWithin'
])

/** mobx 数组扩展方法 (applyStateDiff 依赖 replace) */
const ARRAY_MOBX_METHODS = new Set(['replace', 'remove', 'clear'])

/** get 陷阱先查的合并集合: 方法名不可能是数组索引, 方法调用路径免走 isIndexKey 正则 */
const ARRAY_METHODS = new Set([...ARRAY_MOBX_METHODS, ...ARRAY_MUTATORS])

function isIndexKey(prop: string): boolean {
  return /^(0|[1-9]\d*)$/.test(prop)
}

function createArrayContainer(source: unknown[], deep: boolean) {
  // 独立副本: observable 的写入不能污染调用方数组 (如 LIST_EMPTY.list 常量)
  const target: unknown[] = source.slice()
  const admin: ArrayAdmin = {
    kind: 'array',
    atom: new Atom('ObservableArray'),
    deep,
    target,
    methods: new Map()
  }

  const proxy = new Proxy(target, {
    get(t, key) {
      // 官方数组为容器级 atom: 读 length / 索引 / 迭代均观察同一 atom
      if (key === 'length') {
        admin.atom.reportObserved()
        return t.length
      }
      if (typeof key === 'symbol') {
        admin.atom.reportObserved()
        return t[key as any]
      }
      // 方法集合先于索引判定 (方法名不可能是索引): 方法调用路径免走 isIndexKey 正则
      if (ARRAY_METHODS.has(key)) {
        // 包装器按 admin 缓存: 每次属性访问稳定返回同一函数, 免闭包分配 (官方 arrayExtensions 同款)
        let fn = admin.methods.get(key)
        if (fn) return fn
        if (ARRAY_MOBX_METHODS.has(key)) {
          fn = (...args: unknown[]) => {
            let result: unknown
            if (key === 'replace') {
              checkIfStateModificationsAreAllowed(admin.atom)
              const items = deep
                ? (args[0] as unknown[]).map(a => enhance(a, true))
                : (args[0] as unknown[])
              // 等值守卫: 等长且逐项引用一致时不通知 (官方按实际变化通知的约定)
              let unchanged = t.length === items.length
              if (unchanged) {
                for (let i = 0; i < items.length; i++) {
                  if (!Object.is(t[i], items[i])) {
                    unchanged = false
                    break
                  }
                }
              }
              if (!unchanged) {
                t.length = 0
                // 循环赋值而非 push 展开: 超大数组 (>65535) 展开会 RangeError
                for (let i = 0; i < items.length; i++) {
                  t[i] = items[i]
                }
                admin.atom.reportChanged()
              }
              result = proxy
            } else if (key === 'remove') {
              checkIfStateModificationsAreAllowed(admin.atom)
              result = (t as any).splice(Number(args[0]), 1)[0]
            } else {
              checkIfStateModificationsAreAllowed(admin.atom)
              t.length = 0
              result = proxy
            }
            if (key !== 'replace') admin.atom.reportChanged()
            return result
          }
        } else {
          fn = (...args: unknown[]) => {
            checkIfStateModificationsAreAllowed(admin.atom)
            const result = (t as any)[key](...(deep ? args.map(a => enhance(a, true)) : args))
            admin.atom.reportChanged()
            // sort / reverse 官方返回数组自身 (容器), 其余按原生返回值
            if (key === 'sort' || key === 'reverse') return proxy
            return result
          }
        }
        admin.methods.set(key, fn)
        return fn
      }
      if (isIndexKey(key)) {
        admin.atom.reportObserved()
        return t[key as any]
      }
      if (typeof t[key as any] !== 'function') {
        admin.atom.reportObserved()
        return t[key as any]
      }
      // 只读方法: 观察后委托 (target 存容器, 回调直接拿到容器, 与官方一致); 包装器同样缓存
      let fn = admin.methods.get(key)
      if (!fn) {
        fn = (...args: unknown[]) => {
          admin.atom.reportObserved()
          return (t as any)[key](...args)
        }
        admin.methods.set(key, fn)
      }
      return fn
    },
    set(t, key, value) {
      if (typeof key === 'string' && isIndexKey(key)) {
        checkIfStateModificationsAreAllowed(admin.atom)
        t[Number(key)] = enhance(value, deep)
        admin.atom.reportChanged()
        return true
      }
      if (key === 'length') {
        // 等值守卫: 长度未变化不通知
        const nextLength = value as number
        if (t.length === nextLength) return true
        checkIfStateModificationsAreAllowed(admin.atom)
        t.length = nextLength
        admin.atom.reportChanged()
        return true
      }
      if (typeof key === 'symbol') {
        t[key as any] = value
        return true
      }
      // 非索引自定义键: 也要通知 (官方 adm.set_ 语义), 否则静默失联
      checkIfStateModificationsAreAllowed(admin.atom)
      t[key as any] = enhance(value, deep)
      admin.atom.reportChanged()
      return true
    },
    has(t, key) {
      admin.atom.reportObserved()
      return Reflect.has(t, key)
    }
  })
  adminMap.set(proxy, admin)

  // 急包装: inFlight 路径表闭合自引用数组
  if (deep) {
    inFlight.set(source, proxy)
    try {
      for (let i = 0; i < target.length; i++) {
        target[i] = enhance(target[i], true)
      }
    } finally {
      inFlight.delete(source)
    }
  }
  return proxy
}

/** box: 独立可观察值 (computedFn 测试等场景) */
function createBoxContainer(value: unknown, deep: boolean) {
  const admin: BoxAdmin = {
    kind: 'box',
    atom: new Atom('ObservableValue'),
    deep,
    value: enhance(value, deep)
  }
  const box = {
    get(): unknown {
      admin.atom.reportObserved()
      return admin.value
    },
    set(newValue: unknown): void {
      checkIfStateModificationsAreAllowed(admin.atom)
      const next = enhance(newValue, admin.deep)
      if (!Object.is(admin.value, next)) {
        admin.value = next
        admin.atom.reportChanged()
      }
    }
  }
  adminMap.set(box, admin)
  return box
}

/**
 * 创建 observable
 *  - 对象/数组: 深容器 (默认) 或浅容器 ({deep: false})
 *  - 函数/基础类型: 原样返回 (官方 autoAction 语义项目未用, STATE 无函数字段)
 *  - box: observable.box(v); map / set: 项目零使用, 调用即抛错
 */
export const observable = Object.assign(
  function observable<T extends object>(
    source: T,
    _annotations?: Record<PropertyKey, unknown>,
    options?: { deep?: boolean }
  ): T {
    if (source === null || typeof source !== 'object') {
      return source
    }
    if (isObservableSelf(source)) return source

    const deep = options?.deep !== false
    return (Array.isArray(source)
      ? createArrayContainer(source as unknown[], deep)
      : createObjectContainer(source as Record<string, unknown>, deep)) as unknown as T
  },
  {
    /** 浅响应注解 (extendObservable 第三参使用) */
    ref: REF_ANNOTATION,
    /** 注解形态按 ref 处理 (项目未区分使用) */
    shallow: REF_ANNOTATION,
    box: (value: unknown) => createBoxContainer(value, true),
    map: () => {
      throw new Error('[mobx] observable.map 项目未使用, 未实现')
    },
    set: () => {
      throw new Error('[mobx] observable.set 项目未使用, 未实现')
    },
    array: (value: unknown[] = []) => createArrayContainer(value, true),
    object: (value: Record<string, unknown> = {}, options?: { deep?: boolean }) =>
      createObjectContainer(value, options?.deep !== false)
  }
)

/**
 * 动态注册新键 (BaseStore.clearState / applyStateDiff / ingestRef 依赖)
 *  - 自研容器逐键写入, ref 注解键存原值且恒等比较
 */
export function extendObservable<T extends object>(
  target: T,
  props: object,
  annotations?: Record<PropertyKey, unknown>
): T {
  const admin = adminOf(target)
  if (!admin || admin.kind !== 'object') {
    // 非容器: 直接赋值 (无响应式语义可谈)
    for (const key of Object.keys(props)) {
      ;(target as Record<string, unknown>)[key] = (props as Record<string, unknown>)[key]
    }
    return target
  }

  // 官方 addObservableProp 同款 (setState / ingestRef 均在 action 内调用, 不受影响)
  checkIfStateModificationsAreAllowed(admin.atom)

  const source = props as Record<string, unknown>
  for (const key of Object.keys(source)) {
    const isRef = annotations?.[key] === REF_ANNOTATION
    if (isRef) {
      admin.refKeys.add(key)
    }
    // 写 raw target (绕过 set 陷阱, 避免与手动通知双重触发); 新键值走 enhancer
    admin.target[key] = isRef ? source[key] : enhance(source[key], admin.deep)
    // 键增删必须同时报告容器级 atom (Object.keys / for-in 订阅依赖它, 官方 keysAtom 语义)
    keyAtomOf(admin, key).reportChanged()
    admin.atom.reportChanged()
  }
  return target
}

/**
 * 移除键 (ingestRef 依赖): 删除并通知
 */
export function remove<T, K extends keyof T>(target: T, key: K): void {
  const admin = adminOf(target)
  if (!admin || admin.kind !== 'object') {
    delete (target as Record<PropertyKey, unknown>)[key as PropertyKey]
    return
  }
  // 官方 delete_ 对缺失键 no-op: 幂等 remove 不产生假通知 (ingestRef 已前置 hasOwn, 双保险)
  if (!Object.prototype.hasOwnProperty.call(admin.target, key as PropertyKey)) {
    return
  }
  const atom = keyAtomOf(admin, key as PropertyKey)
  checkIfStateModificationsAreAllowed(atom)
  // 写 raw target (绕过 deleteProperty 陷阱, 避免双重通知);
  // 键删除同时报告容器级 atom (官方 keysAtom 语义)
  delete (admin.target as Record<PropertyKey, unknown>)[key as PropertyKey]
  atom.reportChanged()
  admin.atom.reportChanged()
}

export function isObservable(value: unknown): boolean {
  return isObservableSelf(value)
}

export function isObservableArray(value: unknown): boolean {
  return adminOf(value)?.kind === 'array'
}

export function isObservableObject(value: unknown): boolean {
  return adminOf(value)?.kind === 'object'
}
