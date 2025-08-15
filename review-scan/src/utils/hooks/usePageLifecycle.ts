/*
 * @Author: czy0729
 * @Date: 2025-05-19 23:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:21:53
 */
import { InteractionManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'
import { Fn } from '@types'
import useMount from './useMount'

type Callbacks = {
  /** 进入页面 */
  onEnter?: Fn

  /** 聚焦页面 (再进入下一个页面回退到本页面, 亦会触发) */
  onFocus?: Fn

  /** 进入页面 (切页动画完成) */
  onEnterComplete?: Fn

  /** 页面失去焦点 (进入下一个页面, 前一个页面亦会触发) */
  onBlur?: Fn

  /** 退出页面 */
  onLeave?: Fn

  /** 退出页面 (切页动画完成) */
  onLeaveComplete?: Fn
}

/** 客户端页面统一生命周期钩子 */
export default function usePageLifecycle(callbacks: Callbacks, id: string) {
  useFocusEffect(() => {
    if (typeof callbacks?.onFocus === 'function') {
      callbacks.onFocus()
      log(`[${id}]`, 'onFocus')
    }

    if (typeof callbacks?.onBlur === 'function') {
      return () => {
        callbacks.onBlur()
        log(`[${id}]`, 'onBlur')
      }
    }
  })

  useMount(() => {
    if (typeof callbacks?.onEnter === 'function') {
      callbacks.onEnter()
      log(`[${id}]`, 'onEnter')
    }

    if (typeof callbacks?.onEnterComplete === 'function') {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          log(`[${id}]`, 'onEnterComplete')
          callbacks.onEnterComplete()
        }, 240)
      })
    }

    return () => {
      if (typeof callbacks?.onLeave === 'function') {
        log(`[${id}]`, 'onLeave')
        callbacks.onLeave()
      }

      if (typeof callbacks?.onLeaveComplete === 'function') {
        InteractionManager.runAfterInteractions(() => {
          setTimeout(() => {
            log(`[${id}]`, 'onLeaveComplete')
            callbacks.onLeaveComplete()
          }, 240)
        })
      }
    }
  })
}

function log(...arg: any) {
  if (DEV) console.info(TEXT_BADGES.success, ...arg)
}
