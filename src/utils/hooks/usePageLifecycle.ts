/*
 * @Author: czy0729
 * @Date: 2025-05-19 23:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 05:48:46
 */
import { useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { DEV, TEXT_BADGES } from '@constants'
import { Fn } from '@types'
import useMount from './useMount'

type Callbacks = {
  onFocus?: Fn
  onEnterComplete: Fn
  onLeaveComplete?: Fn
}

export default function usePageLifecycle(callbacks: Callbacks, id: string) {
  useEffect(() => {
    log(`[${id}]`, 'onEnter')
  })

  useFocusEffect(() => {
    if (typeof callbacks?.onFocus === 'function') {
      callbacks.onFocus()
      log(`[${id}]`, 'onFocus')
    }
  })

  useMount(() => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        if (typeof callbacks?.onEnterComplete === 'function') {
          log(`[${id}]`, 'onEnterComplete')
          callbacks.onEnterComplete()
        }
      }, 240)
    })

    return () => {
      log(`[${id}]`, 'onLeave')

      InteractionManager.runAfterInteractions(() => {
        setTimeout(async () => {
          if (typeof callbacks?.onLeaveComplete === 'function') {
            log(`[${id}]`, 'onLeaveComplete')
            callbacks.onLeaveComplete()
          }
        }, 240)
      })
    }
  })
}

function log(...arg: any) {
  if (DEV) console.info(TEXT_BADGES.success, ...arg)
}
