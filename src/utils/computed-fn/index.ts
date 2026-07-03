/**
 * 安全版 computedFn
 *
 * 解决原版 mobx-utils 的 computedFn 内部使用 DeepMap 时，
 * 因不同调用点传入参数数量不一致（如可选参数）导致 DeepMap 抛出长度不一致异常的问题。
 *
 * 本模块通过 Proxy 拦截，在调用前自动裁剪或补齐参数，确保 arguments.length 始终等于函数形参个数。
 * 同时提供可选的性能优化参数，允许对已知无参数长度风险的高频方法跳过 Proxy 代理。
 */
import { computedFn as _computedFn } from 'mobx-utils'

/**
 * 包装原生的 computedFn，提供参数长度自动对齐的安全保护。
 * @param fn 目标计算函数
 * @param hasOptionalArgs 是否包含可选/默认参数。若设为 false，将跳过 Proxy 代理以追求极致性能。
 */
export function computedFn<F extends (...args: any[]) => any>(fn: F, hasOptionalArgs = true): F {
  const inner = _computedFn(fn)
  const paramCount = fn.length

  // 边缘情况处理：若函数无形参，或明确声明不包含可选参数，则直接返回原版 computedFn 以提升性能
  if (paramCount === 0 || !hasOptionalArgs) {
    return inner
  }

  // 通过 Proxy 拦截调用，强制规范参数长度
  return new Proxy(inner, {
    apply(target, thisArg, args: any[]) {
      const argsLength = args.length

      if (argsLength !== paramCount) {
        const padded =
          argsLength < paramCount
            ? args.concat(new Array(paramCount - argsLength).fill(undefined)) // 参数不足，自适应补齐 undefined
            : args.slice(0, paramCount) // 参数溢出，防御性裁剪

        return Reflect.apply(target, thisArg, padded)
      }

      return Reflect.apply(target, thisArg, args)
    }
  }) as F
}
