/*
 * @Author: czy0729
 * @Date: 2022-01-25 15:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-25 15:57:45
 */
import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export default function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [handler])
}
