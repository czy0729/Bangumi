/*
 * @Author: czy0729
 * @Date: 2020-06-04 16:41:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-04 16:42:49
 */
import { useCallback } from 'react'
import useToggle from './useToggle'

export default function useBoolean(defaultValue = false) {
  const { state, toggle } = useToggle(defaultValue)
  const setTrue = useCallback(() => toggle(true), [toggle])
  const setFalse = useCallback(() => toggle(false), [toggle])
  return {
    state,
    toggle,
    setTrue,
    setFalse
  }
}
