/*
 * @Author: czy0729
 * @Date: 2023-12-30 05:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 10:52:38
 */
import { useCallback, useState } from 'react'
import { Fn } from '@types'

export function useCallOnceInInterval(onPress: Fn) {
  const [disabled, setDisabled] = useState(false)
  const handlePress = useCallback(() => {
    setDisabled(true)

    requestAnimationFrame(() => {
      onPress()
      setTimeout(() => {
        setDisabled(false)
      }, 400)
    })
  }, [onPress])

  return {
    handleDisabled: disabled,
    handlePress
  }
}
