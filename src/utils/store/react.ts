/*
 * Store React 适配层 —— useSyncExternalStore 细粒度订阅
 * @Author: czy0729
 * @Date: 2026-08-23 13:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-23 17:50:48
 */
import { useCallback, useRef, useSyncExternalStore } from 'react'
import { autorun } from 'mobx'

/**
 * 创建基于 autorun 的外部 store 订阅 (useStoreSelector 的可测核心)
 * - 仅当 selector 结果变化时通知
 * - 首次 subscribe 立即求值一次; getSnapshot 可在 subscribe 前调用以初始化快照
 */
export function createStoreSubscription<Store extends object, Selection>(
  store: Store,
  selector: (store: Store) => Selection,
  isEqualFn?: (a: Selection, b: Selection) => boolean
) {
  let current: Selection | null = null
  let hasCurrent = false

  return {
    /** 订阅变更, 返回取消函数 */
    subscribe(onStoreChange: () => void) {
      return autorun(() => {
        const next = selector(store)

        // 首次求值仅初始化快照, 不通知
        if (!hasCurrent) {
          current = next
          hasCurrent = true
          return
        }

        if (!isEqualFn?.(current as Selection, next)) {
          current = next
          onStoreChange()
        }
      })
    },

    /** 读取当前快照 */
    getSnapshot(): Selection {
      if (!hasCurrent) {
        current = selector(store)
        hasCurrent = true
      }
      return current as Selection
    }
  }
}

/**
 * 基于 useSyncExternalStore 的细粒度订阅
 * - 仅当 selector 结果变化时触发重渲, 适合大页面替代整块 observer
 * - selector 内读取 observable 属性即建立依赖, 语义与 autorun 一致
 * - isEqualFn 可自定义比较 (如 lodash.isequal) 以进一步减少重渲
 */
export function useStoreSelector<Store extends object, Selection>(
  store: Store,
  selector: (store: Store) => Selection,
  isEqualFn?: (a: Selection, b: Selection) => boolean
): Selection {
  const selectorRef = useRef(selector)
  selectorRef.current = selector

  const isEqualRef = useRef(isEqualFn)
  isEqualRef.current = isEqualFn

  const subscriptionRef = useRef<ReturnType<
    typeof createStoreSubscription<Store, Selection>
  > | null>(null)

  /** 记录当前订阅绑定的 store 实例, 实例变化时重建订阅 */
  const createdForStoreRef = useRef<Store | null>(null)

  const ensureSubscription = useCallback(() => {
    if (!subscriptionRef.current || createdForStoreRef.current !== store) {
      createdForStoreRef.current = store
      subscriptionRef.current = createStoreSubscription(
        store,
        next => selectorRef.current(next),
        (a, b) => isEqualRef.current?.(a, b)
      )
    }
    return subscriptionRef.current
  }, [store])

  const subscribe = useCallback(
    (onStoreChange: () => void) => ensureSubscription().subscribe(onStoreChange),
    [ensureSubscription]
  )

  const getSnapshot = useCallback(() => ensureSubscription().getSnapshot(), [ensureSubscription])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
