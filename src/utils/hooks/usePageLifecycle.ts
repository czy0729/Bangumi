/*
 * @Author: czy0729
 * @Date: 2025-05-19 23:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 21:29:07
 */
import { useCallback } from 'react'
import { InteractionManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { logger } from '@utils/dev'
import useMount from './useMount'

import type { Fn } from '@types'

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
  useFocusEffect(
    useCallback(() => {
      if (typeof callbacks?.onFocus === 'function') {
        callbacks.onFocus()
        logger.success(id, 'onFocus')
      }

      if (typeof callbacks?.onBlur === 'function') {
        return () => {
          callbacks.onBlur()
          logger.success(id, 'onBlur')
        }
      }
    }, [callbacks, id])
  )

  useMount(() => {
    if (typeof callbacks?.onEnter === 'function') {
      callbacks.onEnter()
      logger.success(id, 'onEnter')
    }

    if (typeof callbacks?.onEnterComplete === 'function') {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          logger.success(id, 'onEnterComplete')
          callbacks.onEnterComplete()
        }, 240)
      })
    }

    return () => {
      if (typeof callbacks?.onLeave === 'function') {
        logger.success(id, 'onLeave')
        callbacks.onLeave()
      }

      if (typeof callbacks?.onLeaveComplete === 'function') {
        InteractionManager.runAfterInteractions(() => {
          setTimeout(() => {
            logger.success(id, 'onLeaveComplete')
            callbacks.onLeaveComplete()
          }, 240)
        })
      }
    }
  })
}
