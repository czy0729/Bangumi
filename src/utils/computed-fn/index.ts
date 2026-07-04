/*
 * @Author: czy0729
 * @Date: 2026-07-05 00:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 00:53:43
 */
import { computed } from 'mobx'

import type { IComputedValue } from 'mobx'

/**
 * 稳定安全版 computedFn（适配 RN / MobX Store 场景）
 * - 不使用 JSON.stringify（避免循环引用/性能问题）
 * - 使用稳定 key join
 * - 缓存 computed 实例（避免重复创建）
 * - 支持默认参数 / 可选参数
 */
export function computedFn<F extends (...args: any[]) => any>(fn: F): F {
  const cache = new Map<string, IComputedValue<any>>()
  const paramCount = fn.length

  function createKey(args: any[]) {
    return args
      .map(v => {
        if (v === undefined) return '__u'
        if (v === null) return '__n'
        return String(v)
      })
      .join('\u0001')
  }

  const wrapped = function (this: any, ...args: any[]) {
    let aligned = args

    if (paramCount > 0) {
      if (aligned.length < paramCount) {
        aligned = aligned.concat(new Array(paramCount - aligned.length).fill(undefined))
      } else if (aligned.length > paramCount) {
        aligned = aligned.slice(0, paramCount)
      }
    }

    const key = createKey(aligned)
    let computedFnInstance = cache.get(key)

    if (!computedFnInstance) {
      const self = this
      // 直接捕获外部传进来的原始参数 args（如果是少传了，args 长度就少，apply 时会自动触发 JS 默认参数机制）
      const rawArgs = args

      computedFnInstance = computed(() => {
        return fn.apply(self, rawArgs)
      })

      cache.set(key, computedFnInstance)
    }

    return computedFnInstance.get()
  }

  return wrapped as unknown as F
}
