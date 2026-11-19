/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * 响应式引擎内核, 移植 mobx v6.12.3 的 derivation / propagation 协议
 *  - 四态状态机 + diffValue 传播 + POSSIBLY_STALE 延迟验证 + batch 合并
 *  - 剥离 spy / trace / interceptor / ObservableValue / devtools / onBO·onBUO 钩子
 *  - 对齐源: node_modules/mobx/dist/mobx.esm.js
 */

// ---------- 状态机常量 (官方 IDerivationState_) ----------
/** 尚未运行或未被观察, 不持有任何依赖信息 */
export const NOT_TRACKING = -1
/** 浅层依赖无变化, 不重算 */
export const UP_TO_DATE = 0
/** 深层依赖可能变化, 需验证后才决定是否重算 */
export const POSSIBLY_STALE = 1
/** 浅层依赖已变化, 下次使用时必须重算 */
export const STALE = 2

export class CaughtException {
  constructor(public cause: unknown) {}
}

export function isCaughtException(e: unknown): e is CaughtException {
  return e instanceof CaughtException
}

// ---------- 全局状态 (官方 MobXGlobals 的使用子集) ----------
export const globalState = {
  trackingDerivation: null as IDerivation | null,
  runId: 0,
  inBatch: 0,
  pendingReactions: [] as Reaction[],
  pendingUnobservations: [] as IObservable[],
  isRunningReactions: false,
  allowStateChanges: false,
  enforceActions: true as boolean | 'always',
  UNCHANGED: {},
  suppressReactionErrors: false
}

// ---------- 容器/推导的接口 (结构化类型, 引擎函数按形状操作) ----------
export interface IObservable {
  observers_: Set<IDerivation>
  diffValue_: number
  lastAccessedBy_: number
  lowestObserverState_: number
  isPendingUnobservation_: boolean
  isBeingObserved_: boolean
  dependenciesState_?: number
}

export interface IDerivation {
  observing_: IObservable[]
  newObserving_: IObservable[] | null
  dependenciesState_: number
  diffValue_: number
  runId_: number
  unboundDepsCount_: number
  isRunning_: boolean
  isDisposed_: boolean
  isScheduled_: boolean
  name_?: string
  onBecomeStale_(): void
}

/** 叶子 atom (observable 的 per-key 响应单元) */
export class Atom implements IObservable {
  isPendingUnobservation_ = false
  isBeingObserved_ = false
  observers_ = new Set<IDerivation>()
  diffValue_ = 0
  lastAccessedBy_ = 0
  lowestObserverState_ = NOT_TRACKING

  constructor(public name_?: string) {}

  reportObserved(): boolean {
    return reportObserved(this)
  }

  reportChanged(): void {
    startBatch()
    propagateChanged(this)
    endBatch()
  }
}

export type IAtom = Atom

// ---------- 传播协议 (官方 propagation.ts) ----------
function addObserver(observable: IObservable, node: IDerivation): void {
  observable.observers_.add(node)
  if (observable.lowestObserverState_ > node.dependenciesState_) {
    observable.lowestObserverState_ = node.dependenciesState_
  }
}

function removeObserver(observable: IObservable, node: IDerivation): void {
  observable.observers_.delete(node)
  if (observable.observers_.size === 0) {
    queueForUnobservation(observable)
  }
}

function queueForUnobservation(observable: IObservable): void {
  if (!observable.isPendingUnobservation_) {
    observable.isPendingUnobservation_ = true
    globalState.pendingUnobservations.push(observable)
  }
}

export function startBatch(): void {
  globalState.inBatch++
}

export function endBatch(): void {
  if (--globalState.inBatch === 0) {
    runReactions()
    // 批结束: 处理待挂起的 observable (computed 失去最后观察者时销毁依赖)
    const list = globalState.pendingUnobservations
    for (let i = 0; i < list.length; i++) {
      const observable = list[i]
      observable.isPendingUnobservation_ = false
      if (observable.observers_.size === 0) {
        const computed = observable as { suspend_?: () => void }
        computed.suspend_?.()
      }
    }
    globalState.pendingUnobservations = []
  }
}

export function reportObserved(observable: IObservable): boolean {
  const derivation = globalState.trackingDerivation
  if (derivation !== null) {
    // runId 去重: 同一推导运行内重复读取只登记一次
    if (derivation.runId_ !== observable.lastAccessedBy_) {
      observable.lastAccessedBy_ = derivation.runId_
      derivation.newObserving_![derivation.unboundDepsCount_++] = observable
    }
    return observable.isBeingObserved_
  }
  if (observable.observers_.size === 0 && globalState.inBatch > 0) {
    queueForUnobservation(observable)
  }
  return false
}

/** 叶子 atom 值变化: 观察者置 STALE (必然重算) */
function propagateChanged(observable: IObservable): void {
  if (observable.lowestObserverState_ === STALE) {
    return
  }
  observable.lowestObserverState_ = STALE
  // for-of 而非 forEach: 免去每次传播的回调闭包分配
  for (const d of observable.observers_) {
    if (d.dependenciesState_ === UP_TO_DATE) {
      d.onBecomeStale_()
    }
    d.dependenciesState_ = STALE
  }
}

