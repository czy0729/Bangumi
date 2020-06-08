/*
 * @Author: czy0729
 * @Date: 2020-06-04 16:41:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2020-06-04 16:41:08
 */
import { useCallback, useState, useMemo } from 'react'

export default function useToggle(defaultValue, reverseValue) {
  const [state, setState] = useState(defaultValue)
  const reverseValueOrigin = useMemo(
    () => (reverseValue === undefined ? !defaultValue : reverseValue),
    [reverseValue]
  )

  // 切换返回值
  const toggle = useCallback(value => {
    setState(oldState => {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined) {
        return value
      }

      return oldState === defaultValue ? reverseValueOrigin : defaultValue
    })
  }, [])

  // 设置默认值
  const setLeft = useCallback(() => {
    setState(defaultValue)
  }, [setState])

  // 设置取反值
  const setRight = useCallback(() => {
    setState(reverseValueOrigin)
  }, [setState])

  return {
    state,
    toggle,
    setLeft,
    setRight
  }
}
