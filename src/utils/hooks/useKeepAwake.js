/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:30:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 06:31:22
 */
import { useEffect } from 'react'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import { DEV } from '@constants'

export default function useKeepAwake() {
  useEffect(() => {
    if (DEV) {
      activateKeepAwake()
      return () => deactivateKeepAwake()
    }
  }, [])
}
