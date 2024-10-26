/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:30:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:20:36
 */
import { useEffect } from 'react'
// @ts-ignore
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake'
import { FROZEN_FN } from '@constants/init'
import { DEV } from '@src/config'

export default function useKeepAwake() {
  useEffect(() => {
    if (!DEV) return FROZEN_FN

    activateKeepAwakeAsync()
    return () => deactivateKeepAwake()
  }, [])
}
