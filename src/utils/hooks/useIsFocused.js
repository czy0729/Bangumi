/*
 * @Author: czy0729
 * @Date: 2022-03-14 19:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 20:03:39
 */
import { useEffect, useRef } from 'react'
import { useIsFocused } from '@react-navigation/native'

function useIsFocusedRef() {
  const isFocused = useIsFocused()
  const isFocusedRef = useRef(useIsFocusedRef)
  useEffect(() => {
    isFocusedRef.current = isFocused
  }, [isFocused])

  return isFocusedRef
}

export default useIsFocusedRef
