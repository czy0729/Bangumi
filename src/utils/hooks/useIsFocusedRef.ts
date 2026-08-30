/*
 * @Author: czy0729
 * @Date: 2022-03-14 19:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 05:10:55
 */
import { useEffect, useRef } from 'react'
import useIsFocusedApp from './useIsFocusedApp'

import type { MutableRefObject } from 'react'

/**
 * 自定义 Hook，用于获取当前页面焦点状态的 ref, 供回调和 worklet 中读取最新值
 */
function useIsFocusedRef(): MutableRefObject<boolean> {
  const isFocused = useIsFocusedApp()
  const isFocusedRef = useRef(isFocused)
  useEffect(() => {
    isFocusedRef.current = isFocused
  }, [isFocused])

  return isFocusedRef
}

export default useIsFocusedRef
