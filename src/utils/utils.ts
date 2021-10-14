/*
 * @Author: czy0729
 * @Date: 2021-10-07 06:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-07 13:55:15
 */
import { InteractionManager, PromiseTask, SimpleTask } from 'react-native'

/**
 * 排除null
 * @param {*} value
 */
export function isObject(value: any) {
  return typeof value === 'object' && !!value
}

/**
 * 缩短runAfterInteractions
 * @param {*} fn
 */
export function runAfter(fn: (() => any) | SimpleTask | PromiseTask) {
  return InteractionManager.runAfterInteractions(fn)
}

/**
 * 节流
 * @param {*} callback
 */
export function throttle(callback: () => void, delay = 400) {
  let timeoutID: number
  let lastExec = 0

  function wrapper() {
    const self = this
    const elapsed = Number(new Date()) - lastExec
    const args = arguments

    function exec() {
      lastExec = Number(new Date())
      callback.apply(self, args)
    }

    clearTimeout(timeoutID)

    if (elapsed > delay) {
      exec()
    } else {
      timeoutID = setTimeout(exec, delay - elapsed)
    }
  }

  return wrapper
}
