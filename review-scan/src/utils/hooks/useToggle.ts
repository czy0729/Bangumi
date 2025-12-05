/*
 * @Author: czy0729
 * @Date: 2020-06-04 16:41:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:11:09
 */
import { useCallback, useMemo, useState } from 'react'

/**
 * 自定义 Hook 用于在两种状态值之间切换（例如：开关）。
 *
 * @param {boolean} defaultValue - 默认状态值
 * @param {boolean} [reverseValue] - 可选的反向状态值，如果未提供则默认为与defaultValue相反的值
 *
 * @returns {Object} 包含当前状态值（state），切换状态函数（toggle），设置默认值的函数（setLeft），和设置反向值的函数（setRight）
 */
export default function useToggle(defaultValue: boolean, reverseValue?: boolean) {
  const [state, setState] = useState<boolean>(defaultValue)

  // 如果没有传入 reverseValue，则默认为与 defaultValue 相反的状态
  const reverseValueOrigin = useMemo<boolean>(
    () => (reverseValue === undefined ? !defaultValue : reverseValue),
    [reverseValue, defaultValue]
  )

  // 切换状态的函数
  const toggle = useCallback(
    (value?: boolean) => {
      setState(oldState => {
        // 如果传入了 value 则使用传入的 value 更新状态
        if (value !== undefined) {
          return value
        }

        // 默认状态值与反向状态值之间切换
        return oldState === defaultValue ? reverseValueOrigin : defaultValue
      })
    },
    [defaultValue, reverseValueOrigin]
  )

  // 设置为默认值的函数
  const setLeft = useCallback(() => {
    setState(defaultValue)
  }, [defaultValue])

  // 设置为反向值的函数
  const setRight = useCallback(() => {
    setState(reverseValueOrigin)
  }, [reverseValueOrigin])

  return {
    state,
    toggle,
    setLeft,
    setRight
  }
}
