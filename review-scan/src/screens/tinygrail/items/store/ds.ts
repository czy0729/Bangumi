/*
 * @Author: czy0729
 * @Date: 2024-03-16 16:14:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 02:41:59
 */
import { Loaded, Override } from '@types'
import { COMPONENT } from '../ds'
import { ItemsType, ItemUseParams } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  title: '',
  visible: false
}

export const STATE = {
  memoItemUsed: {
    chaos: {},
    guidepost: {},
    stardust: {},
    starbreak: {},
    fisheye: {}
  } as Record<
    ItemsType,
    Override<
      ItemUseParams,
      {
        /** 用于记忆上一次道具使用方式, 以便下一日重复使用 */
        monoName?: string
        monoAvatar?: string
        monoLv?: number
        toMonoAvatar?: string
        toMonoName?: string
        toMonoLv?: number
      }
    >
  >,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