/** computed 重算且值变化: 观察者从 POSSIBLY_STALE 升级为 STALE */
export function propagateChangeConfirmed(observable: IObservable): void {
  if (observable.lowestObserverState_ === STALE) {
    return
  }
  observable.lowestObserverState_ = STALE
  for (const d of observable.observers_) {
    const state = d.dependenciesState_
    if (state === POSSIBLY_STALE) {
      d.dependenciesState_ = STALE
    } else if (state === UP_TO_DATE) {
      // 观察者正在计算中, 仅回退 lowestObserverState
      observable.lowestObserverState_ = UP_TO_DATE
    }
  }
}

/** computed 的依赖变化但尚未重算: 观察者置 POSSIBLY_STALE (延迟验证) */
export function propagateMaybeChanged(observable: IObservable): void {
  if (observable.lowestObserverState_ !== UP_TO_DATE) {
    return
  }
  observable.lowestObserverState_ = POSSIBLY_STALE
  for (const d of observable.observers_) {
    if (d.dependenciesState_ === UP_TO_DATE) {
      d.dependenciesState_ = POSSIBLY_STALE
      d.onBecomeStale_()
    }
  }
}

function changeDependenciesStateTo0(derivation: IDerivation): void {
  if (derivation.dependenciesState_ === UP_TO_DATE) {
    return
  }
  derivation.dependenciesState_ = UP_TO_DATE
  const obs = derivation.observing_
  let i = obs.length
  while (i--) {
    obs[i].lowestObserverState_ = UP_TO_DATE
  }
}

// ---------- 推导核心 (官方 derivation.ts) ----------
export function trackDerivedFunction(
  derivation: IDerivation,
  f: () => unknown,
  context?: unknown
): unknown {
  changeDependenciesStateTo0(derivation)
  // 官方 #3833 优化: 首次运行预留 100, 后续按既有依赖数预留
  derivation.newObserving_ = new Array(derivation.runId_ === 0 ? 100 : derivation.observing_.length)
  derivation.unboundDepsCount_ = 0
  derivation.runId_ = ++globalState.runId
  const prevTracking = globalState.trackingDerivation
  globalState.trackingDerivation = derivation
  globalState.inBatch++
  let result: unknown
  try {
    result = f.call(context)
  } catch (e) {
    result = new CaughtException(e)
  }
  globalState.inBatch--
  globalState.trackingDerivation = prevTracking
  bindDependencies(derivation)
  return result
}

/**
 * 差分新旧依赖: 订阅新增 / 退订移除 (官方 diffValue 协议)
 */
function bindDependencies(derivation: IDerivation): void {
  const prevObserving = derivation.observing_
  const observing = (derivation.observing_ = derivation.newObserving_!)
  let lowestNewState = UP_TO_DATE

  let i0 = 0
  const l = derivation.unboundDepsCount_
  for (let i = 0; i < l; i++) {
    const dep = observing[i]
    if (dep.diffValue_ === 0) {
      dep.diffValue_ = 1
      if (i0 !== i) observing[i0] = dep
      i0++
    }
    // 结构判定 computed: 只有 ComputedValue 带 dependenciesState_ 字段 (Atom 不可加)
    const state = (dep as { dependenciesState_?: number }).dependenciesState_
    if (state !== undefined && state > lowestNewState) {
      lowestNewState = state
    }
  }
  observing.length = i0
  derivation.newObserving_ = null

  let l2 = prevObserving.length
  while (l2--) {
    const dep = prevObserving[l2]
    if (dep.diffValue_ === 0) {
      removeObserver(dep, derivation)
    }
    dep.diffValue_ = 0
  }
  let i2 = i0
  while (i2--) {
    const dep = observing[i2]
    if (dep.diffValue_ === 1) {
      dep.diffValue_ = 0
      addObserver(dep, derivation)
    }
  }
  // 新依赖在计算期间可能已变 stale, 却没机会传播 (#916)
  if (lowestNewState !== UP_TO_DATE) {
    derivation.dependenciesState_ = lowestNewState
    derivation.onBecomeStale_()
  }
}

export function clearObserving(derivation: IDerivation): void {
  const obs = derivation.observing_
  derivation.observing_ = []
  let i = obs.length
  while (i--) {
    removeObserver(obs[i], derivation)
  }
  derivation.dependenciesState_ = NOT_TRACKING
}

/**
 * 判定推导是否必须重算
 *  - STALE: 浅层依赖变了, 直接重算
 *  - POSSIBLY_STALE: 逐个 get() 依赖的 computed —— 若其值实际变化会向上传播
 *    STALE (onBecomeStale → dependenciesState_ 升级), 全部验证干净则跳过重算
 */
