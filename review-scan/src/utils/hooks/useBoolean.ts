/*
 * @Author: czy0729
 * @Date: 2020-06-04 16:41:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-04 06:05:03
 */
import { useCallback, useEffect } from 'react'
import useToggle from './useToggle'

/**
 * 自定义 Hook，用于处理布尔值的切换，提供便捷的 `true` 和 `false` 设置方法。
 *
 * @param {boolean} [defaultValue=false] - 默认布尔值，默认为 `false`
 *
 * @returns {Object} 返回当前布尔值（state），切换函数（toggle），以及设置为 `true` 和 `false` 的方法（setTrue, setFalse）
 */
export default function useBoolean(defaultValue: boolean = false) {
  const { state, toggle } = useToggle(defaultValue)
  const setTrue = useCallback(() => toggle(true), [toggle])
  const setFalse = useCallback(() => toggle(false), [toggle])

  useEffect(() => {
    toggle(defaultValue)
  }, [defaultValue, toggle])

  return {
    state,
    toggle,
    setTrue,
    setFalse
  }
}
