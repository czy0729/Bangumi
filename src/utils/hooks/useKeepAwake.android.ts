/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:30:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-24 12:14:44
 */
import { useEffect } from 'react'
// @ts-ignore
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake'
import { DEV } from '@/config'

export default function useKeepAwake() {
  useEffect(() => {
    if (!DEV) return () => {}

    activateKeepAwakeAsync()
    return () => deactivateKeepAwake()
  }, [])
}
