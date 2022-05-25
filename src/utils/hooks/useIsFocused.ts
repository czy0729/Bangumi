/*
 * @Author: czy0729
 * @Date: 2022-03-14 19:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 08:17:47
 */
import { useEffect, useRef } from 'react'
import { useIsFocused } from '@react-navigation/native'

function useIsFocusedRef() {
  const isFocused = useIsFocused()
  const isFocusedRef = useRef(isFocused)
  useEffect(() => {
    isFocusedRef.current = isFocused
  }, [isFocused])

  return isFocusedRef
}

export default useIsFocusedRef
