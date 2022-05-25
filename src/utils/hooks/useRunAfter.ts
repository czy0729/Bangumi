/*
 * @Author: czy0729
 * @Date: 2022-03-10 21:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 19:59:13
 */
import { InteractionManager } from 'react-native'
import useMount from './useMount'

export default function useRunAfter(fn) {
  return useMount(() => {
    InteractionManager.runAfterInteractions(fn)
  })
}
