/*
 * @Author: czy0729
 * @Date: 2022-09-01 11:01:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 16:27:03
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const COMPONENT = 'Voices'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 默认全部 */
  position: '',

  /** 云快照 */
  ota: {}
}

export const STATE = {
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
