/*
 * @Author: czy0729
 * @Date: 2022-03-14 19:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 05:10:55
 */
import { useEffect, useRef } from 'react'
import useIsFocusedApp from './useIsFocusedApp'

function useIsFocusedRef() {
  const isFocused = useIsFocusedApp()
  const isFocusedRef = useRef(isFocused)
  useEffect(() => {
    isFocusedRef.current = isFocused
  }, [isFocused])

  return isFocusedRef
}

export default useIsFocusedRef
