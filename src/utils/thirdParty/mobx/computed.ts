/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * computed: ComputedValue 移植 (POSSIBLY_STALE 延迟验证 / 等值门控 / 失去观察者自动挂起)
 *  - 等值判定 Object.is (官方 comparer.default)
 *  - 双形态: 工厂 computed(fn) 与 legacy 装饰器 @computed get x()
 *  - 对齐 mobx v6.12.3
 */
import {
  allowStateChangesEnd,
  allowStateChangesStart,
  CaughtException,
  clearObserving,
  endBatch,
  globalState,
  isCaughtException,
  NOT_TRACKING,
  propagateChangeConfirmed,
  propagateMaybeChanged,
  reportObserved,
  shouldCompute,
  startBatch,
  trackDerivedFunction,
  UP_TO_DATE
} from './engine'

import type { IDerivation, IObservable } from './engine'

export interface ComputedValueOptions<T> {
  get: () => T
  context?: unknown
  name?: string
  equals?: (a: T, b: T) => boolean
}

export class ComputedValue<T = any> implements IDerivation {
  dependenciesState_ = NOT_TRACKING
  observing_: IObservable[] = []
  newObserving_: IObservable[] | null = null
  diffValue_ = 0
  runId_ = 0
  unboundDepsCount_ = 0
  isBeingObserved_ = false
  isPendingUnobservation_ = false
  observers_ = new Set<IDerivation>()
  lastAccessedBy_ = 0
  lowestObserverState_ = UP_TO_DATE
  isRunning_ = false
  isDisposed_ = false
  isScheduled_ = false

  isComputing_ = false
  value_: T | CaughtException
  derivation: () => T
  equals_: (a: T, b: T) => boolean

  constructor(public options: ComputedValueOptions<T>) {
    this.derivation = options.get
    this.equals_ = options.equals ?? Object.is
    // 官方: 初始值置于 CaughtException(null) 占位
    this.value_ = new CaughtException(null)
  }

  /** 依赖变化: 标记 POSSIBLY_STALE 并向观察者传播 (延迟验证, 官方核心优化) */
  onBecomeStale_(): void {
    propagateMaybeChanged(this)
  }

  /**
   * 取当前值, 必要时重算
   *  - 无观察者时走 untracked 快路径 (官方同款: 免除订阅开销)
   *  - 有观察者时 reportObserved 建立依赖 + shouldCompute 验证后重算
   */
  get(): T {
    if (this.isComputing_) {
      throw new Error('[mobx] Cycle detected in computation ' + (this.options.name ?? ''))
    }
    if (globalState.inBatch === 0 && this.observers_.size === 0) {
      if (shouldCompute(this)) {
        startBatch()
        this.value_ = this.computeValue_(false) as T
        endBatch()
      }
    } else {
      reportObserved(this)
      if (shouldCompute(this)) {
        if (this.trackAndCompute()) {
          propagateChangeConfirmed(this)
        }
      }
    }
    const result = this.value_
    if (isCaughtException(result)) {
      throw result.cause
    }
    return result
  }

  trackAndCompute(): boolean {
    const oldValue = this.value_
    const wasSuspended = this.dependenciesState_ === NOT_TRACKING
    const newValue = this.computeValue_(true)
    const changed =
      wasSuspended ||
      isCaughtException(oldValue) ||
      isCaughtException(newValue) ||
      !this.equals_(oldValue as T, newValue as T)
    if (changed) {
      this.value_ = newValue as T
    }
    return changed
  }

  computeValue_(track: boolean): unknown {
    this.isComputing_ = true
    // computed 内不允许写状态 (官方 allowStateChanges(false) 同款)
    const prev = allowStateChangesStart(false)
    let res: unknown
    if (track) {
      res = trackDerivedFunction(this, this.derivation, this.options.context)
    } else {
      try {
        res = this.derivation.call(this.options.context)
      } catch (e) {
        res = new CaughtException(e)
      }
    }
    allowStateChangesEnd(prev)
    this.isComputing_ = false
    return res
  }

  /** 失去最后观察者: 释放依赖与缓存值 (官方 suspend_ 同款) */
  suspend_(): void {
    clearObserving(this)
    this.value_ = undefined as unknown as T
  }
}

/**
 * computed
 *  - computed(fn): 工厂, 返回 ComputedValue (.get() 取值)
 *  - @computed get x(): legacy 装饰器, 按实例懒建 ComputedValue
 */
export interface IComputed<T = any> {
  get(): T
}

const computedMemo = new WeakMap<object, Map<string, ComputedValue<any>>>()

export function computed<T>(fn: () => T): IComputed<T>
export function computed(
  target: object,
  key: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor
export function computed(...args: any[]): any {
  const [a, b, c] = args

  // 工厂形态: computed(fn)
  if (typeof a === 'function' && args.length === 1) {
    return new ComputedValue<any>({ get: a as () => any })
  }

  // legacy 装饰器形态: @computed get x() {}
  const descriptor = c as PropertyDescriptor
  if (!descriptor || typeof descriptor.get !== 'function') {
    throw new Error('[mobx] @computed 只能用于 getter')
  }
  const get = descriptor.get
  const key = b as string
  return {
    ...descriptor,
    get(this: object) {
      let map = computedMemo.get(this)
      if (!map) {
        map = new Map()
        computedMemo.set(this, map)
      }
      let cv = map.get(key)
      if (!cv) {
        cv = new ComputedValue<any>({
          get: get as () => any,
          context: this,
          name: key
        })
        map.set(key, cv)
      }
      return cv.get()
    }
  }
}
