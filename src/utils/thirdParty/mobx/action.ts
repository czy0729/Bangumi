/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * action / runInAction: batch + untracked + allowStateChanges(true)
 *  - 对齐官方 _startAction/_endAction, 项目内只使用工厂形态 action(fn)
 */
import {
  allowStateChangesEnd,
  allowStateChangesStart,
  endBatch,
  globalState,
  startBatch,
  untrackedEnd,
  untrackedStart
} from './engine'

function executeAction<T>(fn: (...args: any[]) => T, scope: unknown, args: any[]): T {
  startBatch()
  const prevUntracked = untrackedStart()
  const prevAllowStateChanges = allowStateChangesStart(true)
  try {
    return fn.apply(scope, args)
  } catch (err) {
    // 错误传播期间抑制嵌套 reaction 的二次报错 (官方同款)
    globalState.suppressReactionErrors = true
    throw err
  } finally {
    allowStateChangesEnd(prevAllowStateChanges)
    untrackedEnd(prevUntracked)
    endBatch()
    // 官方 _endAction: endBatch 之后再复位, 保证本次出错 action 触发的 reaction 异常被抑制
    globalState.suppressReactionErrors = false
  }
}

/** 创建 action 包装函数 (batch + untracked) */
export function action<T extends (...args: any[]) => any>(fn: T): T {
  const name = fn.name || 'action'
  const wrapped = function (this: unknown, ...args: any[]) {
    return executeAction(fn, this, args)
  } as T
  Object.defineProperties(wrapped, {
    name: { value: name, configurable: true },
    isMobxAction: { value: true, configurable: true }
  })
  return wrapped
}

/** 立即执行的 action */
export function runInAction<T>(fn: () => T): T {
  return executeAction(fn, undefined, [])
}
