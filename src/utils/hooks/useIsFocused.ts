/*
 * @Author: czy0729
 * @Date: 2023-02-13 03:43:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 05:10:39
 */
import { useState, useEffect } from 'react'
import useIsFocusedApp from './useIsFocusedApp'
import { runAfter } from '../../utils'

function useIsFocused() {
  const isFocused = useIsFocusedApp()
  const [show, setShow] = useState(isFocused)

  useEffect(() => {
    // blur 时要延迟到切页动画后再隐藏, focus 时马上显示
    if (!isFocused) {
      runAfter(() => {
        setShow(isFocused)
      })
    } else {
      setShow(isFocused)
    }
  }, [isFocused])

  return show
}

export default useIsFocused