export function shouldCompute(derivation: IDerivation): boolean {
  switch (derivation.dependenciesState_) {
    case UP_TO_DATE:
      return false
    case NOT_TRACKING:
    case STALE:
      return true
    case POSSIBLY_STALE: {
      // 官方 #2195: 状态传播可能发生在 action/reactive 上下文之外
      const obs = derivation.observing_
      const l = obs.length
      for (let i = 0; i < l; i++) {
        const obj = obs[i] as unknown as {
          dependenciesState_?: number
          get?: () => unknown
        }
        if (obj.dependenciesState_ !== undefined) {
          // computed 依赖: 拉取求值, 若其值实际变化会经 propagateChangeConfirmed
          // 把本推导升级为 STALE
          try {
            obj.get!()
          } catch (e) {
            return true
          }
          if (derivation.dependenciesState_ === STALE) {
            return true
          }
        }
      }
      changeDependenciesStateTo0(derivation)
      return false
    }
  }
}

export function untrackedStart(): IDerivation | null {
  const prev = globalState.trackingDerivation
  globalState.trackingDerivation = null
  return prev
}

export function untrackedEnd(prev: IDerivation | null): void {
  globalState.trackingDerivation = prev
}

export function untracked<T>(fn: () => T): T {
  const prev = untrackedStart()
  try {
    return fn()
  } finally {
    untrackedEnd(prev)
  }
}

export function allowStateChangesStart(allow: boolean): boolean {
  const prev = globalState.allowStateChanges
  globalState.allowStateChanges = allow
  return prev
}

export function allowStateChangesEnd(prev: boolean): void {
  globalState.allowStateChanges = prev
}

/** DEV 下检测 action 外修改已观察状态 (官方 enforceActions 默认 'observed' 行为) */
export function checkIfStateModificationsAreAllowed(atom: {
  observers_: Set<unknown>
  name_?: string
}): void {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  const hasObservers = atom.observers_.size > 0
  if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === 'always')) {
    console.warn(
      '[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ' +
        atom.name_
    )
  }
}

// ---------- Reaction (官方 reaction.ts 子集) ----------
export class Reaction implements IDerivation {
  observing_: IObservable[] = []
  newObserving_: IObservable[] | null = []
  dependenciesState_ = NOT_TRACKING
  diffValue_ = 0
  runId_ = 0
  unboundDepsCount_ = 0
  isDisposed_ = false
  isScheduled_ = false
  isTrackPending_ = false
  isRunning_ = false

  constructor(public name_: string | undefined, public onInvalidate_: () => void) {}

  onBecomeStale_(): void {
    this.schedule_()
  }

  schedule_(): void {
    if (!this.isScheduled_) {
      this.isScheduled_ = true
      globalState.pendingReactions.push(this)
      runReactions()
    }
  }

  runReaction_(): void {
    if (!this.isDisposed_) {
      startBatch()
      this.isScheduled_ = false
      if (shouldCompute(this)) {
        this.isTrackPending_ = true
        try {
          this.onInvalidate_()
        } catch (e) {
          this.reportExceptionInDerivation_(e)
        }
      }
      endBatch()
    }
  }

  track(fn: () => void): void {
    if (this.isDisposed_) return
    startBatch()
    this.isRunning_ = true
    const result = trackDerivedFunction(this, fn, undefined)
    this.isRunning_ = false
    this.isTrackPending_ = false
    if (this.isDisposed_) {
      // 运行期间被 dispose: 补清理 (官方同款)
      clearObserving(this)
    }
    if (isCaughtException(result)) {
      this.reportExceptionInDerivation_(result.cause)
    }
    endBatch()
  }

  reportExceptionInDerivation_(error: unknown): void {
    // 官方默认: console.error 上报 (无 errorHandler / globalReactionErrorHandlers 需求)
    if (globalState.suppressReactionErrors) return
    console.error(`[mobx] uncaught error in 'Reaction[${this.name_ ?? 'unnamed'}]'`, error)
  }

  dispose(): void {
    if (!this.isDisposed_) {
      this.isDisposed_ = true
      if (!this.isRunning_) {
        startBatch()
        clearObserving(this)
        endBatch()
      }
    }
  }
}

// ---------- 批处理与调度 (官方 action.ts 的调度部分) ----------
/** autorun 自触发重入迭代上限 (官方同值) */
const MAX_REACTION_ITERATIONS = 100

const reactionScheduler = (f: () => void) => f()

function runReactions(): void {
  // 蹦床: 运行中产生的新 reaction 会在本轮或下一轮收敛
  if (globalState.inBatch > 0 || globalState.isRunningReactions) {
    return
  }
  reactionScheduler(runReactionsHelper)
}

function runReactionsHelper(): void {
  globalState.isRunningReactions = true
  const allReactions = globalState.pendingReactions
  let iterations = 0
  while (allReactions.length > 0) {
    if (++iterations === MAX_REACTION_ITERATIONS) {
      console.error(
        "[mobx] Reaction doesn't converge to a stable state after " +
          MAX_REACTION_ITERATIONS +
          ' iterations. Probably there is a cycle in the reactive function: ' +
          allReactions[0]
      )
      allReactions.splice(0)
    }
    const remaining = allReactions.splice(0)
    for (let i = 0, l = remaining.length; i < l; i++) {
      remaining[i].runReaction_()
    }
  }
  globalState.isRunningReactions = false
}
