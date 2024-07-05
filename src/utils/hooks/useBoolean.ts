/*
 * @Author: czy0729
 * @Date: 2020-06-04 16:41:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-04 06:05:03
 */
import { useCallback, useEffect } from 'react'
import useToggle from './useToggle'

export default function useBoolean(defaultValue = false) {
  const { state, toggle } = useToggle(defaultValue)
  const setTrue = useCallback(() => toggle(true), [toggle])
  const setFalse = useCallback(() => toggle(false), [toggle])

  useEffect(() => {
    toggle(defaultValue)
  }, [defaultValue])

  return {
    state,
    toggle,
    setTrue,
    setFalse
  }
}
