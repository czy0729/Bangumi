/*
 * @Author: czy0729
 * @Date: 2022-03-10 21:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-21 04:08:24
 */
import { InteractionManager } from 'react-native'
import { DEV } from '@constants'
import useMount from './useMount'

export default function useRunAfter(fn = () => {}) {
  return useMount(() => {
    if (DEV) {
      setTimeout(() => {
        requestAnimationFrame(() => fn())
      }, 240)
    } else {
      InteractionManager.runAfterInteractions(fn)
    }
  })
}
